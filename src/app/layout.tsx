import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Axora Innovative Solutions | AI, Cloud, Data, Outcomes",
  description:
    "Axora Innovative Solutions empowers enterprises to reimagine operations, accelerate growth, and create lasting impact through AI-driven innovation and intelligent engineering.",
  openGraph: {
    title: "Axora Innovative Solutions",
    description:
      "Intelligence that transforms tomorrow. AI-driven innovation and intelligent engineering for enterprise outcomes.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#030405",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geist.variable} ${geistMono.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-dvh bg-ink text-fg">
        {/*
          Entry and scroll animations render their hidden state as an inline style
          during SSR. Without this, a visitor with JavaScript disabled would get a
          page of invisible sections. The !important beats the inline style.
        */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>

        <MotionProvider>
          <Navbar />
          {children}
          <Footer />
        </MotionProvider>

        {/* Fixed grain layer. Never inside a scrolling container. */}
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
