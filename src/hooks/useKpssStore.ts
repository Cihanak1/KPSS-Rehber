"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import { DailySession, KpssStore, LeitnerBox, TopicProgress, TopicStatus, DifficultyLevel } from "@/types";

const STORAGE_KEY = "kpss-dashboard-v1";

const LEITNER_INTERVALS: Record<LeitnerBox, number> = {
  0: 1,
  1: 3,
  2: 7,
  3: 21,
  4: 999, // mezun
};

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function defaultProgress(topicId: string): TopicProgress {
  return {
    topicId,
    status: "not-started",
    difficulty: 3,
    solvedCount: 0,
    correctCount: 0,
    wrongCount: 0,
    notes: "",
    leitnerBox: 0,
  };
}

function defaultStore(): KpssStore {
  return {
    topicProgress: {},
    examDate: "2026-10-05",
    pomodoroSettings: {
      workMinutes: 25,
      shortBreakMinutes: 5,
      longBreakMinutes: 15,
      longBreakInterval: 4,
    },
    dailySessions: [],
  };
}

function loadStore(): KpssStore {
  if (typeof window === "undefined") return defaultStore();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultStore();
    return { ...defaultStore(), ...JSON.parse(raw) };
  } catch {
    return defaultStore();
  }
}

function saveStore(store: KpssStore): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    // ignore quota errors
  }
}

const emptySubscribe = () => () => {};

export function useKpssStore() {
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const [store, setStore] = useState<KpssStore>(() => loadStore());

  const persistUpdate = useCallback((updater: (prev: KpssStore) => KpssStore) => {
    setStore((prev) => {
      const next = updater(prev);
      saveStore(next);
      return next;
    });
  }, []);

  const getProgress = useCallback(
    (topicId: string): TopicProgress => {
      return store.topicProgress[topicId] ?? defaultProgress(topicId);
    },
    [store.topicProgress]
  );

  const updateTopicProgress = useCallback(
    (topicId: string, updates: Partial<TopicProgress>) => {
      persistUpdate((prev) => {
        const existing = prev.topicProgress[topicId] ?? defaultProgress(topicId);
        const updated = { ...existing, ...updates };

        // Konu tamamlandığında Leitner başlat
        if (updates.status === "completed" && !existing.completedAt) {
          updated.completedAt = new Date().toISOString();
          updated.leitnerBox = 1 as LeitnerBox;
          updated.nextReviewAt = addDays(
            new Date(),
            LEITNER_INTERVALS[1 as LeitnerBox]
          ).toISOString();
        }

        return {
          ...prev,
          topicProgress: { ...prev.topicProgress, [topicId]: updated },
        };
      });
    },
    [persistUpdate]
  );

  const updateStatus = useCallback(
    (topicId: string, status: TopicStatus) => {
      updateTopicProgress(topicId, { status });
    },
    [updateTopicProgress]
  );

  const updateDifficulty = useCallback(
    (topicId: string, difficulty: DifficultyLevel) => {
      updateTopicProgress(topicId, { difficulty });
    },
    [updateTopicProgress]
  );

  const incrementCorrect = useCallback(
    (topicId: string) => {
      const progress = store.topicProgress[topicId] ?? defaultProgress(topicId);
      updateTopicProgress(topicId, {
        correctCount: progress.correctCount + 1,
        solvedCount: progress.solvedCount + 1,
      });
    },
    [store.topicProgress, updateTopicProgress]
  );

  const incrementWrong = useCallback(
    (topicId: string) => {
      const progress = store.topicProgress[topicId] ?? defaultProgress(topicId);
      updateTopicProgress(topicId, {
        wrongCount: progress.wrongCount + 1,
        solvedCount: progress.solvedCount + 1,
      });
    },
    [store.topicProgress, updateTopicProgress]
  );

  const updateNotes = useCallback(
    (topicId: string, notes: string) => {
      updateTopicProgress(topicId, { notes });
    },
    [updateTopicProgress]
  );

  // Leitner: Başarılı -> bir sonraki kutu
  const leitnerSuccess = useCallback(
    (topicId: string) => {
      persistUpdate((prev) => {
        const existing = prev.topicProgress[topicId] ?? defaultProgress(topicId);
        const nextBox = Math.min(4, existing.leitnerBox + 1) as LeitnerBox;
        const nextReviewAt =
          nextBox < 4
            ? addDays(new Date(), LEITNER_INTERVALS[nextBox]).toISOString()
            : undefined;
        const updated: TopicProgress = {
          ...existing,
          leitnerBox: nextBox,
          lastReviewedAt: new Date().toISOString(),
          nextReviewAt,
          status: "completed",
        };
        return {
          ...prev,
          topicProgress: { ...prev.topicProgress, [topicId]: updated },
        };
      });
    },
    [persistUpdate]
  );

  // Leitner: Tekrar gerekli -> kutu 0'a dön
  const leitnerFail = useCallback(
    (topicId: string) => {
      persistUpdate((prev) => {
        const existing = prev.topicProgress[topicId] ?? defaultProgress(topicId);
        const updated: TopicProgress = {
          ...existing,
          leitnerBox: 0 as LeitnerBox,
          lastReviewedAt: new Date().toISOString(),
          nextReviewAt: addDays(new Date(), 1).toISOString(),
          status: "needs-review",
        };
        return {
          ...prev,
          topicProgress: { ...prev.topicProgress, [topicId]: updated },
        };
      });
    },
    [persistUpdate]
  );

  const setExamDate = useCallback(
    (date: string) => {
      persistUpdate((prev) => ({ ...prev, examDate: date }));
    },
    [persistUpdate]
  );

  const addDailySession = useCallback(
    (session: DailySession) => {
      persistUpdate((prev) => ({
        ...prev,
        dailySessions: [...prev.dailySessions.slice(-89), session],
      }));
    },
    [persistUpdate]
  );

  return {
    store,
    mounted,
    getProgress,
    updateTopicProgress,
    updateStatus,
    updateDifficulty,
    incrementCorrect,
    incrementWrong,
    updateNotes,
    leitnerSuccess,
    leitnerFail,
    setExamDate,
    addDailySession,
  };
}
