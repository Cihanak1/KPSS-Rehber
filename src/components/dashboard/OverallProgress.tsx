"use client";

import { SUBJECTS } from "@/data/curriculum";
import { TopicProgress } from "@/types";
import { Card } from "@/components/ui/Card";
import { Progress } from "@/components/ui/Progress";
import { BarChart3 } from "lucide-react";
import { cn } from "@/lib/cn";

interface OverallProgressProps {
  topicProgress: Record<string, TopicProgress>;
  mounted: boolean;
}

const subjectVariant: Record<string, "amber" | "emerald" | "blue" | "violet" | "orange"> = {
  turkce: "violet",
  matematik: "blue",
  tarih: "amber",
  cografya: "emerald",
  vatandaslik: "orange",
};

function calcSubjectProgress(
  topicIds: string[],
  progress: Record<string, TopicProgress>
) {
  const total = topicIds.length;
  if (total === 0) return { pct: 0, completed: 0, total };
  const completed = topicIds.filter(
    (id) => progress[id]?.status === "completed"
  ).length;
  return { pct: Math.round((completed / total) * 100), completed, total };
}

export function OverallProgress({ topicProgress, mounted }: OverallProgressProps) {
  const allTopicIds = SUBJECTS.flatMap((s) => s.topics.map((t) => t.id));
  const totalTopics = allTopicIds.length;
  const completedTopics = mounted
    ? allTopicIds.filter((id) => topicProgress[id]?.status === "completed").length
    : 0;
  const overallPct = mounted ? Math.round((completedTopics / totalTopics) * 100) : 0;

  return (
    <Card className="bg-zinc-900">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="size-4 text-emerald-500" aria-hidden="true" />
        <h2 className="text-sm font-semibold text-zinc-100">Genel İlerleme</h2>
        <span className="ml-auto text-sm tabular-nums font-bold text-emerald-400">
          {mounted ? overallPct : "—"}%
        </span>
      </div>

      {/* Genel bar */}
      <div className="mb-5">
        <Progress value={overallPct} variant="emerald" size="md" />
        <p className="text-xs text-zinc-500 mt-1.5 tabular-nums">
          {mounted ? `${completedTopics} / ${totalTopics}` : "— / —"} konu tamamlandı
        </p>
      </div>

      {/* Ders bazli */}
      <div className="space-y-3">
        {SUBJECTS.map((subject) => {
          const { pct, completed, total } = calcSubjectProgress(
            subject.topics.map((t) => t.id),
            mounted ? topicProgress : {}
          );
          const variant = subjectVariant[subject.id] ?? "emerald";

          return (
            <div key={subject.id}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span
                    className={cn("size-2 rounded-full", {
                      "bg-violet-500": subject.id === "turkce",
                      "bg-blue-500": subject.id === "matematik",
                      "bg-amber-500": subject.id === "tarih",
                      "bg-emerald-500": subject.id === "cografya",
                      "bg-orange-500": subject.id === "vatandaslik",
                    })}
                    aria-hidden="true"
                  />
                  <span className="text-xs text-zinc-400">{subject.name}</span>
                </div>
                <span className="text-xs tabular-nums text-zinc-500">
                  {mounted ? `${completed}/${total}` : "—/—"}
                </span>
              </div>
              <Progress value={pct} variant={variant} size="sm" />
            </div>
          );
        })}
      </div>
    </Card>
  );
}
