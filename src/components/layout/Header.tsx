"use client";

import { UserProfile } from "@/types";
import { GraduationCap, LayoutDashboard, BookOpen, Flame, User, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export type ActiveTab = "dashboard" | "subjects";

interface HeaderProps {
  userProfile: UserProfile | null;
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  onOpenProfileModal: () => void;
  mounted: boolean;
}

export function Header({
  userProfile,
  activeTab,
  onTabChange,
  onOpenProfileModal,
  mounted,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-zinc-800/90 bg-zinc-950/95 backdrop-blur-md safe-top">
      <div className="max-w-screen-xl mx-auto px-3.5 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2.5 sm:gap-4">
        {/* Sol Alan: Logo & Başlık */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="size-8 sm:size-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 text-amber-500 shadow-sm">
            <GraduationCap className="size-4 sm:size-5" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <h1 className="text-sm sm:text-base font-bold text-zinc-100 truncate flex items-center gap-2">
              <span>KPSS Rehberi</span>
              {mounted && userProfile && (
                <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                  <User className="size-3" aria-hidden="true" />
                  <span>{userProfile.name}</span>
                </span>
              )}
            </h1>
            <p className="text-[10px] sm:text-xs text-zinc-400 font-medium hidden xs:block truncate">
              {mounted && userProfile
                ? `Hedef: ${userProfile.targetScore}+ Puan · ${userProfile.dailyStudyMinutesGoal} dk/gün`
                : "Ön Lisans Akıllı Hazırlık"}
            </p>
          </div>
        </div>

        {/* Sağ Alan: Streak, Profil & Sekme Butonları */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Streak & Profil Butonu */}
          {mounted && userProfile && (
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* 🔥 Streak Rozeti */}
              <div
                className={cn(
                  "inline-flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-lg border text-xs font-bold transition-all shadow-sm",
                  userProfile.streakCount > 0
                    ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                    : "bg-zinc-800 border-zinc-700 text-zinc-400"
                )}
                title={`${userProfile.streakCount} günlük ardışık çalışma serisi`}
              >
                <Flame className="size-3.5 sm:size-4 fill-amber-500 text-amber-500 animate-pulse" aria-hidden="true" />
                <span className="font-mono text-xs">{userProfile.streakCount}</span>
                <span className="hidden sm:inline text-[11px] font-medium text-zinc-400">Gün</span>
              </div>

              {/* Profil Düzenle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={onOpenProfileModal}
                className="size-8 sm:size-9 p-0 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-lg touch-manipulation"
                aria-label="Profil ve hedefleri düzenle"
                title="Profili Düzenle"
              >
                <Settings2 className="size-4" aria-hidden="true" />
              </Button>
            </div>
          )}

          {/* Tab Navigation (Touch-First 38px) */}
          <nav
            className="flex items-center gap-1 p-1 rounded-lg bg-zinc-900 border border-zinc-800 shrink-0"
            role="tablist"
            aria-label="Ana navigasyon"
          >
            {[
              { id: "dashboard" as const, icon: LayoutDashboard, label: "Genel Bakış" },
              { id: "subjects" as const, icon: BookOpen, label: "Konular" },
            ].map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                role="tab"
                aria-selected={activeTab === id}
                aria-controls={`panel-${id}`}
                onClick={() => onTabChange(id)}
                className={cn(
                  "flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 min-h-[36px] sm:min-h-[38px] rounded-md text-xs font-semibold transition-all duration-150 touch-manipulation",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 active:scale-95",
                  activeTab === id
                    ? "bg-zinc-800 text-zinc-100 shadow-sm border border-zinc-700/50"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40"
                )}
              >
                <Icon className="size-3.5 shrink-0" aria-hidden="true" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
