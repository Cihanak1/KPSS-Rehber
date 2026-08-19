"use client";

import { SpacedRepetitionItem } from "@/types";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Brain, CheckCircle, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface SpacedRepetitionAlertProps {
  items: SpacedRepetitionItem[];
  onSuccess: (topicId: string) => void;
  onFail: (topicId: string) => void;
  mounted: boolean;
}

const LEITNER_LABELS: Record<number, string> = {
  0: "Yeni",
  1: "1. Gün",
  2: "3. Gün",
  3: "7. Gün",
  4: "21. Gün",
};

export function SpacedRepetitionAlert({
  items,
  onSuccess,
  onFail,
  mounted,
}: SpacedRepetitionAlertProps) {
  if (!mounted || items.length === 0) return null;

  return (
    <Card className="bg-zinc-900 border-violet-500/30 shadow-sm">
      <div className="flex items-center gap-2 mb-3.5">
        <Brain className="size-4 text-violet-400 shrink-0" aria-hidden="true" />
        <h2 className="text-sm font-bold text-zinc-100">
          Leitner Tekrar Zamanı
        </h2>
        <Badge variant="violet" className="ml-auto font-semibold tabular-nums">
          {items.length} Konu
        </Badge>
      </div>

      <div
        className="space-y-2.5"
        aria-label="Tekrar edilmesi gereken konular"
      >
        {items.slice(0, 5).map((item) => (
          <div
            key={item.topic.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-3 rounded-lg bg-zinc-800/60 border border-zinc-800"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-semibold text-zinc-100 truncate">
                  {item.topic.name}
                </span>
                <Badge variant="default" className="text-[10px]">
                  {LEITNER_LABELS[item.progress.leitnerBox]}
                </Badge>
              </div>
              <p className="text-xs text-zinc-400 mt-1">
                <strong className="text-zinc-300 font-medium">{item.subjectName}</strong> ·{" "}
                {item.daysOverdue === 0
                  ? "Bugün tekrar zamanı"
                  : `${item.daysOverdue} gün gecikti`}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0 pt-1 sm:pt-0">
              <Button
                variant="emerald"
                size="sm"
                onClick={() => onSuccess(item.topic.id)}
                aria-label={`${item.topic.name} - Başarılı olarak işaretle`}
                className="flex-1 sm:flex-initial text-xs font-semibold py-1.5"
              >
                <CheckCircle className="size-3.5" aria-hidden="true" />
                <span>Hatırladım</span>
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => onFail(item.topic.id)}
                aria-label={`${item.topic.name} - Tekrar gerekli olarak işaretle`}
                className="flex-1 sm:flex-initial text-xs font-semibold py-1.5"
              >
                <XCircle className="size-3.5" aria-hidden="true" />
                <span>Unuttum</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
