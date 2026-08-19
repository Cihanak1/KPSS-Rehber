"use client";

import { useRef, useState } from "react";
import { Topic, TopicProgress, TopicStatus, DifficultyLevel, VideoLink } from "@/types";
import { VideoModal } from "@/components/video/VideoModal";
import { SummarySheetModal } from "@/components/summary/SummarySheetModal";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { StarRating } from "@/components/ui/StarRating";
import { cn } from "@/lib/cn";
import {
  PlayCircle, BookOpen, CheckCircle, RotateCcw,
  ChevronDown, ChevronUp, Plus, Minus, FileText,
} from "lucide-react";

interface TopicCardProps {
  topic: Topic;
  progress: TopicProgress;
  onStatusChange: (status: TopicStatus) => void;
  onDifficultyChange: (difficulty: DifficultyLevel) => void;
  onIncrementCorrect: () => void;
  onIncrementWrong: () => void;
  onNotesChange: (notes: string) => void;
  subjectColor: string;
}

const STATUS_CONFIG: Record<TopicStatus, { label: string; color: string; icon: React.ReactNode }> = {
  "not-started": { label: "Başlanmadı", color: "bg-zinc-800 text-zinc-400 hover:bg-zinc-700", icon: null },
  "in-progress": { label: "Devam Ediyor", color: "bg-amber-500/20 text-amber-300 hover:bg-amber-500/30", icon: <RotateCcw className="size-3" aria-hidden="true" /> },
  "completed": { label: "Tamamlandı", color: "bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30", icon: <CheckCircle className="size-3" aria-hidden="true" /> },
  "needs-review": { label: "Tekrar Edilecek", color: "bg-violet-500/20 text-violet-300 hover:bg-violet-500/30", icon: <BookOpen className="size-3" aria-hidden="true" /> },
};

const STATUS_ORDER: TopicStatus[] = ["not-started", "in-progress", "completed", "needs-review"];

export function TopicCard({
  topic, progress, onStatusChange, onDifficultyChange,
  onIncrementCorrect, onIncrementWrong, onNotesChange,
  subjectColor,
}: TopicCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [summaryModalOpen, setSummaryModalOpen] = useState(false);
  const [modalVideo, setModalVideo] = useState<VideoLink | null>(null);

  const lessonBtnRef = useRef<HTMLButtonElement>(null);
  const solutionBtnRef = useRef<HTMLButtonElement>(null);
  const summaryBtnRef = useRef<HTMLButtonElement>(null);
  const activeTriggerRef = useRef<HTMLButtonElement | null>(null);

  const openLesson = () => {
    activeTriggerRef.current = lessonBtnRef.current;
    setModalVideo(topic.videoLesson);
    setVideoModalOpen(true);
  };

  const openSolution = () => {
    activeTriggerRef.current = solutionBtnRef.current;
    setModalVideo(topic.videoSolution);
    setVideoModalOpen(true);
  };

  const openSummary = () => {
    activeTriggerRef.current = summaryBtnRef.current;
    setSummaryModalOpen(true);
  };

  const closeVideoModal = () => {
    setVideoModalOpen(false);
    setModalVideo(null);
  };

  const closeSummaryModal = () => {
    setSummaryModalOpen(false);
  };

  const cycleStatus = () => {
    const idx = STATUS_ORDER.indexOf(progress.status);
    onStatusChange(STATUS_ORDER[(idx + 1) % STATUS_ORDER.length]);
  };

  const accuracy = progress.solvedCount > 0
    ? Math.round((progress.correctCount / progress.solvedCount) * 100)
    : null;

  const statusConfig = STATUS_CONFIG[progress.status];
  const isCompleted = progress.status === "completed";

  return (
    <>
      <article
        className={cn(
          "rounded-lg border border-zinc-800 bg-zinc-900 overflow-hidden",
          "hover:border-zinc-700 transition-all duration-150 flex flex-col",
          isCompleted && "opacity-80"
        )}
        aria-label={`${topic.name} konusu`}
      >
        <div className="flex flex-1">
          {/* Sol Renk Çubuğu */}
          <div
            className={cn("w-1.5 shrink-0", {
              "bg-violet-500": subjectColor.includes("violet"),
              "bg-blue-500": subjectColor.includes("blue"),
              "bg-amber-500": subjectColor.includes("amber"),
              "bg-emerald-500": subjectColor.includes("emerald"),
              "bg-orange-500": subjectColor.includes("orange"),
            })}
            aria-hidden="true"
          />

          <div className="flex-1 p-3.5 flex flex-col justify-between">
            {/* Üst Satır: Konu Adı & Durum Rozeti */}
            <div>
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <h3 className={cn(
                    "text-sm font-semibold text-zinc-100 text-balance leading-snug",
                    isCompleted && "line-through text-zinc-500"
                  )}>
                    {topic.name}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                    <Badge variant="default" className="text-[10px] tabular-nums">
                      ÖSYM: {topic.osmyWeight}/10
                    </Badge>
                    {accuracy !== null && (
                      <Badge variant={accuracy >= 60 ? "emerald" : "rose"} className="text-[10px] tabular-nums">
                        %{accuracy} doğru
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Durum Değiştirme Butonu */}
                <button
                  type="button"
                  onClick={cycleStatus}
                  className={cn(
                    "inline-flex items-center gap-1 px-2.5 py-1.5 min-h-[32px] rounded-full text-[11px] font-medium shrink-0",
                    "transition-all duration-150 active:scale-95 touch-manipulation",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500",
                    statusConfig.color
                  )}
                  aria-label={`Durum: ${statusConfig.label}. Değiştirmek için tıkla`}
                >
                  {statusConfig.icon}
                  <span>{statusConfig.label}</span>
                </button>
              </div>

              {/* Zorluk Seviyesi */}
              <div className="mt-2.5">
                <StarRating value={progress.difficulty} onChange={onDifficultyChange} />
              </div>
            </div>

            {/* Orta Satır: Doğru/Yanlış Sayaçları & Not Butonu */}
            <div className="flex items-center justify-between gap-2 mt-3 pt-2.5 border-t border-zinc-800/80">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={onIncrementCorrect}
                  className="inline-flex items-center justify-center gap-1 px-2.5 py-1 min-h-[34px] min-w-[44px] rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/20 active:scale-95 transition-all touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                  aria-label="Doğru sayısını 1 artır"
                >
                  <Plus className="size-3.5" aria-hidden="true" />
                  <span className="tabular-nums">{progress.correctCount}</span>
                </button>
                <button
                  type="button"
                  onClick={onIncrementWrong}
                  className="inline-flex items-center justify-center gap-1 px-2.5 py-1 min-h-[34px] min-w-[44px] rounded-md bg-rose-500/10 text-rose-400 text-xs font-semibold hover:bg-rose-500/20 active:scale-95 transition-all touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                  aria-label="Yanlış sayısını 1 artır"
                >
                  <Minus className="size-3.5" aria-hidden="true" />
                  <span className="tabular-nums">{progress.wrongCount}</span>
                </button>
                <span className="text-xs text-zinc-500 tabular-nums ml-0.5">/{progress.solvedCount} soru</span>
              </div>

              <button
                type="button"
                onClick={() => setExpanded(!expanded)}
                className="p-2 min-h-[34px] min-w-[34px] flex items-center justify-center text-zinc-400 hover:text-zinc-200 active:scale-95 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-md bg-zinc-800/50 hover:bg-zinc-800 touch-manipulation"
                aria-expanded={expanded}
                aria-controls={`notes-${topic.id}`}
                aria-label={expanded ? "Not alanını kapat" : "Not ekle veya görüntüle"}
              >
                {expanded ? <ChevronUp className="size-4" aria-hidden="true" /> : <ChevronDown className="size-4" aria-hidden="true" />}
              </button>
            </div>

            {/* Alt Satır: Eylem Butonları Üçlüsü (Responsive 3 Kolon Grid) */}
            <div
              className="grid grid-cols-3 gap-1.5 mt-2.5 w-full"
              role="group"
              aria-label={`${topic.name} aksiyon butonları`}
            >
              {/* 1. Konu Anlatımı */}
              <Button
                ref={lessonBtnRef}
                variant="amber"
                size="sm"
                onClick={openLesson}
                aria-label={`${topic.name} konu anlatımı videosu`}
                className="w-full text-xs font-semibold py-1.5"
              >
                <PlayCircle className="size-3.5 shrink-0" aria-hidden="true" />
                <span className="truncate">Konu</span>
              </Button>

              {/* 2. Soru Çözümü */}
              <Button
                ref={solutionBtnRef}
                variant="emerald"
                size="sm"
                onClick={openSolution}
                aria-label={`${topic.name} soru çözümü videosu`}
                className="w-full text-xs font-semibold py-1.5"
              >
                <BookOpen className="size-3.5 shrink-0" aria-hidden="true" />
                <span className="truncate">Soru</span>
              </Button>

              {/* 3. Özet & Çalışma Kağıdı */}
              <Button
                ref={summaryBtnRef}
                variant="secondary"
                size="sm"
                onClick={openSummary}
                aria-label={`${topic.name} özet çalışma kağıdı`}
                className="w-full text-xs font-semibold py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-zinc-700"
              >
                <FileText className="size-3.5 text-amber-400 shrink-0" aria-hidden="true" />
                <span className="truncate">Özet</span>
              </Button>
            </div>

            {/* Not Alanı */}
            {expanded && (
              <div className="mt-3 pt-2 border-t border-zinc-800" id={`notes-${topic.id}`}>
                <textarea
                  value={progress.notes}
                  onChange={(e) => onNotesChange(e.target.value)}
                  placeholder="Bu konu hakkında özel çalışma notu ekle..."
                  rows={3}
                  className="w-full bg-zinc-800/80 border border-zinc-700 rounded-md px-3 py-2 text-sm sm:text-xs text-zinc-200 placeholder-zinc-500 resize-none focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent leading-relaxed"
                  aria-label={`${topic.name} için not alanı`}
                />
              </div>
            )}
          </div>
        </div>
      </article>

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