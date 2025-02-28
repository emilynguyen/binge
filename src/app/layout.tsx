import type { Metadata } from "next";
import { Instrument_Serif, DM_Mono } from "next/font/google";

import "./globals.css";
import Footer from '@/components/layout/Footer';



const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
});

const dmMono = DM_Mono({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Binge",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${instrumentSerif.className} ${dmMono.className} antialiased flex flex-col min-h-full p-6`}
      >
        <main className="flex justify-center items-center flex-col min-h-full pt-8 pb-12 text-center">
        <div className="w-full h-full max-w-md flex flex-col grow justify-center items-center gap-10">
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
