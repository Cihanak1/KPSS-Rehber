import { ParetoRecommendation, Topic, TopicProgress, TopicStatus } from "@/types";
import { SUBJECTS } from "@/data/curriculum";

// 80/20 Pareto onceliklendirme skoru
// Yuksek OSYM agirligi + Yuksek zorluk + Tamamlanmamis = oncelikli
function calculateScore(
  topic: Topic,
  progress: TopicProgress | undefined
): number {
  const osmyWeight = topic.osmyWeight;
  const difficulty = progress?.difficulty ?? 3;
  const status: TopicStatus = progress?.status ?? "not-started";

  const statusBonus: Record<TopicStatus, number> = {
    "needs-review": 5,
    "in-progress": 3,
    "not-started": 2,
    "completed": 0,
  };

  return osmyWeight * 2.5 + difficulty * 2.0 + statusBonus[status];
}

export function getParetoRecommendations(
  topicProgress: Record<string, TopicProgress>,
  limit = 5
): ParetoRecommendation[] {
  const recommendations: ParetoRecommendation[] = [];

  for (const subject of SUBJECTS) {
    for (const topic of subject.topics) {
      const progress = topicProgress[topic.id];

      // Tamamlanan konulari listeden cikar
      if (progress?.status === "completed") continue;

      const score = calculateScore(topic, progress);
      const status: TopicStatus = progress?.status ?? "not-started";

      let reason = "";
      if (status === "needs-review") {
        reason = "Tekrar zamanı geldi";
      } else if (status === "in-progress") {
        reason = "Devam eden konu";
      } else {
        reason = "Henüz başlanmadı";
      }

      if (topic.osmyWeight >= 8) {
        reason += ` · Yüksek ÖSYM ağırlığı (${topic.osmyWeight}/10)`;
      }

      recommendations.push({
        topic,
        score,
        reason,
        subjectName: subject.name,
        subjectColor: subject.color,
      });
    }
  }

  // Skora gore sirala, en yuksek once
  recommendations.sort((a, b) => b.score - a.score);

  return recommendations.slice(0, limit);
}
