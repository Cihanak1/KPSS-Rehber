"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { UserProfile } from "@/types";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";
import {
  GraduationCap,
  Target,
  Clock,
  BookOpen,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  X,
} from "lucide-react";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose?: () => void;
  onSave: (profile: UserProfile) => void;
  initialProfile?: UserProfile | null;
  isEditMode?: boolean;
}

const SUBJECT_OPTIONS = [
  { id: "turkce", name: "Türkçe", icon: "📚", badgeVariant: "violet" as const },
  { id: "matematik", name: "Matematik & Geometri", icon: "📐", badgeVariant: "blue" as const },
  { id: "tarih", name: "Tarih", icon: "🏛️", badgeVariant: "amber" as const },
  { id: "cografya", name: "Coğrafya", icon: "🌍", badgeVariant: "emerald" as const },
  { id: "vatandaslik", name: "Vatandaşlık & Güncel", icon: "⚖️", badgeVariant: "orange" as const },
];

const SCORE_PRESETS = [70, 75, 80, 85, 90, 95];
const TIME_PRESETS = [
  { minutes: 60, label: "1 Saat (60 dk)" },
  { minutes: 90, label: "1.5 Saat (90 dk)" },
  { minutes: 120, label: "2 Saat (120 dk)" },
  { minutes: 180, label: "3 Saat (180 dk)" },
  { minutes: 240, label: "4 Saat (240 dk)" },
];

export function OnboardingModal({
  isOpen,
  onClose,
  onSave,
  initialProfile,
  isEditMode = false,
}: OnboardingModalProps) {
  const [step, setStep] = useState<number>(1);
  const [name, setName] = useState<string>(initialProfile?.name ?? "");
  const [targetScore, setTargetScore] = useState<number>(initialProfile?.targetScore ?? 85);
  const [dailyMinutes, setDailyMinutes] = useState<number>(initialProfile?.dailyStudyMinutesGoal ?? 120);
  const [weakSubjects, setWeakSubjects] = useState<string[]>(initialProfile?.weakSubjectIds ?? ["matematik", "tarih"]);

  const dialogRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      if (step === 1) {
        setTimeout(() => nameInputRef.current?.focus(), 100);
      }
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, step]);

  const toggleSubject = (id: string) => {
    setWeakSubjects((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleNext = () => {
    if (step === 1 && !name.trim()) return;
    if (step < 3) {
      setStep((s) => s + 1);
    } else {
      // Step 3 -> 4: Animasyon ve profil kaydı
      setStep(4);

      setTimeout(() => {
        const profile: UserProfile = {
          id: initialProfile?.id ?? (typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `user-${Date.now()}`),
          name: name.trim() || "KPSS Adayı",
          targetScore,
          dailyStudyMinutesGoal: dailyMinutes,
          weakSubjectIds: weakSubjects,
          createdAt: initialProfile?.createdAt ?? new Date().toISOString(),
          streakCount: initialProfile?.streakCount ?? 1,
          lastActiveDate: initialProfile?.lastActiveDate ?? new Date().toISOString().split("T")[0],
        };
        onSave(profile);
        if (onClose) onClose();
      }, 1000);
    }
  };

  const handleBack = () => {
    if (step > 1 && step < 4) {
      setStep((s) => s - 1);
    }
  };

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape" && isEditMode && onClose) {
        onClose();
      }
      if (e.key === "Enter" && step === 1 && name.trim()) {
        e.preventDefault();
        handleNext();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isEditMode, onClose, step, name]
  );

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-4 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-title"
      onKeyDown={handleKeyDown}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-zinc-950/90 backdrop-blur-md transition-opacity duration-200"
        onClick={isEditMode ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div
        ref={dialogRef}
        className={cn(
          "relative z-10 w-full max-w-lg rounded-2xl overflow-hidden",
          "bg-zinc-900 border border-zinc-800 shadow-2xl shadow-zinc-950/90",
          "animate-in fade-in-0 zoom-in-95 duration-200 ease-out flex flex-col max-h-[92dvh]"
        )}
      >
        {/* Header */}
        <div className="px-5 sm:px-6 pt-5 pb-4 border-b border-zinc-800 flex items-center justify-between gap-3 safe-top">
          <div className="flex items-center gap-2.5">
            <div className="size-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
              <GraduationCap className="size-5" aria-hidden="true" />
            </div>
            <div>
              <h2 id="onboarding-title" className="text-base font-bold text-zinc-100">
                {isEditMode ? "Hedef & Profilini Düzenle" : "KPSS Hazırlık Sihirbazı"}
              </h2>
              <p className="text-xs text-zinc-400">
                {step < 4 ? `Adım ${step} / 3 — Akıllı çalışma algoritmanı kuruyoruz` : "Tamamlanıyor..."}
              </p>
            </div>
          </div>

          {isEditMode && onClose && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="size-8 p-0 text-zinc-400 hover:text-zinc-100 rounded-lg"
              aria-label="Kapat"
            >
              <X className="size-4" aria-hidden="true" />
            </Button>
          )}
        </div>

        {/* Step Progress Bar */}
        {step < 4 && (
          <div className="w-full bg-zinc-800/60 h-1">
            <div
              className="bg-amber-500 h-1 transition-all duration-300 ease-out"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        )}

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto touch-scroll flex-1 space-y-5">
          {/* ADIM 1: İsim / Karşılama */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in-50 duration-150">
              <div className="text-center space-y-1.5 py-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-400 mb-1">
                  <Sparkles className="size-3.5" aria-hidden="true" />
                  <span>Ön Lisans KPSS 2026</span>
                </div>
                <h3 className="text-xl font-bold text-zinc-100">Sana nasıl hitap edelim?</h3>
                <p className="text-xs sm:text-sm text-zinc-400 text-pretty">
                  Günlük ders programın, çalışma serin ve başarı istatistiklerin bu profile kaydedilecek.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <label htmlFor="user-name-input" className="text-xs font-semibold text-zinc-300 block">
                  İsmin veya Takma Adın
                </label>
                <input
                  id="user-name-input"
                  ref={nameInputRef}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Örn: Cihan, Ayşe, Geleceğin Memuru..."
                  maxLength={30}
                  className={cn(
                    "w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-700 text-zinc-100 text-sm",
                    "placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all",
                    "min-h-[48px] touch-manipulation"
                  )}
                />
              </div>
            </div>
          )}

          {/* ADIM 2: Hedef Puan ve Günlük Süre */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in-50 duration-150">
              {/* Hedef KPSS Puanı */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-zinc-200 flex items-center gap-1.5">
                    <Target className="size-4 text-amber-400" aria-hidden="true" />
                    <span>Hedef KPSS Puanın</span>
                  </label>
                  <span className="text-base font-extrabold text-amber-400 font-mono">
                    {targetScore} Puan
                  </span>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {SCORE_PRESETS.map((sc) => (
                    <button
                      key={sc}
                      type="button"
                      onClick={() => setTargetScore(sc)}
                      className={cn(
                        "py-2.5 rounded-lg text-xs font-bold border transition-all duration-150 touch-manipulation min-h-[44px]",
                        targetScore === sc
                          ? "bg-amber-500 text-zinc-950 border-amber-400 shadow-md shadow-amber-500/20"
                          : "bg-zinc-800/80 text-zinc-300 border-zinc-700 hover:bg-zinc-800 hover:text-zinc-100"
                      )}
                    >
                      {sc}+
                    </button>
                  ))}
                </div>
              </div>

              {/* Günlük Hedeflenen Çalışma Süresi */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-zinc-200 flex items-center gap-1.5">
                    <Clock className="size-4 text-sky-400" aria-hidden="true" />
                    <span>Günlük Hedeflenen Süre</span>
                  </label>
                  <span className="text-xs font-semibold text-zinc-400">
                    Günde ~{Math.floor(dailyMinutes / 60)}s {dailyMinutes % 60 ? `${dailyMinutes % 60}dk` : ""}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {TIME_PRESETS.map((t) => (
                    <button
                      key={t.minutes}
                      type="button"
                      onClick={() => setDailyMinutes(t.minutes)}
                      className={cn(
                        "px-3.5 py-2.5 rounded-lg text-xs font-semibold border text-left flex items-center justify-between transition-all duration-150 touch-manipulation min-h-[44px]",
                        dailyMinutes === t.minutes
                          ? "bg-sky-500/10 text-sky-300 border-sky-500/50 shadow-sm"
                          : "bg-zinc-800/80 text-zinc-400 border-zinc-700 hover:bg-zinc-800 hover:text-zinc-200"
                      )}
                    >
                      <span>{t.label}</span>
                      {dailyMinutes === t.minutes && <Check className="size-4 text-sky-400" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ADIM 3: Zorlanılan Dersler */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in-50 duration-150">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
                  <BookOpen className="size-4 text-amber-400" aria-hidden="true" />
                  <span>En Çok Zorlandığın Dersler Neler?</span>
                </h3>
                <p className="text-xs text-zinc-400 text-pretty">
                  Seçtiğin dersler, Pareto 80/20 çalışma algoritmasında <strong>+3.0 öncelik puanı</strong> kazanarak günlük programında daha sık karşına çıkacak.
                </p>
              </div>

              <div className="space-y-2 pt-1">
                {SUBJECT_OPTIONS.map((sub) => {
                  const isSelected = weakSubjects.includes(sub.id);
                  return (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => toggleSubject(sub.id)}
                      className={cn(
                        "w-full px-4 py-3 rounded-xl border text-left flex items-center justify-between transition-all duration-150 touch-manipulation min-h-[48px]",
                        isSelected
                          ? "bg-amber-500/10 border-amber-500/50 text-zinc-100 shadow-sm"
                          : "bg-zinc-800/60 border-zinc-700/80 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{sub.icon}</span>
                        <div>
                          <p className="text-xs sm:text-sm font-semibold">{sub.name}</p>
                          <p className="text-[11px] text-zinc-400">
                            {isSelected ? "Öncelikli olarak planlanacak" : "Normal ağırlık"}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={isSelected ? "amber" : "default"}
                        className="text-[10px] py-0.5 px-2 font-bold"
                      >
                        {isSelected ? "+3.0 Öncelik" : "Standart"}
                      </Badge>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ADIM 4: Hazırlanıyor Animasyonu */}
          {step === 4 && (
            <div className="py-8 text-center space-y-4 flex flex-col items-center justify-center animate-in zoom-in-95 duration-200">
              <div className="size-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 animate-bounce">
                <Sparkles className="size-8" aria-hidden="true" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-zinc-100">
                  Kişisel Programın Hazırlanıyor...
                </h3>
                <p className="text-xs text-zinc-400 max-w-sm text-balance">
                  {name ? `${name} için` : ""} Pareto 80/20 öncelik puanları hesaplanıyor ve ilk günün 3 bloklu çalışma planı oluşturuluyor.
                </p>
              </div>

              <div className="w-48 bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                <div className="bg-amber-500 h-1.5 rounded-full animate-pulse w-full" />
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {step < 4 && (
          <div className="px-5 sm:px-6 py-3.5 border-t border-zinc-800 bg-zinc-900/95 flex items-center justify-between gap-3 safe-bottom">
            {step > 1 ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="text-xs font-semibold text-zinc-400 hover:text-zinc-200 touch-manipulation min-h-[44px]"
              >
                <ArrowLeft className="size-3.5 mr-1" aria-hidden="true" />
                <span>Geri</span>
              </Button>
            ) : (
              <span className="text-[11px] text-zinc-500 hidden sm:inline">
                Enter ile ilerleyebilirsiniz
              </span>
            )}

            <Button
              variant="amber"
              size="md"
              onClick={handleNext}
              disabled={step === 1 && !name.trim()}
              className="ml-auto text-xs sm:text-sm font-bold min-h-[44px] px-5 touch-manipulation"
            >
              <span>{step === 3 ? "Programımı Başlat" : "Devam Et"}</span>
              <ArrowRight className="size-4 ml-1.5" aria-hidden="true" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
