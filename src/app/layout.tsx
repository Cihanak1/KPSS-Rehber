import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "KPSS Rehberi — Ön Lisans Hazırlık & Akıllı Çalışma Kağıtları",
    template: "%s | KPSS Rehberi",
  },
  description:
    "Ön Lisans KPSS hazırlık için hafıza teknikleri, akıllı özet ve çalışma kağıtları (PDF/Print), Pareto 80/20 çalışma programı, Leitner aralıklı tekrar ve video entegrasyonlu modern platform.",
  keywords: [
    "KPSS",
    "Ön Lisans KPSS",
    "KPSS hazırlık",
    "KPSS hafıza teknikleri",
    "KPSS çalışma kağıdı",
    "KPSS ders programı",
    "KPSS özet PDF",
    "Türkçe",
    "Matematik",
    "Tarih",
    "Coğrafya",
    "Vatandaşlık",
    "Leitner sistemi",
    "Pareto analizi",
  ],
  authors: [{ name: "KPSS Rehberi" }],
  creator: "KPSS Rehberi",
  robots: {
    index: true,
    follow: true,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "KPSS Rehberi",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    title: "KPSS Rehberi — Ön Lisans Hazırlık & Akıllı Çalışma Kağıtları",
    description:
      "Ön Lisans KPSS hazırlık için hafıza teknikleri destekli akıllı özet kağıtları, video entegrasyonu ve günlük ders programı.",
    siteName: "KPSS Rehberi",
  },
  twitter: {
    card: "summary_large_image",
    title: "KPSS Rehberi — Ön Lisans Hazırlık & Akıllı Çalışma Kağıtları",
    description:
      "Ön Lisans KPSS hazırlık için hafıza teknikleri destekli akıllı özet kağıtları, video entegrasyonu ve günlük ders programı.",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${inter.variable} dark`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="min-h-dvh bg-zinc-950 text-zinc-100 antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
