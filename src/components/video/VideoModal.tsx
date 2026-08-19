"use client";

import { useCallback, useEffect, useRef } from "react";
import { X, ExternalLink, Play, FileText, Sparkles, Clock, BookOpen } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { VideoResource } from "@/types";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  video: VideoResource;
  triggerRef?: React.RefObject<HTMLButtonElement | null>;
  onOpenSummary?: () => void;
}

const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "textarea",
  "input",
  "select",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

export function VideoModal({ isOpen, onClose, video, triggerRef, onOpenSummary }: VideoModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const primaryBtnRef = useRef<HTMLAnchorElement>(null);

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
      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE));
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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const timer = setTimeout(() => {
        if (primaryBtnRef.current) {
          primaryBtnRef.current.focus();
        } else {
          closeButtonRef.current?.focus();
        }
      }, 50);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "";
      };
    } else {
      document.body.style.overflow = "";
      const timer = setTimeout(() => triggerRef?.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen, triggerRef]);

  if (!isOpen) return null;

  const hasEmbed = Boolean(video.embedId && video.embedId.trim() !== "");
  const directUrl = video.directUrl || `https://www.youtube.com/results?search_query=${encodeURIComponent(video.searchQuery || video.title)}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-zinc-950/85 backdrop-blur-[6px] transition-opacity duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog Panel */}
      <div
        ref={dialogRef}
        className={cn(
          "relative z-10 w-full max-w-2xl rounded-t-2xl sm:rounded-2xl overflow-hidden",
          "bg-zinc-900 border-t sm:border border-zinc-800",
          "shadow-2xl shadow-zinc-950/90 flex flex-col",
          "animate-in fade-in-0 slide-in-from-bottom-6 sm:zoom-in-95 duration-200 ease-out"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-b border-zinc-800 bg-zinc-900/95 sticky top-0 z-20 safe-top">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="size-2 rounded-full bg-red-500 animate-pulse" aria-hidden="true" />
              <Badge variant="amber" className="text-[11px] py-0.5 px-2 font-bold uppercase tracking-wider">
                {video.instructor}
              </Badge>
              <span className="text-xs text-zinc-400 font-medium">Ön Lisans KPSS Dersi</span>
            </div>
            <h2
              id="video-modal-title"
              className="text-base sm:text-lg font-bold text-zinc-100 truncate mt-1 text-balance"
            >
              {video.title}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              ref={closeButtonRef}
              variant="ghost"
              size="sm"
              onClick={onClose}
              aria-label="Pencereyi kapat (ESC)"
              className="size-10 sm:size-9 p-0 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-lg touch-manipulation"
            >
              <X className="size-5 sm:size-4" aria-hidden="true" />
            </Button>
          </div>
        </div>

        {/* Modal İçeriği */}
        <div className="p-4 sm:p-6 space-y-5 bg-zinc-950/60 touch-scroll">
          {hasEmbed ? (
            /* Doğrulanmış Embed Modu */
            <div className="aspect-video w-full rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800 shadow-inner">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${video.embedId}?autoplay=1&rel=0&modestbranding=1`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          ) : (
            /* Akıllı KPSS Ders Kartı & Doğrudan İzleme Modu */
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/90 p-5 sm:p-6 shadow-sm flex flex-col items-center text-center gap-4">
              {/* YouTube İkon Rozeti */}
              <div className="size-16 rounded-2xl bg-red-600/10 border border-red-500/20 flex items-center justify-center text-red-500 shadow-md">
                <Play className="size-8 fill-current ml-1" aria-hidden="true" />
              </div>

              {/* Ders & Hoca Bilgisi */}
              <div className="space-y-1.5 max-w-lg">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-800 border border-zinc-700 text-xs text-amber-400 font-semibold mb-1">
                  <Sparkles className="size-3" aria-hidden="true" />
                  <span>Resmi YouTube Müfredat Dersi</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-zinc-100 text-balance">
                  {video.title}
                </h3>
                <p className="text-sm font-semibold text-zinc-300">
                  Eğitmen: <span className="text-amber-400">{video.instructor}</span>
                </p>
              </div>

              {/* Bilgilendirme ve İpuçları Kutusu */}
              <div className="w-full p-3.5 rounded-lg bg-zinc-950/80 border border-zinc-800/90 text-left flex items-start gap-3">
                <Clock className="size-4 text-sky-400 shrink-0 mt-0.5" aria-hidden="true" />
                <div className="text-xs text-zinc-300 space-y-1 leading-relaxed">
                  <p>
                    <strong className="text-zinc-100">Önerilen Çalışma Süresi:</strong> ~40-50 dakika.
                  </p>
                  <p className="text-zinc-400 text-pretty">
                    Telif ve oynatma kısıtlamalarına takılmadan en güncel dersi tam kalitede izlemek için doğrudan YouTube resmi oynatıcısına yönlendirileceksiniz.
                  </p>
                </div>
              </div>

              {/* Eylem Butonları */}
              <div className="w-full flex flex-col sm:flex-row items-center gap-3 pt-2">
                {/* 1. Birincil Eylem: YouTube'da Resmi Derse Git */}
                <a
                  ref={primaryBtnRef}
                  href={directUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "w-full flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm sm:text-base",
                    "bg-red-600 hover:bg-red-500 text-white transition-all duration-150 active:scale-[0.98] shadow-lg shadow-red-600/20 touch-manipulation",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
                  )}
                >
                  <Play className="size-4 sm:size-5 fill-current" aria-hidden="true" />
                  <span>YouTube Üzerinde Resmi Derse Git</span>
                  <ExternalLink className="size-4 ml-1 opacity-80" aria-hidden="true" />
                </a>

                {/* 2. İkincil Eylem: Konu Özetini Aç */}
                {onOpenSummary && (
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => {
                      onClose();
                      onOpenSummary();
                    }}
                    className="w-full sm:w-auto font-semibold text-xs sm:text-sm py-3.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-zinc-700 touch-manipulation"
                    aria-label="Konu özet kağıdını aç"
                  >
                    <FileText className="size-4 text-amber-400 mr-1.5" aria-hidden="true" />
                    <span>Konu Özetini Aç</span>
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-3 border-t border-zinc-800 bg-zinc-900 flex items-center justify-between text-xs text-zinc-400 safe-bottom">
          <span className="flex items-center gap-1.5 text-zinc-400">
            <BookOpen className="size-3.5 text-amber-500" aria-hidden="true" />
            <span>KPSS Ön Lisans Akıllı Video Rehberi</span>
          </span>
          <span className="text-[11px] text-zinc-500 hidden sm:inline">
            ESC ile kapatabilirsiniz
          </span>
        </div>
      </div>
    </div>
  );
}