"use client";

import { useState } from "react";
import { useKpssStore } from "@/hooks/useKpssStore";
import { useSpacedRepetition } from "@/hooks/useSpacedRepetition";
import { SUBJECTS } from "@/data/curriculum";
import { PomodoroFocusRequest } from "@/types";
import { Header, ActiveTab } from "@/components/layout/Header";
import { OnboardingModal } from "@/components/onboarding/OnboardingModal";
import { CountdownTimer } from "@/components/dashboard/CountdownTimer";
import { DailyRecommendation } from "@/components/dashboard/DailyRecommendation";
import { SpacedRepetitionAlert } from "@/components/dashboard/SpacedRepetitionAlert";
import { OverallProgress } from "@/components/dashboard/OverallProgress";
import { HeatMap } from "@/components/dashboard/HeatMap";
import { StatsPanel } from "@/components/dashboard/StatsPanel";
import { PomodoroTimer } from "@/components/dashboard/PomodoroTimer";
import { SubjectAccordion } from "@/components/subjects/SubjectAccordion";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/cn";

export default function KpssDashboard() {
  const {
    store,
    mounted,
    userProfile,
    dailyPlans,
    saveUserProfile,
    toggleDailyTask,
    regenerateTodayPlan,
    updateStatus,
    updateDifficulty,
    incrementCorrect,
    incrementWrong,
    updateNotes,
    leitnerSuccess,
    leitnerFail,
  } = useKpssStore();

  const dueItems = useSpacedRepetition(mounted ? store.topicProgress : {});
  const [activeTab, setActiveTab] = useState<ActiveTab>("dashboard");
  const [focusRequest, setFocusRequest] = useState<PomodoroFocusRequest | null>(null);
  const [editProfileOpen, setEditProfileOpen] = useState<boolean>(false);

  const handleFocusRequest = (req: PomodoroFocusRequest) => {
    setFocusRequest(req);
    setActiveTab("dashboard");
  };

  // İlk girişte onboarding modalını zorunlu aç, profil varsa ve edit istenirse aç
  const showOnboarding = mounted && !userProfile;
  const isProfileModalOpen = showOnboarding || editProfileOpen;

  return (
    <div className="min-h-dvh bg-zinc-950 flex flex-col overflow-x-hidden">
      {/* 1. Header (Streak, Profil ve Sekmeler) */}
      <Header
        userProfile={userProfile}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenProfileModal={() => setEditProfileOpen(true)}
        mounted={mounted}
      />

      {/* 2. Onboarding / Profil Düzenleme Modalı */}
      <OnboardingModal
        isOpen={isProfileModalOpen}
        onClose={() => setEditProfileOpen(false)}
        onSave={(profile) => {
          saveUserProfile(profile);
          setEditProfileOpen(false);
        }}
        initialProfile={userProfile}
        isEditMode={Boolean(userProfile)}
      />

      {/* 3. Ana Gövde */}
      <main className="flex-1 max-w-screen-xl mx-auto w-full px-3.5 sm:px-4 py-4 sm:py-6">
        {/* ─── DASHBOARD TAB ─── */}
        <div
          id="panel-dashboard"
          role="tabpanel"
          aria-label="Genel Bakış"
          className={cn(activeTab !== "dashboard" && "hidden")}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Sol Kolon (2 Kolon Genişliğinde) */}
            <div className="lg:col-span-2 space-y-4">
              <CountdownTimer examDate={mounted ? store.examDate : "2026-10-05"} />

              {/* Leitner Tekrar Uyarısı */}
              {mounted && dueItems.length > 0 && (
                <SpacedRepetitionAlert
                  items={dueItems}
                  onSuccess={leitnerSuccess}
                  onFail={leitnerFail}
                  mounted={mounted}
                />
              )}

              {/* Günlük Akıllı Ders Programı (Kalıcı State & 7 Günlük Takip) */}
              <DailyRecommendation
                topicProgress={mounted ? store.topicProgress : {}}
                dailyPlans={dailyPlans}
                userProfile={userProfile}
                mounted={mounted}
                examDate={mounted ? store.examDate : "2026-10-05"}
                onToggleTask={toggleDailyTask}
                onRegeneratePlan={regenerateTodayPlan}
                onFocusRequest={handleFocusRequest}
              />

              <StatsPanel
                topicProgress={mounted ? store.topicProgress : {}}
                mounted={mounted}
              />
            </div>

            {/* Sağ Kolon (1 Kolon Genişliğinde) */}
            <div className="space-y-4">
              <PomodoroTimer
                workMinutes={store.pomodoroSettings.workMinutes}
                shortBreakMinutes={store.pomodoroSettings.shortBreakMinutes}
                longBreakMinutes={store.pomodoroSettings.longBreakMinutes}
                longBreakInterval={store.pomodoroSettings.longBreakInterval}
                focusRequest={focusRequest}
              />

              <OverallProgress
                topicProgress={mounted ? store.topicProgress : {}}
                mounted={mounted}
              />

              <HeatMap
                topicProgress={mounted ? store.topicProgress : {}}
                mounted={mounted}
              />
            </div>
          </div>
        </div>

        {/* ─── SUBJECTS TAB ─── */}
        <div
          id="panel-subjects"
          role="tabpanel"
          aria-label="Konular"
          className={cn(activeTab !== "subjects" && "hidden")}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2 p-3.5 rounded-xl bg-zinc-900 border border-zinc-800">
              <div>
                <h2 className="text-sm sm:text-base font-bold text-zinc-100 flex items-center gap-2">
                  <Sparkles className="size-4 text-amber-400" aria-hidden="true" />
                  Ön Lisans KPSS Ders & Konu Matrisi
                </h2>
                <p className="text-xs text-zinc-400 mt-0.5 text-pretty">
                  Her konuda <strong>[Konu]</strong> ve <strong>[Soru]</strong> videolarına, <strong>[Özet]</strong> çalışma kağıtlarına erişin.
                </p>
              </div>
            </div>

            {SUBJECTS.map((subject) => (
              <SubjectAccordion
                key={subject.id}
                subject={subject}
                topicProgress={mounted ? store.topicProgress : {}}
                onStatusChange={updateStatus}
                onDifficultyChange={updateDifficulty}
                onIncrementCorrect={incrementCorrect}
                onIncrementWrong={incrementWrong}
                onNotesChange={updateNotes}
                mounted={mounted}
              />
            ))}
          </div>
        </div>
      </main>

      {/* 4. Footer */}
      <footer className="border-t border-zinc-800 py-4 px-4 bg-zinc-950 safe-bottom">
        <p className="text-xs text-zinc-400 text-center font-medium">
          Veriler yalnızca bu cihazda saklanır · Ön Lisans KPSS Akıllı Hazırlık Platformu
        </p>
      </footer>
    </div>
  );
}