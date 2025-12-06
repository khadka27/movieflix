import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import NetflixLoader from "@/components/ui/NetflixLoader";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MovieFlix - Infinite Entertainment",
  description: "Watch TV shows and movies anywhere.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} font-sans bg-background text-white antialiased`}
      >
        <NetflixLoader />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
