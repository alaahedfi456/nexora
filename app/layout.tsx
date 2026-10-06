import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NEXORA — AI & Digital Innovation Studio",
  description: "We build what's next. NEXORA is a premium AI & digital innovation studio crafting exceptional products, platforms, and digital experiences.",
  keywords: ["AI studio", "digital innovation", "web development", "machine learning", "SaaS", "UI/UX design"],
  authors: [{ name: "NEXORA Studio" }],
  openGraph: {
    title: "NEXORA — AI & Digital Innovation Studio",
    description: "We build what's next. Premium AI & digital products.",
    type: "website",
    siteName: "NEXORA",
  },
  twitter: {
    card: "summary_large_image",
    title: "NEXORA — AI & Digital Innovation Studio",
    description: "We build what's next. Premium AI & digital products.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="grain antialiased">
        {children}
      </body>
    </html>
  );
}
