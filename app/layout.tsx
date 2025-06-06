import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "./components/LayoutWrapper";
import { SanityLive } from "@/sanity/lib/live";
import { DisableDraftMode } from "@/app/components/DisableDraftMode";
import { draftMode } from "next/headers";

import { VisualEditing } from "next-sanity";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alamo Tees - Custom T-Shirts and Apparel",
  description: "Your source for quality custom t-shirts and apparel in San Antonio",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <SanityLive />
        <LayoutWrapper>{children}</LayoutWrapper>
        {(await draftMode()).isEnabled && (
        <>
          <VisualEditing />
          <DisableDraftMode />
        </>
      )}
      </body>
    </html>
  );
}
