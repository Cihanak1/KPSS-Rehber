"use client";

import { useState } from "react";
import { Subject, TopicProgress, DifficultyLevel, TopicStatus } from "@/types";
import { TopicCard } from "@/components/subjects/TopicCard";
import { Progress } from "@/components/ui/Progress";
import { cn } from "@/lib/cn";
import { ChevronDown, ChevronRight } from "lucide-react";

interface SubjectAccordionProps {
  subject: Subject;
  topicProgress: Record<string, TopicProgress>;
  onStatusChange: (topicId: string, status: TopicStatus) => void;
  onDifficultyChange: (topicId: string, difficulty: DifficultyLevel) => void;
  onIncrementCorrect: (topicId: string) => void;
  onIncrementWrong: (topicId: string) => void;
  onNotesChange: (topicId: string, notes: string) => void;
  mounted: boolean;
}

const subjectVariantMap: Record<string, "amber" | "emerald" | "blue" | "violet" | "orange"> = {
  turkce: "violet",
  matematik: "blue",
  tarih: "amber",
  cografya: "emerald",
  vatandaslik: "orange",
};

export function SubjectAccordion({
  subject,
  topicProgress,
  onStatusChange,
  onDifficultyChange,
  onIncrementCorrect,
  onIncrementWrong,
  onNotesChange,
  mounted,
}: SubjectAccordionProps) {
  const [open, setOpen] = useState(false);

  const completedCount = mounted
    ? subject.topics.filter((t) => topicProgress[t.id]?.status === "completed").length
    : 0;
  const pct = mounted
    ? Math.round((completedCount / subject.topics.length) * 100)
    : 0;

  const progressVariant = subjectVariantMap[subject.id] ?? "emerald";

  return (
    <section
      className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden shadow-sm"
      aria-label={`${subject.name} dersi`}
    >
      {/* Başlık (Accordion Trigger - Touch-friendly) */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={`subject-${subject.id}-content`}
        className={cn(
          "w-full flex items-center gap-3 px-4 py-3.5 min-h-[52px]",
          "hover:bg-zinc-800/60 active:bg-zinc-800/80 transition-colors duration-150 touch-manipulation",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-amber-500"
        )}
      >
        {/* Kısaltma Rozeti */}
        <span
          className={cn(
            "shrink-0 px-2.5 py-1 rounded-md text-xs font-bold tracking-wider",
            subject.bgColor,
            subject.color.split(" ").find((c) => c.startsWith("text-"))
          )}
          aria-hidden="true"
        >
          {subject.shortName}
        </span>

        <div className="flex-1 min-w-0 text-left">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm sm:text-base font-semibold text-zinc-100 truncate">
              {subject.name}
            </span>
            <span className="text-xs text-zinc-500 shrink-0">
              ({subject.totalQuestions} Soru)
            </span>
          </div>
          {mounted && (
            <Progress
              value={pct}
              variant={progressVariant}
              size="sm"
              showLabel
              className="mt-1.5"
            />
          )}
        </div>

        <div className="shrink-0 flex flex-col items-end gap-1 ml-2">
          <span className="text-xs tabular-nums font-semibold text-zinc-400">
            {mounted ? `${completedCount}/${subject.topics.length}` : "—"}
          </span>
          {open ? (
            <ChevronDown className="size-4 text-zinc-400" aria-hidden="true" />
          ) : (
            <ChevronRight className="size-4 text-zinc-400" aria-hidden="true" />
          )}
        </div>
      </button>

      {/* Konu Listesi */}
      {open && (
        <div
          id={`subject-${subject.id}-content`}
          className="border-t border-zinc-800/80 p-3 sm:p-4 grid gap-3 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 bg-zinc-950/40"
        >
          {subject.topics.map((topic) => {
            const progress = topicProgress[topic.id] ?? {
              topicId: topic.id,
              status: "not-started" as TopicStatus,
              difficulty: 3 as DifficultyLevel,
              solvedCount: 0,
              correctCount: 0,
              wrongCount: 0,
              notes: "",
              leitnerBox: 0 as const,
            };

            return (
              <TopicCard
                key={topic.id}
                topic={topic}
                progress={progress}
                onStatusChange={(status) => onStatusChange(topic.id, status)}
                onDifficultyChange={(d) => onDifficultyChange(topic.id, d)}
                onIncrementCorrect={() => onIncrementCorrect(topic.id)}
                onIncrementWrong={() => onIncrementWrong(topic.id)}
                onNotesChange={(notes) => onNotesChange(topic.id, notes)}
                subjectColor={subject.color}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}
