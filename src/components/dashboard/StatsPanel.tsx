"use client";

import { getAllTopics } from "@/data/curriculum";
import { TopicProgress } from "@/types";
import { Card } from "@/components/ui/Card";
import { Activity } from "lucide-react";

interface StatsPanelProps {
  topicProgress: Record<string, TopicProgress>;
  mounted: boolean;
}

export function StatsPanel({ topicProgress, mounted }: StatsPanelProps) {
  if (!mounted) {
    return (
      <Card className="bg-zinc-900">
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-16 bg-zinc-800 rounded animate-pulse" />
          ))}
        </div>
      </Card>
    );
  }

  const allTopics = getAllTopics();
  const allProgress = Object.values(topicProgress);

  const totalTopics = allTopics.length;
  const completedTopics = allProgress.filter(p => p.status === "completed").length;
  const inProgressTopics = allProgress.filter(p => p.status === "in-progress").length;
  const needsReviewTopics = allProgress.filter(p => p.status === "needs-review").length;

  const totalSolved = allProgress.reduce((sum, p) => sum + p.solvedCount, 0);
  const totalCorrect = allProgress.reduce((sum, p) => sum + p.correctCount, 0);
  const accuracy = totalSolved > 0 ? Math.round((totalCorrect / totalSolved) * 100) : 0;

  const difficultTopics = allProgress.filter(p => p.difficulty >= 4).length;

  // Tahmini bitiş tarihi (ortalama günlük konu tamamlama hızına göre)
  const remainingTopics = totalTopics - completedTopics;
  const avgPerDay = completedTopics > 0 ? completedTopics / 7 : 1; // basit tahmin
  const estimatedDays = avgPerDay > 0 ? Math.ceil(remainingTopics / avgPerDay) : 0;
  const estimatedDate = new Date();
  estimatedDate.setDate(estimatedDate.getDate() + estimatedDays);

  const stats = [
    {
      label: "Tamamlanan",
      value: completedTopics,
      suffix: `/${totalTopics}`,
      color: "text-emerald-400",
    },
    {
      label: "Devam Eden",
      value: inProgressTopics,
      suffix: " konu",
      color: "text-amber-400",
    },
    {
      label: "Doğruluk Oranı",
      value: accuracy,
      suffix: "%",
      color: "text-sky-400",
    },
    {
      label: "Çözülen Soru",
      value: totalSolved,
      suffix: "",
      color: "text-violet-400",
    },
    {
      label: "Zor Konular",
      value: difficultTopics,
      suffix: " konu",
      color: "text-rose-400",
    },
    {
      label: "Tekrar Bekleyen",
      value: needsReviewTopics,
      suffix: " konu",
      color: "text-orange-400",
    },
  ];

  return (
    <Card className="bg-zinc-900">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="size-4 text-sky-500" aria-hidden="true" />
        <h2 className="text-sm font-semibold text-zinc-100">İstatistikler</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="p-3 rounded-md bg-zinc-800/50 border border-zinc-800"
          >
            <p className="text-xs text-zinc-500 mb-1">{stat.label}</p>
            <p className={`text-xl font-bold tabular-nums ${stat.color}`}>
              {stat.value}
              <span className="text-xs font-normal text-zinc-500">{stat.suffix}</span>
            </p>
          </div>
        ))}
      </div>

      {completedTopics > 0 && (
        <p className="text-xs text-zinc-500 mt-4 text-pretty">
          Tahmini bitiş tarihi:{" "}
          <span className="text-zinc-300 font-medium">
            {estimatedDate.toLocaleDateString("tr-TR", {
              day: "numeric",
              month: "long",
            })}
          </span>{" "}
          (günlük ~{avgPerDay.toFixed(1)} konu hızında)
        </p>
      )}
    </Card>
  );
}
