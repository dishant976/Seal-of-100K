// app/layout.tsx

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Example of local fonts usage:
const geistSans = localFont({
  src: "../public/fonts/GeistVF.woff", // or "/fonts/GeistVF.woff"
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../public/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Seal of 100K",
  description: "Seal of 100K - Art, Mythology, and Bitcoin.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}

        {/*
          Removed <Analytics /> and <SpeedInsights /> 
          so we don't load scripts from "va.vercel-scripts.com".
        */}
      </body>
    </html>
  );
}
