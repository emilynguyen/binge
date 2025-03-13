

import type { Metadata } from "next";

import "./globals.css";
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { HeaderVisibilityProvider } from '@/contexts/HeaderVisibilityContext';


// import { motion } from "framer-motion";



export const metadata: Metadata = {
  title: "Binge",
  description: "Swipe through restaurants until there’s a match — no chit-chat, no negotiation.",
};


export default function RootLayout({
  children, 
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body
        className='antialiased flex flex-col min-h-full p-6'
      >
        <HeaderVisibilityProvider>
        <Header />
        <main className="flex justify-center items-center flex-col min-h-full grow pt-12 pb-12 text-center">
          
              {children}
          
        </main>
        <Footer />
        </HeaderVisibilityProvider>
      </body>
    </html>
  );
}
