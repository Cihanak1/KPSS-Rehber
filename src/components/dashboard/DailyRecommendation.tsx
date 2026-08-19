"use client";

import { useRef, useState, useCallback, useMemo } from "react";
import {
  Topic,
  TopicProgress,
  PomodoroFocusRequest,
  VideoResource,
  DailyPlanRecord,
  DailyTask,
  UserProfile,
} from "@/types";
import { getTopicById, SUBJECTS } from "@/data/curriculum";
import { getTodayDateString, getLast7DaysOverview, generateDailyPlanForDate } from "@/lib/dailyPlanner";
import { VideoModal } from "@/components/video/VideoModal";
import { SummarySheetModal } from "@/components/summary/SummarySheetModal";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";
import {
  PlayCircle,
  Timer,
  CheckCircle2,
  Sun,
  CloudSun,
  Moon,
  Target,
  Sparkles,
  FileText,
  RotateCcw,
  Flame,
  Check,
} from "lucide-react";

// ─── Sabitler ──────────────────────────────────────────────────────────────

const BLOCK_META = {
  morning: {
    label: "Sabah — Odak & Video Seansı",
    Icon: Sun,
    iconColor: "text-amber-400",
    borderColor: "border-amber-500/30",
    bgColor: "bg-amber-500/5",
    badgeVariant: "amber" as const,
  },
  noon: {
    label: "Öğle — Pratik & Soru Seansı",
    Icon: CloudSun,
    iconColor: "text-sky-400",
    borderColor: "border-sky-500/30",
    bgColor: "bg-sky-500/5",
    badgeVariant: "sky" as const,
  },
  evening: {
    label: "Akşam — Leitner & Hafıza Tekrarı",
    Icon: Moon,
    iconColor: "text-violet-400",
    borderColor: "border-violet-500/30",
    bgColor: "bg-violet-500/5",
    badgeVariant: "violet" as const,
  },
};

const SUBJECT_BADGE_MAP: Record<string, "violet" | "blue" | "amber" | "emerald" | "orange"> = {
  turkce: "violet",
  matematik: "blue",
  tarih: "amber",
  cografya: "emerald",
  vatandaslik: "orange",
};

// ─── Props ─────────────────────────────────────────────────────────────────

interface DailyRecommendationProps {
  topicProgress: Record<string, TopicProgress>;
  dailyPlans: Record<string, DailyPlanRecord>;
  userProfile: UserProfile | null;
  mounted: boolean;
  examDate: string;
  onToggleTask: (date: string, taskId: string) => void;
  onRegeneratePlan: () => void;
  onFocusRequest?: (req: PomodoroFocusRequest) => void;
}

// ─── Yardımcı: Kalan gün hesabı ───────────────────────────────────────────

function daysUntil(dateStr: string): number {
  const now = new Date();
  const target = new Date(dateStr);
  const diff = target.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

// ─── TaskCard Bileşeni ─────────────────────────────────────────────────────

interface TaskCardProps {
  task: DailyTask;
  topic: Topic;
  subjectColor: string;
  onToggleComplete: () => void;
  onFocusRequest?: (minutes: number, label: string) => void;
}

function TaskCard({ task, topic, subjectColor, onToggleComplete, onFocusRequest }: TaskCardProps) {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [summaryModalOpen, setSummaryModalOpen] = useState(false);
  const [modalVideo, setModalVideo] = useState<VideoResource | null>(null);

  const videoBtnRef = useRef<HTMLButtonElement>(null);
  const summaryBtnRef = useRef<HTMLButtonElement>(null);
  const activeTriggerRef = useRef<HTMLButtonElement | null>(null);

  const openVideo = useCallback((video: VideoResource, triggerRef: React.RefObject<HTMLButtonElement | null>) => {
    activeTriggerRef.current = triggerRef.current;
    setModalVideo(video);
    setVideoModalOpen(true);
  }, []);

  const openSummary = useCallback(() => {
    activeTriggerRef.current = summaryBtnRef.current;
    setSummaryModalOpen(true);
  }, []);

  const closeVideoModal = useCallback(() => {
    setVideoModalOpen(false);
    setModalVideo(null);
  }, []);

  const closeSummaryModal = useCallback(() => {
    setSummaryModalOpen(false);
  }, []);

  const meta = BLOCK_META[task.blockType] || BLOCK_META.morning;
  const BlockIcon = meta.Icon;
  const subjectBadge = SUBJECT_BADGE_MAP[task.subjectId] || "default";
  const videoResource = task.blockType === "noon" ? topic.videoSolution : topic.videoLesson;

  return (
    <>
      <div
        className={cn(
          "rounded-xl border transition-all duration-200 p-4 sm:p-5 flex flex-col gap-3.5",
          task.isCompleted
            ? "bg-emerald-950/20 border-emerald-500/40 shadow-sm"
            : cn(meta.bgColor, meta.borderColor)
        )}
      >
        {/* Üst Bilgi Barı */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <BlockIcon className={cn("size-4 shrink-0", meta.iconColor)} aria-hidden="true" />
            <span className="text-xs font-bold text-zinc-300 tracking-wide">{meta.label}</span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <Badge variant={subjectBadge} className="text-[11px] font-semibold py-0.5 px-2">
              {task.subjectName}
            </Badge>
            <span className="text-[11px] font-mono text-zinc-400 bg-zinc-800/80 px-2 py-0.5 rounded border border-zinc-700/60">
              ⏱ {task.durationMinutes} dk
            </span>
          </div>
        </div>

        {/* Başlık ve Hedef */}
        <div className="space-y-1">
          <h4
            className={cn(
              "text-sm sm:text-base font-bold text-zinc-100 leading-snug text-balance transition-all",
              task.isCompleted && "line-through text-zinc-400"
            )}
          >
            {task.title}
          </h4>
          <p className="text-xs text-zinc-400 leading-relaxed text-pretty">
            {task.blockType === "morning" && (
              <span>Önemli ÖSYM kurallarını kavramak için konu videosunu izle ve Akıllı Özet Kağıdını incele.</span>
            )}
            {task.blockType === "noon" && (
              <span>Soru çözüm taktiklerini gör ve çıkabilecek soru tuzaklarını çöz (Hedef: 30 Soru).</span>
            )}
            {task.blockType === "evening" && (
              <span>Hafıza şifrelerini (KAYIP SAKAL vb.) ve kritik kuralları 2 dakikalık hızlı tekrarla pekiştir.</span>
            )}
          </p>
        </div>

        {/* Alt Eylem Butonları */}
        <div className="flex items-center gap-2 flex-wrap pt-1 border-t border-zinc-800/60">
          {/* Video Butonu */}
          <Button
            ref={videoBtnRef}
            variant="ghost"
            size="sm"
            onClick={() => openVideo(videoResource, videoBtnRef)}
            aria-label={`${topic.name} videosunu aç`}
            className="text-xs font-semibold text-zinc-200 hover:text-zinc-50 bg-zinc-800/70 hover:bg-zinc-800 touch-manipulation min-h-[38px]"
          >
            <PlayCircle className="size-3.5 text-amber-400 mr-1" aria-hidden="true" />
            <span>{task.blockType === "noon" ? "Soru Çözümü" : "Konu Anlatımı"}</span>
          </Button>

          {/* Özet Kağıdı Butonu */}
          <Button
            ref={summaryBtnRef}
            variant="ghost"
            size="sm"
            onClick={openSummary}
            aria-label={`${topic.name} akıllı özet kağıdını aç`}
            className="text-xs font-semibold text-zinc-200 hover:text-zinc-50 bg-zinc-800/70 hover:bg-zinc-800 touch-manipulation min-h-[38px]"
          >
            <FileText className="size-3.5 text-amber-400 mr-1" aria-hidden="true" />
            <span>Özet Kağıdı</span>
          </Button>

          {/* Odaklan — Pomodoro Tetikle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onFocusRequest?.(task.durationMinutes, topic.name)}
            disabled={task.isCompleted}
            aria-label={`${topic.name} için ${task.durationMinutes} dakikalık Pomodoro başlat`}
            className="text-xs font-medium text-zinc-300 hover:text-zinc-100 bg-zinc-800/40 hover:bg-zinc-800 touch-manipulation min-h-[38px]"
          >
            <Timer className="size-3.5 text-zinc-400 mr-1" aria-hidden="true" />
            <span>Odaklan</span>
          </Button>

          {/* Tamamla Butonu (Kalıcı State) */}
          <Button
            variant={task.isCompleted ? "secondary" : "emerald"}
            size="sm"
            onClick={onToggleComplete}
            aria-label={task.isCompleted ? `${task.title} tamamlandı` : `${task.title} görevini tamamla`}
            className={cn(
              "w-full sm:w-auto sm:ml-auto text-xs font-bold touch-manipulation min-h-[38px] transition-all",
              task.isCompleted
                ? "bg-emerald-900/40 text-emerald-300 border-emerald-700/50 hover:bg-emerald-900/60"
                : "bg-emerald-600 hover:bg-emerald-500 text-white"
            )}
          >
            <CheckCircle2 className="size-4 mr-1.5" aria-hidden="true" />
            <span>{task.isCompleted ? "Tamamlandı ✓" : "Görevi Tamamla"}</span>
          </Button>
        </div>
      </div>

      {/* Video Modal */}
      {videoModalOpen && modalVideo && (
        <VideoModal
          isOpen={videoModalOpen}
          onClose={closeVideoModal}
          video={modalVideo}
          triggerRef={activeTriggerRef as React.RefObject<HTMLButtonElement | null>}
          onOpenSummary={openSummary}
        />
      )}

      {/* Summary Sheet Modal */}
      {summaryModalOpen && (
        <SummarySheetModal
          isOpen={summaryModalOpen}
          onClose={closeSummaryModal}
          topic={topic}
          subjectColor={subjectColor}
          triggerRef={activeTriggerRef as React.RefObject<HTMLButtonElement | null>}
        />
      )}
    </>
  );
}

// ─── Ana DailyRecommendation Bileşeni ──────────────────────────────────────

export function DailyRecommendation({
  topicProgress,
  dailyPlans,
  userProfile,
  mounted,
  examDate,
  onToggleTask,
  onRegeneratePlan,
  onFocusRequest,
}: DailyRecommendationProps) {
  const today = getTodayDateString();

  // Günün planını store'dan al veya üret
  const todayPlan = useMemo(() => {
    if (dailyPlans[today]) return dailyPlans[today];
    return generateDailyPlanForDate(today, topicProgress, userProfile);
  }, [dailyPlans, today, topicProgress, userProfile]);

  const completedCount = todayPlan.tasks.filter((t) => t.isCompleted).length;
  const totalTasks = todayPlan.tasks.length || 3;
  const progressPercent = Math.round((completedCount / totalTasks) * 100);
  const isDayFinished = completedCount === totalTasks;

  const daysLeft = daysUntil(examDate);
  const sevenDaysOverview = useMemo(() => getLast7DaysOverview(dailyPlans), [dailyPlans]);

  // Skeleton Loader (Hydration flicker engelleme)
  if (!mounted) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 sm:p-6 space-y-4 animate-pulse">
        <div className="h-6 bg-zinc-800 rounded-lg w-1/3" />
        <div className="h-4 bg-zinc-800/60 rounded w-1/2" />
        <div className="space-y-3 pt-2">
          <div className="h-28 bg-zinc-800/40 rounded-xl" />
          <div className="h-28 bg-zinc-800/40 rounded-xl" />
          <div className="h-28 bg-zinc-800/40 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <section
      className="rounded-2xl border border-zinc-800 bg-zinc-900 overflow-hidden shadow-xl shadow-zinc-950/40"
      aria-label="Günün Akıllı Eylem Planı"
    >
      {/* 1. Üst Başlık & İlerleme Barı */}
      <div className="p-4 sm:p-6 border-b border-zinc-800 bg-zinc-900/90 space-y-4">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="size-2.5 rounded-full bg-amber-400 animate-pulse" aria-hidden="true" />
              <h3 className="text-base sm:text-lg font-bold text-zinc-100 flex items-center gap-2">
                <span>Günün Akıllı Eylem Planı</span>
                {userProfile && (
                  <span className="text-xs text-amber-400 font-semibold hidden xs:inline">
                    · {userProfile.name}
                  </span>
                )}
              </h3>
              <Badge variant="amber" className="text-[11px] font-mono py-0.5 px-2">
                Pareto 80/20 Motoru
              </Badge>
            </div>
            <p className="text-xs text-zinc-400 text-pretty">
              Sınava <strong>{daysLeft} gün</strong> kaldı. Bugün tamamlanan görevler tarayıcında kalıcı olarak saklanır.
            </p>
          </div>

          {/* Manuel Yeniden Planla Butonu */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onRegeneratePlan}
            className="text-xs text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 border border-zinc-800 rounded-lg touch-manipulation min-h-[38px]"
            title="Bugünün görevlerini Pareto önceliklerine göre yeniden oluştur"
          >
            <RotateCcw className="size-3.5 mr-1.5" aria-hidden="true" />
            <span>Yeniden Planla</span>
          </Button>
        </div>

        {/* Günlük İlerleme Göstergesi */}
        <div className="space-y-1.5 bg-zinc-950/60 p-3 rounded-xl border border-zinc-800/80">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-zinc-300 flex items-center gap-1.5">
              <Target className="size-3.5 text-amber-400" aria-hidden="true" />
              <span>Günün Görevleri: {completedCount} / {totalTasks} Tamamlandı</span>
            </span>
            <span className="text-amber-400 font-mono font-bold">%{progressPercent}</span>
          </div>
          <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-500 to-emerald-500 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* 7 Günlük Mini Takvim Barı */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-[11px] text-zinc-400 font-medium px-0.5">
            <span>Haftalık Çalışma Geçmişi</span>
            {userProfile && (
              <span className="text-amber-400 font-bold flex items-center gap-1">
                <Flame className="size-3 fill-amber-400" />
                {userProfile.streakCount} Günlük Seri
              </span>
            )}
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {sevenDaysOverview.map((day) => (
              <div
                key={day.date}
                className={cn(
                  "p-2 rounded-lg border text-center flex flex-col items-center justify-center gap-1 transition-all",
                  day.isToday
                    ? "bg-amber-500/10 border-amber-500/40 text-amber-300 font-bold"
                    : day.isCompleted
                    ? "bg-emerald-950/30 border-emerald-600/40 text-emerald-400"
                    : "bg-zinc-950/40 border-zinc-800 text-zinc-500"
                )}
                title={`${day.date}: ${day.isCompleted ? "Tamamlandı" : "Boş"}`}
              >
                <span className="text-[10px] uppercase font-semibold">{day.dayLabel}</span>
                <div className="size-5 rounded-full flex items-center justify-center text-xs">
                  {day.isCompleted ? (
                    <Check className="size-3.5 text-emerald-400 stroke-[3]" />
                  ) : day.isToday ? (
                    <span className="text-[11px] font-bold text-amber-400">{day.dayNumber}</span>
                  ) : (
                    <span className="text-[11px]">{day.dayNumber}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Günün Görev Kartları */}
      <div className="p-4 sm:p-6 space-y-3.5 bg-zinc-950/40">
        {isDayFinished && (
          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-600/50 flex items-center gap-3 animate-in fade-in-50 duration-200">
            <div className="size-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Sparkles className="size-5" aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-bold text-emerald-200">
                🎉 Harika İş! Bugünün Tüm Görevlerini Tamamladın!
              </h4>
              <p className="text-xs text-emerald-400/90 text-pretty">
                Çalışma serin başarıyla güncellendi. Dinlenmeyi ve yarınki odak seansına zinde başlamayı unutma.
              </p>
            </div>
          </div>
        )}

        {todayPlan.tasks.map((task) => {
          const topicLookup = getTopicById(task.topicId);
          const fallbackTopic = SUBJECTS[0].topics[0];
          const topic = topicLookup?.topic ?? fallbackTopic;
          const subjectColor = topicLookup?.subject.color ?? "text-amber-400";

          return (
            <TaskCard
              key={task.id}
              task={task}
              topic={topic}
              subjectColor={subjectColor}
              onToggleComplete={() => onToggleTask(today, task.id)}
              onFocusRequest={(minutes, label) =>
                onFocusRequest?.({
                  minutes,
                  label,
                  triggeredAt: Date.now(),
                })
              }
            />
          );
        })}
      </div>
    </section>
  );
}