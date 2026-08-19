"use client";

import { useCallback, useEffect, useRef } from "react";
import { Topic, TopicSummary } from "@/types";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";
import {
  X, Printer, Lightbulb, AlertTriangle, CheckCircle2,
  Zap, Bookmark, FileText, Sparkles
} from "lucide-react";

interface SummarySheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  topic: Topic;
  subjectName?: string;
  subjectColor?: string;
  triggerRef?: React.RefObject<HTMLButtonElement | null>;
}

const FOCUSABLE_ELEMENTS = [
  "a[href]",
  "button:not([disabled])",
  "textarea",
  "input",
  "select",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

export function SummarySheetModal({
  isOpen,
  onClose,
  topic,
  subjectName = "KPSS Müfredat",
  subjectColor = "border-amber-500 text-amber-400",
  triggerRef,
}: SummarySheetModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const printBtnRef = useRef<HTMLButtonElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Keyboard navigation: Escape & Focus Trap
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key !== "Tab") return;

      const dialog = dialogRef.current;
      if (!dialog) return;

      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS));
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    },
    [isOpen, onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Body scroll lock & focus restoration
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const timer = setTimeout(() => {
        closeBtnRef.current?.focus();
      }, 50);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "";
      };
    } else {
      document.body.style.overflow = "";
      const timer = setTimeout(() => {
        triggerRef?.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen, triggerRef]);

  const handlePrint = useCallback(() => {
    if (typeof window !== "undefined") {
      window.print();
    }
  }, []);

  if (!isOpen) return null;

  const summary: TopicSummary = topic.summary ?? {
    keyConcepts: ["Konu özeti hazırlanıyor."],
    mnemonics: ["Hafıza şifreleri eklenmektedir."],
    examTraps: ["ÖSYM çeldiricilerine dikkat ediniz."],
    fastReviewNotes: ["Hızlı tekrar notları güncellenmektedir."],
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="summary-modal-title"
      aria-describedby="summary-modal-desc"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-zinc-950/85 backdrop-blur-[6px] transition-opacity duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog Container (Mobile: Full height/Bottom-sheet, Desktop: Centered card) */}
      <div
        ref={dialogRef}
        className={cn(
          "relative z-10 w-full max-w-3xl h-[100dvh] sm:h-auto sm:max-h-[90vh] rounded-t-2xl sm:rounded-xl overflow-hidden",
          "bg-zinc-900 border-t sm:border border-zinc-800",
          "shadow-2xl shadow-zinc-950/90 flex flex-col",
          "animate-in fade-in-0 slide-in-from-bottom-6 sm:zoom-in-95 duration-200 ease-out"
        )}
      >
        {/* Mobile Drag Indicator (Visual cue for touch sheet) */}
        <div className="w-12 h-1 bg-zinc-700/80 rounded-full mx-auto mt-2.5 sm:hidden" aria-hidden="true" />

        {/* Modal Header */}
        <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3 sm:py-3.5 border-b border-zinc-800 bg-zinc-900/95 sticky top-0 z-20 safe-top">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                <FileText className="size-3" aria-hidden="true" />
                Akıllı Çalışma Kağıdı
              </span>
              <span
                className={cn(
                  "text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded border",
                  subjectColor
                )}
              >
                {subjectName}
              </span>
              <Badge variant="default" className="text-[10px] tabular-nums hidden xs:inline-flex">
                ÖSYM: {topic.osmyWeight}/10
              </Badge>
            </div>
            <h2
              id="summary-modal-title"
              className="text-base sm:text-lg font-bold text-zinc-100 truncate mt-1 text-balance"
            >
              {topic.name}
            </h2>
            <p id="summary-modal-desc" className="sr-only">
              {topic.name} konusu için hafıza teknikleri, ezber şifreleri, sınav tuzakları ve hızlı tekrar notları.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <Button
              ref={printBtnRef}
              variant="secondary"
              size="sm"
              onClick={handlePrint}
              className="gap-1.5 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-zinc-700 font-semibold px-3 min-h-[38px] sm:min-h-[32px] touch-manipulation"
              aria-label="Bu çalışma kağıdını PDF olarak indir veya yazdır"
            >
              <Printer className="size-4 sm:size-3.5 text-amber-400" aria-hidden="true" />
              <span className="hidden sm:inline">PDF / Yazdır</span>
            </Button>

            <Button
              ref={closeBtnRef}
              variant="ghost"
              size="sm"
              onClick={onClose}
              aria-label="Çalışma kağıdını kapat (ESC)"
              className="size-10 sm:size-8 p-0 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-lg touch-manipulation"
            >
              <X className="size-5 sm:size-4" aria-hidden="true" />
            </Button>
          </div>
        </div>

        {/* Modal Body / Printable Content (Smooth momentum scrolling) */}
        <div
          id="summary-sheet-print-container"
          className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-5 bg-zinc-950/50 touch-scroll"
        >
          {/* Yazdırma Anteti (Normal ekranda gizli, printte görünür) */}
          <div className="hidden print:block border-b-2 border-zinc-900 pb-3 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-zinc-900">
                  KPSS Rehberi — Akıllı Çalışma Kağıdı
                </h1>
                <p className="text-xs text-zinc-600">
                  Ön Lisans KPSS Hazırlık & Hafıza Teknikleri Serisi
                </p>
              </div>
              <div className="text-right">
                <span className="text-sm font-semibold text-zinc-800 block">
                  {subjectName} · {topic.name}
                </span>
                <span className="text-xs text-zinc-500">
                  ÖSYM Soru Ağırlığı: {topic.osmyWeight}/10
                </span>
              </div>
            </div>
          </div>

          {/* 1. HAP BİLGİLER KARTI (Key Concepts) */}
          <section
            aria-labelledby="section-key-concepts"
            className="rounded-xl border border-zinc-800 bg-zinc-900/90 p-4 sm:p-5 shadow-sm print:border-zinc-300 print:bg-white"
          >
            <div className="flex items-center gap-2.5 mb-3">
              <div className="size-7 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center shrink-0 print:border-zinc-400">
                <Bookmark className="size-4 text-sky-400 print:text-zinc-900" aria-hidden="true" />
              </div>
              <div>
                <h3
                  id="section-key-concepts"
                  className="text-xs sm:text-sm font-bold uppercase tracking-wider text-sky-400 print:text-zinc-900"
                >
                  Sınavda En Çok Çıkan Hap Bilgiler
                </h3>
                <p className="text-[11px] text-zinc-400 print:text-zinc-600">
                  Konunun temelini oluşturan can alıcı kurallar ve ilkeler
                </p>
              </div>
            </div>

            <ul className="space-y-2.5 mt-2">
              {summary.keyConcepts.map((concept, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-200 print:text-zinc-900 leading-relaxed"
                >
                  <CheckCircle2 className="size-4 text-sky-400 print:text-zinc-800 shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-pretty">{concept}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 2. HAFIZA KUTUSU (Mnemonics & Memory Hacks) */}
          <section
            aria-labelledby="section-mnemonics"
            className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 sm:p-5 shadow-sm print:border-amber-600 print:bg-amber-50/50"
          >
            <div className="flex items-center gap-2.5 mb-3">
              <div className="size-7 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0">
                <Lightbulb className="size-4 text-amber-400 print:text-amber-700" aria-hidden="true" />
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3
                  id="section-mnemonics"
                  className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-300 print:text-amber-900"
                >
                  Hafıza Kutusu & Ezber Şifreleri
                </h3>
                <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 print:bg-amber-100 print:text-amber-800">
                  Akrostiş / Kodlama
                </span>
              </div>
            </div>

            <div className="space-y-2.5 mt-2">
              {summary.mnemonics.map((mnemonic, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-zinc-900 border border-amber-500/20 text-xs sm:text-sm text-zinc-100 print:bg-white print:border-zinc-300 print:text-zinc-900 leading-relaxed flex items-start gap-2.5"
                >
                  <Sparkles className="size-4 text-amber-400 print:text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
                  <div className="text-pretty">
                    <span className="font-bold text-amber-300 print:text-amber-800 mr-1.5">
                      İpucu #{idx + 1}:
                    </span>
                    {mnemonic}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 3. SINAV TUZAKLARI & ÇELDİRİCİLER (Exam Traps) */}
          <section
            aria-labelledby="section-traps"
            className="rounded-xl border border-rose-500/30 bg-rose-500/5 p-4 sm:p-5 shadow-sm print:border-rose-600 print:bg-rose-50/50"
          >
            <div className="flex items-center gap-2.5 mb-3">
              <div className="size-7 rounded-lg bg-rose-500/20 border border-rose-500/30 flex items-center justify-center shrink-0">
                <AlertTriangle className="size-4 text-rose-400 print:text-rose-700" aria-hidden="true" />
              </div>
              <div>
                <h3
                  id="section-traps"
                  className="text-xs sm:text-sm font-bold uppercase tracking-wider text-rose-300 print:text-rose-900"
                >
                  ÖSYM Sınav Tuzakları & Dikkat Noktaları
                </h3>
                <p className="text-[11px] text-rose-400/80 print:text-rose-800">
                  Öğrencilerin en çok düştüğü çeldiriciler ve soru kalıpları
                </p>
              </div>
            </div>

            <div className="space-y-2.5 mt-2">
              {summary.examTraps.map((trap, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-zinc-900 border border-rose-500/20 text-xs sm:text-sm text-zinc-200 print:bg-white print:border-zinc-300 print:text-zinc-900 leading-relaxed flex items-start gap-2.5"
                >
                  <span className="size-2 rounded-full bg-rose-500 shrink-0 mt-1.5" aria-hidden="true" />
                  <p className="text-pretty">{trap}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 4. HIZLI TEKRAR NOTLARI (Fast Review Notes) */}
          <section
            aria-labelledby="section-fast-review"
            className="rounded-xl border border-zinc-800 bg-zinc-900/90 p-4 sm:p-5 shadow-sm print:border-zinc-300 print:bg-white"
          >
            <div className="flex items-center gap-2.5 mb-3">
              <div className="size-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                <Zap className="size-4 text-emerald-400 print:text-emerald-700" aria-hidden="true" />
              </div>
              <div>
                <h3
                  id="section-fast-review"
                  className="text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-400 print:text-zinc-900"
                >
                  2 Dakikalık Hızlı Tekrar Maddeleri
                </h3>
                <p className="text-[11px] text-zinc-400 print:text-zinc-600">
                  Deneme veya soru çözümü öncesi ekspres kontrol listesi
                </p>
              </div>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-2">
              {summary.fastReviewNotes.map((note, idx) => (
                <li
                  key={idx}
                  className="p-3 rounded-lg bg-zinc-950/70 border border-zinc-800 text-xs text-zinc-300 print:bg-zinc-50 print:border-zinc-200 print:text-zinc-800 leading-relaxed flex items-start gap-2"
                >
                  <span className="text-emerald-400 font-bold print:text-zinc-900 shrink-0">
                    {idx + 1}.
                  </span>
                  <span className="text-pretty">{note}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Modal Footer */}
        <div className="px-4 sm:px-6 py-3 border-t border-zinc-800 bg-zinc-900 flex items-center justify-between text-xs text-zinc-400 safe-bottom">
          <span className="flex items-center gap-1.5">
            <Sparkles className="size-3.5 text-amber-500" aria-hidden="true" />
            <span className="font-medium">Ön Lisans KPSS Çalışma Kağıdı Serisi</span>
          </span>
          <span className="text-[11px] text-zinc-500 hidden sm:inline">
            ESC ile kapatabilirsiniz
          </span>
        </div>
      </div>
    </div>
  );
}
