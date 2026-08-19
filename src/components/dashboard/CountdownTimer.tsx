"use client";

import { useCountdown } from "@/hooks/useCountdown";
import { Card } from "@/components/ui/Card";
import { Clock } from "lucide-react";

interface CountdownTimerProps {
  examDate: string;
}

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 flex-1 max-w-[72px]">
      <div className="w-full bg-zinc-800/90 border border-zinc-700/80 rounded-lg py-2 text-center shadow-inner">
        <span className="text-xl sm:text-2xl font-bold tabular-nums text-zinc-100 block leading-none">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-[10px] sm:text-xs font-semibold text-zinc-400 uppercase tracking-wider">{label}</span>
    </div>
  );
}

export function CountdownTimer({ examDate }: CountdownTimerProps) {
  const { days, hours, minutes, seconds, isExpired, mounted } = useCountdown(examDate);

  if (!mounted) {
    return (
      <Card className="animate-pulse bg-zinc-900 border-zinc-800">
        <div className="h-24 bg-zinc-800/60 rounded-lg" />
      </Card>
    );
  }

  return (
    <Card className="bg-zinc-900 border-zinc-800 shadow-sm">
      <div className="flex items-center gap-2 mb-3.5 flex-wrap">
        <Clock className="size-4 text-amber-500 shrink-0" aria-hidden="true" />
        <h2 className="text-sm font-bold text-zinc-100">Sınava Kalan Süre</h2>
        <span className="ml-auto text-xs text-zinc-400 tabular-nums">
          {new Date(examDate).toLocaleDateString("tr-TR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
      </div>

      {isExpired ? (
        <p className="text-sm text-zinc-300 text-center py-4 font-medium">Sınav günü geldi! Başarılar dileriz.</p>
      ) : (
        <div
          className="flex items-center justify-center gap-1.5 sm:gap-3 px-1 py-1"
          aria-live="polite"
          aria-label={`Sınava ${days} gün ${hours} saat ${minutes} dakika ${seconds} saniye kaldı`}
          aria-atomic="true"
        >
          <TimeBlock value={days} label="Gün" />
          <span className="text-zinc-600 text-lg sm:text-xl font-light mb-4" aria-hidden="true">:</span>
          <TimeBlock value={hours} label="Saat" />
          <span className="text-zinc-600 text-lg sm:text-xl font-light mb-4" aria-hidden="true">:</span>
          <TimeBlock value={minutes} label="Dak." />
          <span className="text-zinc-600 text-lg sm:text-xl font-light mb-4" aria-hidden="true">:</span>
          <TimeBlock value={seconds} label="Sn." />
        </div>
      )}
    </Card>
  );
}
