"use client";

import { SUBJECTS } from "@/data/curriculum";
import { TopicProgress, TopicStatus } from "@/types";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";
import { Flame } from "lucide-react";
import { useState } from "react";

interface HeatMapProps {
  topicProgress: Record<string, TopicProgress>;
  mounted: boolean;
}

const statusColors: Record<TopicStatus, string> = {
  "not-started": "bg-zinc-800 hover:bg-zinc-700",
  "in-progress": "bg-amber-500/40 hover:bg-amber-500/60",
  "completed": "bg-emerald-500/50 hover:bg-emerald-500/70",
  "needs-review": "bg-violet-500/40 hover:bg-violet-500/60",
};

const statusLabels: Record<TopicStatus, string> = {
  "not-started": "Çalışılmadı",
  "in-progress": "Devam Ediyor",
  "completed": "Tamamlandı",
  "needs-review": "Tekrar Gerekli",
};

export function HeatMap({ topicProgress, mounted }: HeatMapProps) {
  const [tooltip, setTooltip] = useState<{
    topicName: string;
    status: TopicStatus;
    difficulty: number;
  } | null>(null);

  return (
    <Card className="bg-zinc-900 border-zinc-800 shadow-sm">
      <div className="flex items-center gap-2 mb-3.5">
        <Flame className="size-4 text-amber-500" aria-hidden="true" />
        <h2 className="text-sm font-bold text-zinc-100">Konu Isı Haritası</h2>
      </div>

      {/* Gösterge (Legend) */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        {(Object.entries(statusLabels) as [TopicStatus, string][]).map(([status, label]) => (
          <div key={status} className="flex items-center gap-1.5">
            <span className={cn("size-2.5 rounded-sm", statusColors[status].split(" ")[0])} aria-hidden="true" />
            <span className="text-[11px] text-zinc-400 font-medium">{label}</span>
          </div>
        ))}
      </div>

      {/* Harita Grid */}
      <div className="space-y-3" role="list" aria-label="Konu ısı haritası">
        {SUBJECTS.map((subject) => (
          <div key={subject.id} role="listitem">
            <p className="text-[11px] font-bold text-zinc-400 mb-1.5 uppercase tracking-wider">
              {subject.shortName} ({subject.topics.length})
            </p>
            <div className="flex flex-wrap gap-1.5 sm:gap-1">
              {subject.topics.map((topic) => {
                const progress = mounted ? topicProgress[topic.id] : undefined;
                const status: TopicStatus = progress?.status ?? "not-started";
                const difficulty = progress?.difficulty ?? 0;
                const isSelected = tooltip?.topicName === topic.name;

                return (
                  <button
                    key={topic.id}
                    type="button"
                    className={cn(
                      "size-7 sm:size-6 rounded-md sm:rounded-sm transition-all duration-150 touch-manipulation",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 active:scale-90",
                      statusColors[status],
                      isSelected && "ring-2 ring-amber-400 ring-offset-1 ring-offset-zinc-900"
                    )}
                    aria-label={`${topic.name}: ${statusLabels[status]}`}
                    onClick={() =>
                      setTooltip((prev) =>
                        prev?.topicName === topic.name ? null : { topicName: topic.name, status, difficulty }
                      )
                    }
                    onMouseEnter={() =>
                      setTooltip({ topicName: topic.name, status, difficulty })
                    }
                    onMouseLeave={() => setTooltip(null)}
                    onFocus={() =>
                      setTooltip({ topicName: topic.name, status, difficulty })
                    }
                    onBlur={() => setTooltip(null)}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Tooltip Bilgi Kartı */}
      {tooltip && (
        <div
          className="mt-3.5 p-3 rounded-lg bg-zinc-800 border border-zinc-700 shadow-md animate-in fade-in-0 duration-150"
          role="status"
          aria-live="polite"
        >
          <p className="text-xs font-bold text-zinc-100">{tooltip.topicName}</p>
          <p className="text-xs text-zinc-400 mt-1">
            <span className="font-semibold text-amber-400">{statusLabels[tooltip.status]}</span>
            {tooltip.difficulty > 0 && ` · Zorluk: ${tooltip.difficulty}/5`}
          </p>
        </div>
      )}
    </Card>
  );
}
