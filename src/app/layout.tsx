import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HeaderNav from "../components/HeaderNav";
import ThemeApply from "../components/ThemeApply";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hotel Booking UI",
  description: "Create and manage hotel bookings (demo, client-side only).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="day">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans bg-white text-zinc-900`}
      >
        <header className="border-b text-white" style={{ background: "var(--header-bg)", color: "var(--header-fg)", borderColor: "var(--header-border)" }}>
          <div className="mx-auto flex max-w-6xl items-center justify-between p-5">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-md bg-white/90" aria-hidden />
              <Link href="/bookings" className="text-sm font-semibold tracking-tight text-white">
                Hotel Booking
              </Link>
            </div>
            <HeaderNav />
          </div>
        </header>
        <ThemeApply />
        {children}
      </body>
    </html>
  );
}
