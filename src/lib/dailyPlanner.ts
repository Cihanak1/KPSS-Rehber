import { DailyPlanRecord, DailyTask, TopicProgress, UserProfile } from "@/types";
import { getParetoRecommendations } from "@/lib/pareto";
import { SUBJECTS } from "@/data/curriculum";

/**
 * Yerel saat dilimine göre YYYY-MM-DD formatında bugünün tarihini döner.
 */
export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Belirli bir tarihin bir önceki gününü YYYY-MM-DD formatında döner.
 */
export function getYesterdayDateString(todayStr: string = getTodayDateString()): string {
  const [y, m, d] = todayStr.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  date.setDate(date.getDate() - 1);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Pareto algoritması ve kullanıcı profilini (zorlanılan dersler vb.) harmanlayarak
 * günün 3 bloklu görev listesini üretir.
 */
export function generateDailyPlanForDate(
  date: string,
  topicProgress: Record<string, TopicProgress>,
  userProfile: UserProfile | null
): DailyPlanRecord {
  const weakSubjectIds = userProfile?.weakSubjectIds ?? [];
  const recommendations = getParetoRecommendations(topicProgress, 6, weakSubjectIds);

  // Eğer öneri listesi boş veya yetersizse tüm müfredattan seç
  const allTopics = SUBJECTS.flatMap((s) => s.topics);
  const topic1 = recommendations[0]?.topic ?? allTopics[0];
  const topic2 = recommendations[1]?.topic ?? allTopics[1] ?? topic1;
  const topic3 = recommendations[2]?.topic ?? allTopics[2] ?? topic1;

  const subject1 = SUBJECTS.find((s) => s.id === topic1.subjectId)?.name ?? "KPSS";
  const subject2 = SUBJECTS.find((s) => s.id === topic2.subjectId)?.name ?? "KPSS";
  const subject3 = SUBJECTS.find((s) => s.id === topic3.subjectId)?.name ?? "KPSS";

  const tasks: DailyTask[] = [
    {
      id: `task-${date}-morning-${topic1.id}`,
      topicId: topic1.id,
      blockType: "morning",
      title: `${topic1.name} — Konu & Akıllı Özet Seansı`,
      subjectName: subject1,
      subjectId: topic1.subjectId,
      durationMinutes: 50,
      isCompleted: false,
    },
    {
      id: `task-${date}-noon-${topic2.id}`,
      topicId: topic2.id,
      blockType: "noon",
      title: `${topic2.name} — Soru Çözümü & Tuzak Analizi`,
      subjectName: subject2,
      subjectId: topic2.subjectId,
      durationMinutes: 40,
      targetQuestionCount: 30,
      isCompleted: false,
    },
    {
      id: `task-${date}-evening-${topic3.id}`,
      topicId: topic3.id,
      blockType: "evening",
      title: `${topic3.name} — Leitner & Hafıza Şifreleri Tekrarı`,
      subjectName: subject3,
      subjectId: topic3.subjectId,
      durationMinutes: 30,
      isCompleted: false,
    },
  ];

  return {
    date,
    tasks,
    totalStudiedMinutes: 0,
    totalSolvedQuestions: 0,
    isDayCompleted: false,
  };
}

/**
 * Çalışma Serisi (🔥 Streak) Hesaplama Motoru
 */
export function calculateUpdatedStreak(
  lastActiveDate: string | undefined,
  currentStreak: number | undefined,
  todayStr: string = getTodayDateString()
): { newStreak: number; updatedLastActive: string } {
  const streak = currentStreak ?? 0;
  const lastActive = lastActiveDate ?? "";

  // Zaten bugün aktif olunmuşsa seriyi koru
  if (lastActive === todayStr) {
    return { newStreak: Math.max(1, streak), updatedLastActive: todayStr };
  }

  const yesterdayStr = getYesterdayDateString(todayStr);

  // Dün aktif olunmuşsa seriyi 1 artır
  if (lastActive === yesterdayStr) {
    return { newStreak: streak + 1, updatedLastActive: todayStr };
  }

  // İlk gün veya 1 günden fazla ara verilmişse seriyi 1'den başlat
  return { newStreak: 1, updatedLastActive: todayStr };
}

/**
 * Son 7 günün mini takvim durumunu çıkarır
 */
export function getLast7DaysOverview(dailyPlans: Record<string, DailyPlanRecord>): Array<{
  date: string;
  dayLabel: string;
  dayNumber: number;
  isCompleted: boolean;
  hasActivity: boolean;
  isToday: boolean;
}> {
  const dayNames = ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"];
  const todayStr = getTodayDateString();
  const result = [];

  const [ty, tm, td] = todayStr.split("-").map(Number);
  const todayDate = new Date(ty, tm - 1, td);

  for (let i = 6; i >= 0; i--) {
    const d = new Date(todayDate);
    d.setDate(d.getDate() - i);

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const dateKey = `${year}-${month}-${day}`;

    const plan = dailyPlans[dateKey];
    const completedTasksCount = plan ? plan.tasks.filter((t) => t.isCompleted).length : 0;
    const isCompleted = plan?.isDayCompleted || completedTasksCount >= 2;
    const hasActivity = completedTasksCount > 0 || (plan?.totalStudiedMinutes ?? 0) > 0;

    result.push({
      date: dateKey,
      dayLabel: dayNames[d.getDay()],
      dayNumber: d.getDate(),
      isCompleted,
      hasActivity,
      isToday: dateKey === todayStr,
    });
  }

  return result;
}
