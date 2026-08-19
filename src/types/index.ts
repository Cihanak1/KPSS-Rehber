// ============================================================
// KPSS Dashboard - TypeScript Tip Tanimlari
// ============================================================

export type TopicStatus = 'not-started' | 'in-progress' | 'completed' | 'needs-review';
export type DifficultyLevel = 1 | 2 | 3 | 4 | 5;
export type LeitnerBox = 0 | 1 | 2 | 3 | 4;

/**
 * VideoResource: Akıllı KPSS Video Kaynağı Modeli
 * - YouTube doğrudan arama/kanal bağlantısı ile kırılmayan, sıfır hatalı ders deneyimi
 * - Varsa doğrulanmış gerçek embedId ile gömülü oynatıcı desteği
 */
export interface VideoResource {
  title: string;
  instructor: string;    // 'Aker Kartal', 'İlyas Güneş', 'Ramazan Yetgin', 'Bayram Meral', 'Emrah Vahap Özkaraca' vb.
  searchQuery: string;   // 'KPSS Ön Lisans [Konu Adı] [Eğitmen]'
  directUrl: string;     // Doğrudan YouTube arama/kanal bağlantısı
  embedId?: string;      // Varsa doğrulanmış gerçek embed ID
  isPlaylist?: boolean;  // Playlist ise true
}

// Geriye dönük uyumluluk için alias
export type VideoLink = VideoResource;

export interface TopicSummary {
  keyConcepts: string[];      // Sınavda en çok çıkan 3-5 hap bilgi ve can alıcı kural
  mnemonics: string[];        // Ezberlemeyi kolaylaştıran şifrelemeler, akrostişler ve görsel hafıza ipuçları
  examTraps: string[];        // ÖSYM'nin çeldirici olarak kullandığı "Dikkat / Tuzak" uyarıları
  fastReviewNotes: string[];  // 2 dakikalık hızlı tekrar maddeleri
}

export interface Topic {
  id: string;
  name: string;
  subjectId: string;
  osmyWeight: number; // 1-10, OSYM soru frekansi agirlik puani
  videoLesson: VideoResource;
  videoSolution: VideoResource;
  summary: TopicSummary;
}

export interface Subject {
  id: string;
  name: string;
  shortName: string;
  totalQuestions: number;
  color: string;
  bgColor: string;
  topics: Topic[];
}

export interface TopicProgress {
  topicId: string;
  status: TopicStatus;
  difficulty: DifficultyLevel;
  solvedCount: number;
  correctCount: number;
  wrongCount: number;
  notes: string;
  completedAt?: string;
  lastReviewedAt?: string;
  nextReviewAt?: string;
  leitnerBox: LeitnerBox;
}

export interface KpssStore {
  topicProgress: Record<string, TopicProgress>;
  examDate: string;
  pomodoroSettings: {
    workMinutes: number;
    shortBreakMinutes: number;
    longBreakMinutes: number;
    longBreakInterval: number;
  };
  dailySessions: DailySession[];
}

export interface DailySession {
  date: string;
  minutesStudied: number;
  topicsCompleted: string[];
}

export interface ParetoRecommendation {
  topic: Topic;
  score: number;
  reason: string;
  subjectName: string;
  subjectColor: string;
}

export interface SpacedRepetitionItem {
  topic: Topic;
  progress: TopicProgress;
  daysOverdue: number;
  subjectName: string;
}

export type PomodoroMode = 'work' | 'short-break' | 'long-break';

export interface PomodoroState {
  mode: PomodoroMode;
  secondsLeft: number;
  isRunning: boolean;
  sessionCount: number;
}

// Gunluk Eylem Plani icin blok yapisi
export type StudyBlockId = 'sabah' | 'ogle' | 'aksam';

export interface StudyBlock {
  id: StudyBlockId;
  timeLabel: string;
  emoji: string;
  durationMinutes: number;
  goal: string;
  type: 'lesson' | 'practice' | 'review';
}

// Pomodoro dis tetikleme
export interface PomodoroFocusRequest {
  label: string;
  minutes: number;
  triggeredAt: number; // Date.now() - degi degistikce trigger olur
}