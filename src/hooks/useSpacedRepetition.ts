"use client";

import { useCallback, useMemo } from "react";
import { SpacedRepetitionItem, TopicProgress } from "@/types";
import { SUBJECTS } from "@/data/curriculum";

export function useSpacedRepetition(
  topicProgress: Record<string, TopicProgress>
): SpacedRepetitionItem[] {
  const getDueItems = useCallback(() => {
    const now = new Date();
    const items: SpacedRepetitionItem[] = [];

    for (const subject of SUBJECTS) {
      for (const topic of subject.topics) {
        const progress = topicProgress[topic.id];
        if (!progress) continue;
        if (progress.status !== "completed" && progress.status !== "needs-review") continue;
        if (!progress.nextReviewAt) continue;

        const reviewDate = new Date(progress.nextReviewAt);
        if (reviewDate <= now) {
          const diffMs = now.getTime() - reviewDate.getTime();
          const daysOverdue = Math.floor(diffMs / (1000 * 60 * 60 * 24));
          items.push({
            topic,
            progress,
            daysOverdue,
            subjectName: subject.name,
          });
        }
      }
    }

    // En uzun suredir beklenen once
    return items.sort((a, b) => b.daysOverdue - a.daysOverdue);
  }, [topicProgress]);

  return useMemo(() => getDueItems(), [getDueItems]);
}
