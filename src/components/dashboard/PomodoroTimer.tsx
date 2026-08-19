"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { PomodoroMode, PomodoroState, PomodoroFocusRequest } from "@/types";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import {
  Play, Pause, RotateCcw, Maximize2, Minimize2, Coffee, Zap,
} from "lucide-react";

interface PomodoroTimerProps {
  workMinutes?: number;
  shortBreakMinutes?: number;
  longBreakMinutes?: number;
  longBreakInterval?: number;
  focusRequest?: PomodoroFocusRequest | null;
}

const DURATIONS: Record<PomodoroMode, (w: number, s: number, l: number) => number> = {
  work: (w) => w * 60,
  "short-break": (_, s) => s * 60,
  "long-break": (_, __, l) => l * 60,
};

const MODE_LABELS: Record<PomodoroMode, string> = {
  work: "Odak",
  "short-break": "Kısa Mola",
  "long-break": "Uzun Mola",
};

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

const emptySubscribe = () => () => {};

interface TimerRingProps {
  size: number;
  r: number;
  progress: number;
  strokeColor: string;
}

function TimerRing({ size, r, progress, strokeColor }: TimerRingProps) {
  const c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true" className="overflow-visible">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#27272a" strokeWidth="8" />
      <circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none" stroke={strokeColor} strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c - (progress / 100) * c}
        style={{
          transform: "rotate(-90deg)",
          transformOrigin: "center",
          transition: "stroke-dashoffset 0.5s ease-out",
        }}
      />
    </svg>
  );
}

export function PomodoroTimer({
  workMinutes = 25,
  shortBreakMinutes = 5,
  longBreakMinutes = 15,
  longBreakInterval = 4,
  focusRequest,
}: PomodoroTimerProps) {
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const [state, setState] = useState<PomodoroState>({
    mode: "work",
    secondsLeft: workMinutes * 60,
    isRunning: false,
    sessionCount: 0,
  });
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [focusLabel, setFocusLabel] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastFocusRequestAt = useRef<number>(0);

  // Dış tetikleme: DailyRecommendation'dan Pomodoro açma
  useEffect(() => {
    if (!focusRequest) return;
    if (focusRequest.triggeredAt <= lastFocusRequestAt.current) return;
    lastFocusRequestAt.current = focusRequest.triggeredAt;

    // Timer'ı ilgili süre ile güncelle
    const seconds = focusRequest.minutes * 60;
    setState((prev) => ({ ...prev, secondsLeft: seconds, mode: "work", isRunning: true }));
    setFocusLabel(focusRequest.label);
    setIsFocusMode(true);
  }, [focusRequest]);

  const getDuration = useCallback(
    (mode: PomodoroMode) =>
      DURATIONS[mode](workMinutes, shortBreakMinutes, longBreakMinutes),
    [workMinutes, shortBreakMinutes, longBreakMinutes]
  );

  const switchMode = useCallback(
    (mode: PomodoroMode, sessionCount: number) => {
      setState({
        mode,
        secondsLeft: DURATIONS[mode](workMinutes, shortBreakMinutes, longBreakMinutes),
        isRunning: false,
        sessionCount,
      });
    },
    [workMinutes, shortBreakMinutes, longBreakMinutes]
  );

  useEffect(() => {
    if (!state.isRunning) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setState((prev) => {
        if (prev.secondsLeft <= 1) {
          const nextSession = prev.sessionCount + (prev.mode === "work" ? 1 : 0);
          let nextMode: PomodoroMode;
          if (prev.mode === "work") {
            nextMode = nextSession % longBreakInterval === 0 ? "long-break" : "short-break";
          } else {
            nextMode = "work";
          }

          if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
            new Notification(
              prev.mode === "work" ? "Mola zamanı! ☕" : "Odak zamanı! 🎯",
              { body: prev.mode === "work" ? "25 dakikalık odak seansı tamamlandı." : "Mola bitti, çalışmaya devam!" }
            );
          }

          return {
            mode: nextMode,
            secondsLeft: DURATIONS[nextMode](workMinutes, shortBreakMinutes, longBreakMinutes),
            isRunning: false,
            sessionCount: nextSession,
          };
        }
        return { ...prev, secondsLeft: prev.secondsLeft - 1 };
      });
    }, 1000);

    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [state.isRunning, longBreakInterval, workMinutes, shortBreakMinutes, longBreakMinutes]);

  const toggle = useCallback(() => {
    if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
    setState((prev) => ({ ...prev, isRunning: !prev.isRunning }));
  }, []);

  const reset = useCallback(() => {
    setState((prev) => ({ ...prev, secondsLeft: getDuration(prev.mode), isRunning: false }));
  }, [getDuration]);

  const totalSeconds = getDuration(state.mode);
  const progress = mounted ? ((totalSeconds - state.secondsLeft) / totalSeconds) * 100 : 0;

  const modeColor = { work: "text-amber-400", "short-break": "text-sky-400", "long-break": "text-sky-400" }[state.mode];
  const strokeColor = { work: "#f59e0b", "short-break": "#38bdf8", "long-break": "#38bdf8" }[state.mode];

  return (
    <>
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col gap-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
            <Zap className="size-4 text-amber-500" aria-hidden="true" />
            Pomodoro Sayacı
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsFocusMode(true)}
            aria-label="Tam ekran odak modunu aç"
            className="size-9 p-0 text-zinc-400 hover:text-zinc-100"
          >
            <Maximize2 className="size-4" aria-hidden="true" />
          </Button>
        </div>

        {/* Mod seçici (Touch-friendly 38px) */}
        <div className="flex rounded-lg overflow-hidden border border-zinc-800 p-0.5 bg-zinc-950/60" role="tablist" aria-label="Pomodoro modu">
          {(["work", "short-break", "long-break"] as PomodoroMode[]).map((mode) => (
            <button
              key={mode}
              role="tab"
              aria-selected={state.mode === mode}
              onClick={() => switchMode(mode, state.sessionCount)}
              className={cn(
                "flex-1 py-2 min-h-[38px] text-xs font-semibold rounded-md transition-all duration-150 touch-manipulation",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-amber-500 active:scale-95",
                state.mode === mode ? "bg-zinc-800 text-zinc-100 shadow-sm" : "text-zinc-400 hover:text-zinc-200"
              )}
            >
              {MODE_LABELS[mode]}
            </button>
          ))}
        </div>

        {/* Timer Görseli */}
        {mounted && (
          <div className="flex flex-col items-center gap-4 py-1">
            <div className="relative flex items-center justify-center" aria-label={`Kalan süre: ${formatTime(state.secondsLeft)}`}>
              <TimerRing
                size={136}
                r={56}
                progress={progress}
                strokeColor={strokeColor}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={cn("text-3xl font-bold tabular-nums tracking-tight", modeColor)}>
                  {formatTime(state.secondsLeft)}
                </span>
                <span className="text-[11px] font-medium text-zinc-400 mt-0.5">{MODE_LABELS[state.mode]}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full justify-center">
              <Button
                variant={state.isRunning ? "secondary" : "amber"}
                size="md"
                onClick={toggle}
                aria-label={state.isRunning ? "Sayacı duraklat" : "Sayacı başlat"}
                className="flex-1 max-w-[140px] font-semibold"
              >
                {state.isRunning ? <Pause className="size-4" aria-hidden="true" /> : <Play className="size-4" aria-hidden="true" />}
                <span>{state.isRunning ? "Duraklat" : "Başlat"}</span>
              </Button>
              <Button
                variant="ghost"
                size="md"
                onClick={reset}
                aria-label="Sayacı sıfırla"
                className="px-3 text-zinc-400 hover:text-zinc-100 bg-zinc-800/40 hover:bg-zinc-800"
              >
                <RotateCcw className="size-4" aria-hidden="true" />
              </Button>
            </div>

            <p className="text-xs tabular-nums text-zinc-400 font-medium">
              <Coffee className="size-3.5 inline mr-1 text-zinc-500" aria-hidden="true" />
              {state.sessionCount} seans tamamlandı
            </p>
          </div>
        )}
      </div>

      {/* Tam Ekran Odak Modu (Safe-Area & Touch Optimized) */}
      {isFocusMode && mounted && (
        <div
          className="fixed inset-0 z-[60] bg-zinc-950/98 backdrop-blur-md flex flex-col items-center justify-between p-6 safe-top safe-bottom touch-scroll"
          role="dialog"
          aria-modal="true"
          aria-label="Pomodoro tam ekran odak modu"
        >
          {/* Üst Kapatma Butonu */}
          <div className="w-full flex items-center justify-between max-w-md">
            <span className="text-xs uppercase tracking-widest font-semibold text-zinc-400">
              Ön Lisans KPSS · Odak Modu
            </span>
            <button
              className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center text-zinc-400 hover:text-zinc-100 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 rounded-lg active:scale-95 transition-all touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              onClick={() => { setIsFocusMode(false); setFocusLabel(null); }}
              aria-label="Odak modundan çık (ESC)"
            >
              <Minimize2 className="size-5" aria-hidden="true" />
            </button>
          </div>

          {/* Orta Alan: Başlık & Büyük Sayaç */}
          <div className="flex flex-col items-center gap-4 text-center my-auto">
            {focusLabel && (
              <p className="text-sm sm:text-base font-semibold text-zinc-300 text-balance max-w-xs px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800">
                {focusLabel}
              </p>
            )}
            <h2 className={cn("text-xl sm:text-2xl font-bold tracking-wide uppercase", modeColor)}>
              {MODE_LABELS[state.mode]}
            </h2>

            <div className="relative my-2">
              <TimerRing
                size={240}
                r={104}
                progress={progress}
                strokeColor={strokeColor}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={cn("text-5xl sm:text-6xl font-bold tabular-nums tracking-tighter", modeColor)}>
                  {formatTime(state.secondsLeft)}
                </span>
              </div>
            </div>
          </div>

          {/* Alt Alan: Butonlar */}
          <div className="flex flex-col items-center gap-3 w-full max-w-xs">
            <div className="flex items-center gap-3 w-full">
              <Button
                variant={state.isRunning ? "secondary" : "amber"}
                size="lg"
                onClick={toggle}
                aria-label={state.isRunning ? "Duraklat" : "Başlat"}
                className="flex-1 font-bold text-base h-12"
              >
                {state.isRunning ? <Pause className="size-5" aria-hidden="true" /> : <Play className="size-5" aria-hidden="true" />}
                <span>{state.isRunning ? "Duraklat" : "Başlat"}</span>
              </Button>
              <Button
                variant="ghost"
                size="lg"
                onClick={reset}
                aria-label="Sıfırla"
                className="h-12 px-4 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300"
              >
                <RotateCcw className="size-5" aria-hidden="true" />
              </Button>
            </div>

            <p className="text-xs text-zinc-400">
              ESC veya sağ üstteki simge ile çıkabilirsiniz
            </p>
          </div>
        </div>
      )}
    </>
  );
}