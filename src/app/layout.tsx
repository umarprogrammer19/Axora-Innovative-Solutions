import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
  title: "Axora Innovative Solutions | AI and Business Automation",
  description:
    "Axora designs, builds, and runs automation for operations teams. First release live in two weeks, measured in hours saved.",
  openGraph: {
    title: "Axora Innovative Solutions",
    description:
      "Whatever slows you down, we automate it. Automation systems designed, built, and operated for you.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#05070f",
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
        {children}
        {/* Fixed grain layer. Never inside a scrolling container. */}
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
