import { Epilogue, Plus_Jakarta_Sans, Noto_Sans_KR, JetBrains_Mono } from "next/font/google";

import { AuthSessionSync } from "@/components/auth/AuthSessionSync";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import "@/styles/globals.css";

import type { Metadata } from "next";

const epilogue = Epilogue({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800", "900"],
  variable: "--font-headline",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-korean",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "StyleSync — Sync Your Vibe",
  description: "하나의 취향에서 시작해 세 개의 세계로 연결되는 크로스 도메인 추천 플랫폼",
  openGraph: {
    title: "StyleSync",
    description: "음악 × 영화 × 패션, 당신의 취향을 하나로 연결하세요",
    siteName: "StyleSync",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${epilogue.variable} ${plusJakartaSans.variable} ${notoSansKR.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased flex min-h-screen flex-col">
        <AuthSessionSync />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
