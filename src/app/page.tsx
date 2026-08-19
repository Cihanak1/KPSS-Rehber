"use client";

import { useState } from "react";
import { useKpssStore } from "@/hooks/useKpssStore";
import { useSpacedRepetition } from "@/hooks/useSpacedRepetition";
import { SUBJECTS } from "@/data/curriculum";
import { PomodoroFocusRequest } from "@/types";
import { CountdownTimer } from "@/components/dashboard/CountdownTimer";
import { DailyRecommendation } from "@/components/dashboard/DailyRecommendation";
import { SpacedRepetitionAlert } from "@/components/dashboard/SpacedRepetitionAlert";
import { OverallProgress } from "@/components/dashboard/OverallProgress";
import { HeatMap } from "@/components/dashboard/HeatMap";
import { StatsPanel } from "@/components/dashboard/StatsPanel";
import { PomodoroTimer } from "@/components/dashboard/PomodoroTimer";
import { SubjectAccordion } from "@/components/subjects/SubjectAccordion";
import { GraduationCap, LayoutDashboard, BookOpen, Sparkles } from "lucide-react";
import { cn } from "@/lib/cn";

type ActiveTab = "dashboard" | "subjects";

export default function KpssDashboard() {
  const {
    store, mounted,
    updateStatus, updateDifficulty,
    incrementCorrect, incrementWrong,
    updateNotes, leitnerSuccess, leitnerFail,
  } = useKpssStore();

  const dueItems = useSpacedRepetition(mounted ? store.topicProgress : {});
  const [activeTab, setActiveTab] = useState<ActiveTab>("dashboard");
  const [focusRequest, setFocusRequest] = useState<PomodoroFocusRequest | null>(null);

  const handleFocusRequest = (req: PomodoroFocusRequest) => {
    setFocusRequest(req);
    setActiveTab("dashboard");
  };

  return (
    <div className="min-h-dvh bg-zinc-950 flex flex-col overflow-x-hidden">
      {/* Sticky Header with Safe-Area support */}
      <header className="sticky top-0 z-30 border-b border-zinc-800/90 bg-zinc-950/95 backdrop-blur-md safe-top">
        <div className="max-w-screen-xl mx-auto px-3.5 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2.5 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <div className="size-8 sm:size-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
              <GraduationCap className="size-4 sm:size-5 text-amber-500" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <h1 className="text-sm sm:text-base font-bold text-zinc-100 truncate">
                KPSS Rehberi
              </h1>
              <span className="text-[10px] sm:text-xs text-zinc-400 font-medium hidden xs:block">
                Ön Lisans Akıllı Hazırlık
              </span>
            </div>
          </div>

          {/* Tab Navigation (Touch-First 40px) */}
          <nav
            className="flex items-center gap-1 p-1 rounded-lg bg-zinc-900 border border-zinc-800 shrink-0"
            role="tablist"
            aria-label="Ana navigasyon"
          >
            {[
              { id: "dashboard", icon: LayoutDashboard, label: "Genel Bakış" },
              { id: "subjects", icon: BookOpen, label: "Konular" },
            ].map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                role="tab"
                aria-selected={activeTab === id}
                aria-controls={`panel-${id}`}
                onClick={() => setActiveTab(id as ActiveTab)}
                className={cn(
                  "flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 min-h-[36px] sm:min-h-[38px] rounded-md text-xs font-semibold transition-all duration-150 touch-manipulation",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 active:scale-95",
                  activeTab === id
                    ? "bg-zinc-800 text-zinc-100 shadow-sm border border-zinc-700/50"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40"
                )}
              >
                <Icon className="size-3.5 shrink-0" aria-hidden="true" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-screen-xl mx-auto w-full px-3.5 sm:px-4 py-4 sm:py-6">
        {/* 1. DASHBOARD TAB */}
        <div
          id="panel-dashboard"
          role="tabpanel"
          aria-label="Genel Bakış"
          className={cn(activeTab !== "dashboard" && "hidden")}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Sol Kolon (2 Kolon Genişliğinde) */}
            <div className="lg:col-span-2 space-y-4">
              <CountdownTimer examDate={mounted ? store.examDate : "2026-10-05"} />

              {/* Leitner Tekrar Uyarısı */}
              {mounted && dueItems.length > 0 && (
                <SpacedRepetitionAlert
                  items={dueItems}
                  onSuccess={leitnerSuccess}
                  onFail={leitnerFail}
                  mounted={mounted}
                />
              )}

              {/* Günlük Akıllı Ders Programı */}
              <DailyRecommendation
                topicProgress={mounted ? store.topicProgress : {}}
                mounted={mounted}
                dueItems={dueItems}
                examDate={mounted ? store.examDate : "2026-10-05"}
                onStatusChange={updateStatus}
                onFocusRequest={handleFocusRequest}
              />

              <StatsPanel
                topicProgress={mounted ? store.topicProgress : {}}
                mounted={mounted}
              />
            </div>

            {/* Sağ Kolon (1 Kolon Genişliğinde) */}
            <div className="space-y-4">
              <PomodoroTimer
                workMinutes={store.pomodoroSettings.workMinutes}
                shortBreakMinutes={store.pomodoroSettings.shortBreakMinutes}
                longBreakMinutes={store.pomodoroSettings.longBreakMinutes}
                longBreakInterval={store.pomodoroSettings.longBreakInterval}
                focusRequest={focusRequest}
              />

              <OverallProgress
                topicProgress={mounted ? store.topicProgress : {}}
                mounted={mounted}
              />

              <HeatMap
                topicProgress={mounted ? store.topicProgress : {}}
                mounted={mounted}
              />
            </div>
          </div>
        </div>

        {/* 2. SUBJECTS TAB */}
        <div
          id="panel-subjects"
          role="tabpanel"
          aria-label="Konular"
          className={cn(activeTab !== "subjects" && "hidden")}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2 p-3.5 rounded-xl bg-zinc-900 border border-zinc-800">
              <div>
                <h2 className="text-sm sm:text-base font-bold text-zinc-100 flex items-center gap-2">
                  <Sparkles className="size-4 text-amber-400" aria-hidden="true" />
                  Ön Lisans KPSS Ders & Konu Matrisi
                </h2>
                <p className="text-xs text-zinc-400 mt-0.5 text-pretty">
                  Her konuda <strong>[Konu]</strong> ve <strong>[Soru]</strong> videolarına, <strong>[Özet]</strong> çalışma kağıtlarına erişin.
                </p>
              </div>
            </div>

            {SUBJECTS.map((subject) => (
              <SubjectAccordion
                key={subject.id}
                subject={subject}
                topicProgress={mounted ? store.topicProgress : {}}
                onStatusChange={updateStatus}
                onDifficultyChange={updateDifficulty}
                onIncrementCorrect={incrementCorrect}
                onIncrementWrong={incrementWrong}
                onNotesChange={updateNotes}
                mounted={mounted}
              />
            ))}
          </div>
        </div>
      </main>

      <footer className="border-t border-zinc-800 py-4 px-4 bg-zinc-950 safe-bottom">
        <p className="text-xs text-zinc-400 text-center font-medium">
          Veriler yalnızca bu cihazda saklanır · Ön Lisans KPSS Akıllı Hazırlık Platformu
        </p>
      </footer>
    </div>
  );
}