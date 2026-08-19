"use client";

import { useRef, useState, useCallback, useMemo } from "react";
import { getParetoRecommendations } from "@/lib/pareto";
import { Topic, TopicProgress, TopicStatus, SpacedRepetitionItem, PomodoroFocusRequest, VideoLink } from "@/types";
import { VideoModal } from "@/components/video/VideoModal";
import { SummarySheetModal } from "@/components/summary/SummarySheetModal";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";
import {
  CalendarDays, PlayCircle, BookOpen, Timer,
  CheckCircle2, Sun, CloudSun, Moon, Target,
  ChevronRight, Sparkles, FileText,
} from "lucide-react";

// ─── Sabitler ──────────────────────────────────────────────────────────────

const BLOCK_CONFIG = [
  {
    id: "sabah",
    timeLabel: "Sabah — Odak & Özet Seansı",
    Icon: Sun,
    iconColor: "text-amber-400",
    borderColor: "border-amber-500/30",
    bgColor: "bg-amber-500/5",
    durationMinutes: 50,
    goalTemplate: (topicName: string) =>
      `Pareto 80/20 konu anlatımını izle ve Akıllı Özet Kağıdını incele · Hedef: ${topicName} temelini kavra`,
    type: "lesson" as const,
    completedBg: "bg-emerald-950/40 border-emerald-700/40",
  },
  {
    id: "ogle",
    timeLabel: "Öğle — Pratik & Soru Seansı",
    Icon: CloudSun,
    iconColor: "text-sky-400",
    borderColor: "border-sky-500/30",
    bgColor: "bg-sky-500/5",
    durationMinutes: 40,
    goalTemplate: (topicName: string) =>
      `Soru çözümü videosunu izle ve tuzakları analiz et · Hedef: ${topicName}'dan 30 soru çöz`,
    type: "practice" as const,
    completedBg: "bg-emerald-950/40 border-emerald-700/40",
  },
  {
    id: "aksam",
    timeLabel: "Akşam — Leitner & Hafıza Tekrarı",
    Icon: Moon,
    iconColor: "text-violet-400",
    borderColor: "border-violet-500/30",
    bgColor: "bg-violet-500/5",
    durationMinutes: 30,
    goalTemplate: (topicName: string) =>
      `Hafıza kutusu şifrelerini gözden geçir ve hızlı tekrar yap · Hedef: ${topicName} hafızada kalıcı olsun`,
    type: "review" as const,
    completedBg: "bg-emerald-950/40 border-emerald-700/40",
  },
];

// ─── Props ─────────────────────────────────────────────────────────────────

interface DailyRecommendationProps {
  topicProgress: Record<string, TopicProgress>;
  mounted: boolean;
  dueItems: SpacedRepetitionItem[];
  examDate: string;
  onStatusChange: (topicId: string, status: TopicStatus) => void;
  onFocusRequest?: (req: PomodoroFocusRequest) => void;
}

// ─── Yardımcı: Kalan gün hesabı ───────────────────────────────────────────

function daysUntil(dateStr: string): number {
  const now = new Date();
  const target = new Date(dateStr);
  const diff = target.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

// ─── StudyBlockCard Bileşeni ───────────────────────────────────────────────

interface StudyBlockCardProps {
  blockId: string;
  timeLabel: string;
  Icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  borderColor: string;
  bgColor: string;
  durationMinutes: number;
  goal: string;
  type: "lesson" | "practice" | "review";
  topic: Topic;
  subjectName: string;
  subjectBadgeVariant: "amber" | "emerald" | "blue" | "violet" | "orange" | "sky" | "rose" | "default";
  isCompleted: boolean;
  completedBg: string;
  onComplete: () => void;
  onFocusRequest?: (minutes: number, label: string) => void;
}

function StudyBlockCard({
  timeLabel, Icon, iconColor, borderColor, bgColor,
  durationMinutes, goal, type, topic, subjectName,
  subjectBadgeVariant, isCompleted, completedBg,
  onComplete, onFocusRequest,
}: StudyBlockCardProps) {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [summaryModalOpen, setSummaryModalOpen] = useState(false);
  const [modalVideo, setModalVideo] = useState<VideoLink | null>(null);

  const lessonBtnRef = useRef<HTMLButtonElement>(null);
  const solutionBtnRef = useRef<HTMLButtonElement>(null);
  const summaryBtnRef = useRef<HTMLButtonElement>(null);
  const activeTriggerRef = useRef<HTMLButtonElement | null>(null);

  const openVideo = useCallback((video: VideoLink, triggerRef: React.RefObject<HTMLButtonElement | null>) => {
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

  return (
    <>
      <div
        className={cn(
          "relative rounded-xl border p-3.5 sm:p-4 transition-all duration-200",
          isCompleted ? completedBg : cn(bgColor, borderColor),
          isCompleted && "opacity-85"
        )}
        aria-label={`${timeLabel}: ${topic.name}`}
      >
        {/* Tamamlanma Rozeti Overlay */}
        {isCompleted && (
          <div
            className="absolute top-3 right-3 pointer-events-none"
            aria-hidden="true"
          >
            <CheckCircle2 className="size-5 text-emerald-400" />
          </div>
        )}

        {/* Başlık Satırı */}
        <div className="flex items-center gap-2 mb-2.5">
          <Icon className={cn("size-4 shrink-0", iconColor)} aria-hidden="true" />
          <span className="text-xs font-bold text-zinc-200 uppercase tracking-wide">
            {timeLabel}
          </span>
          <Badge variant="default" className="ml-auto text-[10px] tabular-nums">
            {durationMinutes} dk
          </Badge>
        </div>

        {/* Konu & Ders */}
        <div className="mb-3.5">
          <div className="flex items-start gap-2 flex-wrap">
            <h3 className={cn(
              "text-sm sm:text-base font-bold text-zinc-100 text-balance leading-snug",
              isCompleted && "line-through text-zinc-500"
            )}>
              {topic.name}
            </h3>
            <Badge variant={subjectBadgeVariant} className="shrink-0 self-start mt-0.5">
              {subjectName}
            </Badge>
          </div>
          <p className="text-xs text-zinc-400 mt-1.5 text-pretty leading-relaxed">
            <Target className="size-3 inline mr-1 shrink-0 text-zinc-500" aria-hidden="true" />
            {goal}
          </p>
        </div>

        {/* Hızlı Eylem Butonları (Mobilde 2x2 Grid, Tablet/Masaüstü Flex) */}
        <div
          className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 pt-2 border-t border-zinc-800/80"
          role="group"
          aria-label={`${topic.name} seans aksiyonları`}
        >
          {/* Konu Videosu (Sabah / Akşam) */}
          {type === "lesson" && (
            <Button
              ref={lessonBtnRef}
              variant="amber"
              size="sm"
              onClick={() => openVideo(topic.videoLesson, lessonBtnRef as React.RefObject<HTMLButtonElement | null>)}
              disabled={isCompleted}
              aria-label={`${topic.name} konu anlatımı videosunu aç`}
              className="w-full sm:w-auto text-xs font-medium"
            >
              <PlayCircle className="size-3.5" aria-hidden="true" />
              <span>Konu Videosu</span>
            </Button>
          )}

          {/* Soru Çözümü (Öğle / Akşam) */}
          {type === "practice" && (
            <Button
              ref={solutionBtnRef}
              variant="emerald"
              size="sm"
              onClick={() => openVideo(topic.videoSolution, solutionBtnRef as React.RefObject<HTMLButtonElement | null>)}
              disabled={isCompleted}
              aria-label={`${topic.name} soru çözümü videosunu aç`}
              className="w-full sm:w-auto text-xs font-medium"
            >
              <BookOpen className="size-3.5" aria-hidden="true" />
              <span>Soru Çözümü</span>
            </Button>
          )}

          {/* Akıllı Özet & Çalışma Kağıdı */}
          <Button
            ref={summaryBtnRef}
            variant="secondary"
            size="sm"
            onClick={openSummary}
            disabled={isCompleted}
            aria-label={`${topic.name} özet ve çalışma kağıdını aç`}
            className="w-full sm:w-auto text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-zinc-700"
          >
            <FileText className="size-3.5 text-amber-400" aria-hidden="true" />
            <span>Özet Kağıdı</span>
          </Button>

          {/* Odaklan — Pomodoro tetikle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onFocusRequest?.(durationMinutes, topic.name)}
            disabled={isCompleted}
            aria-label={`${topic.name} için ${durationMinutes} dakikalık Pomodoro başlat`}
            className="w-full sm:w-auto text-xs font-medium text-zinc-300 hover:text-zinc-100 bg-zinc-800/40 hover:bg-zinc-800"
          >
            <Timer className="size-3.5 text-zinc-400" aria-hidden="true" />
            <span>Odaklan</span>
          </Button>

          {/* Tamamla Butonu */}
          <Button
            variant={isCompleted ? "secondary" : "emerald"}
            size="sm"
            onClick={onComplete}
            aria-label={isCompleted ? `${topic.name} tamamlandı` : `${topic.name} seansını tamamla`}
            className="w-full sm:w-auto sm:ml-auto text-xs font-semibold"
          >
            <CheckCircle2 className="size-3.5" aria-hidden="true" />
            <span>{isCompleted ? "Tamamlandı" : "Tamamla"}</span>
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
          subjectName={subjectName}
          triggerRef={activeTriggerRef as React.RefObject<HTMLButtonElement | null>}
        />
      )}
    </>
  );
}

// ─── Ana Bileşen ──────────────────────────────────────────────────────────

const SUBJECT_BADGE_MAP: Record<string, "amber" | "emerald" | "blue" | "violet" | "orange"> = {
  turkce: "violet",
  matematik: "blue",
  tarih: "amber",
  cografya: "emerald",
  vatandaslik: "orange",
};

export function DailyRecommendation({
  topicProgress,
  mounted,
  dueItems,
  examDate,
  onStatusChange,
  onFocusRequest,
}: DailyRecommendationProps) {
  const [completedBlocks, setCompletedBlocks] = useState<Set<string>>(new Set());

  // Top-5 Pareto önerisi
  const recommendations = useMemo(
    () => (mounted ? getParetoRecommendations(topicProgress, 5) : []),
    [topicProgress, mounted]
  );

  const toggleBlock = useCallback((blockId: string) => {
    setCompletedBlocks((prev) => {
      const next = new Set(prev);
      if (next.has(blockId)) {
        next.delete(blockId);
      } else {
        next.add(blockId);
      }
      return next;
    });
  }, []);

  const handleFocusRequest = useCallback(
    (minutes: number, label: string) => {
      onFocusRequest?.({
        label,
        minutes,
        triggeredAt: Date.now(),
      });
    },
    [onFocusRequest]
  );

  // Kalan gün
  const daysLeft = mounted ? daysUntil(examDate) : 0;

  // Günlük kota hesabı
  const allTopicIds = useMemo(() => {
    const rec = mounted ? getParetoRecommendations(topicProgress, 999) : [];
    return rec.map((r) => r.topic.id);
  }, [topicProgress, mounted]);

  const dailyQuota = daysLeft > 0 ? Math.max(1, Math.ceil(allTopicIds.length / daysLeft)) : 0;
  const completedCount = completedBlocks.size;
  const progressPct = Math.round((completedCount / 3) * 100);

  // 3 blok için konu seçimi
  const block1Topic = recommendations[0];
  const block2Topic = block1Topic; // aynı konu, soru çözümü
  const block3Topic = dueItems[0]
    ? { topic: dueItems[0].topic, subjectName: dueItems[0].subjectName, subjectColor: "" }
    : recommendations[1];

  if (!mounted) {
    return (
      <section aria-label="Günlük Akıllı Ders Programı" className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-40 bg-zinc-800/80 rounded-lg animate-pulse" />
          ))}
        </div>
      </section>
    );
  }

  if (recommendations.length === 0) {
    return (
      <section
        aria-label="Günlük Akıllı Ders Programı"
        className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 flex flex-col items-center justify-center gap-3 text-center"
      >
        <Sparkles className="size-8 text-emerald-400" aria-hidden="true" />
        <div>
          <h2 className="text-base font-bold text-zinc-100">Tüm Konular Tamamlandı!</h2>
          <p className="text-sm text-zinc-400 mt-1 text-pretty">
            Harika iş! Tekrar zamanlamasını takip et ve sorularını çözmeye devam et.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section aria-label="Günlük Akıllı Ders Programı" className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden shadow-sm">
      {/* Başlık ve kota analitiği */}
      <div className="p-3.5 sm:p-4 border-b border-zinc-800">
        <div className="flex items-start gap-3">
          <div className="size-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
            <CalendarDays className="size-5 text-amber-400" aria-hidden="true" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-sm font-bold text-zinc-100">Günlük Akıllı Ders Programı</h2>
              <Badge variant="amber">Pareto 80/20</Badge>
            </div>
            <p className="text-xs text-zinc-400 mt-1 text-pretty">
              Sınava{" "}
              <strong className="text-amber-400 tabular-nums">{daysLeft} gün</strong>{" "}
              kaldı. Hedef:{" "}
              <strong className="text-zinc-200">
                3 Seans + {dailyQuota * 30} Soru
              </strong>
              .
            </p>
          </div>
        </div>

        {/* Günlük verimlilik progress */}
        <div className="mt-3">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-zinc-400 font-medium">
              Bugünün ilerlemesi ({completedCount}/3 seans)
            </span>
            <span className="text-xs tabular-nums font-bold text-emerald-400">
              %{progressPct}
            </span>
          </div>
          <div
            role="progressbar"
            aria-valuenow={progressPct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Bugün ${completedCount} seans tamamlandı`}
            className="h-2 rounded-full bg-zinc-800 overflow-hidden"
          >
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-500 ease-out"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Seans blokları */}
      <div className="p-3.5 sm:p-4 space-y-3">
        {BLOCK_CONFIG.map((block, idx) => {
          let topicRec = idx === 2 ? block3Topic : (idx === 0 ? block1Topic : block2Topic);
          if (!topicRec) topicRec = block1Topic;
          if (!topicRec) return null;

          const isLeitnerBlock = idx === 2 && dueItems.length > 0;
          const subjectId = topicRec.topic.subjectId;
          const badgeVariant = SUBJECT_BADGE_MAP[subjectId] ?? "default";
          const blockKey = `${block.id}-${topicRec.topic.id}`;

          return (
            <div key={blockKey}>
              {/* Oklu ayırıcı */}
              {idx > 0 && (
                <div className="flex items-center gap-2 py-1" aria-hidden="true">
                  <div className="flex-1 h-px bg-zinc-800/80" />
                  <ChevronRight className="size-3 text-zinc-600" />
                  <div className="flex-1 h-px bg-zinc-800/80" />
                </div>
              )}

              <StudyBlockCard
                blockId={block.id}
                timeLabel={block.timeLabel}
                Icon={block.Icon}
                iconColor={block.iconColor}
                borderColor={block.borderColor}
                bgColor={block.bgColor}
                durationMinutes={block.durationMinutes}
                type={block.type}
                topic={topicRec.topic}
                subjectName={isLeitnerBlock ? `${topicRec.subjectName} · Tekrar` : topicRec.subjectName}
                subjectBadgeVariant={badgeVariant}
                goal={block.goalTemplate(topicRec.topic.name)}
                isCompleted={completedBlocks.has(block.id)}
                completedBg={block.completedBg}
                onComplete={() => {
                  toggleBlock(block.id);
                  // Sabah bloğu tamamlanınca konuyu "in-progress" yap
                  if (block.id === "sabah" && !completedBlocks.has(block.id)) {
                    const currentStatus = topicProgress[topicRec!.topic.id]?.status;
                    if (currentStatus === "not-started") {
                      onStatusChange(topicRec!.topic.id, "in-progress");
                    }
                  }
                  // Öğle/Akşam tamamlanınca "completed"
                  if ((block.id === "ogle" || block.id === "aksam") && !completedBlocks.has(block.id)) {
                    if (completedBlocks.has("sabah")) {
                      onStatusChange(topicRec!.topic.id, "completed");
                    }
                  }
                }}
                onFocusRequest={handleFocusRequest}
              />
            </div>
          );
        })}
      </div>

      {/* Tüm seanslar tamamlandı */}
      {completedCount === 3 && (
        <div className="mx-3.5 sm:mx-4 mb-3.5 sm:mb-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3">
          <Sparkles className="size-4 text-emerald-400 shrink-0" aria-hidden="true" />
          <p className="text-xs text-emerald-300 text-pretty">
            <strong>Mükemmel!</strong> Bugünün tüm seanslarını tamamladın. Soru çözmek için ders matrisine geç.
          </p>
        </div>
      )}
    </section>
  );
}