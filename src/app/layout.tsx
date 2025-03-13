

import type { Metadata } from "next";

import "./globals.css";
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { HeaderVisibilityProvider } from '@/contexts/HeaderVisibilityContext';

import localFont from 'next/font/local';

/*

const basis = localFont({
  src: [
    {
      path: './font/basis.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '/font/Basis-Grotesque-Mono-Pro-Medium.woff2',
      weight: '500',
      style: 'normal',
    }
  ],
})

*/


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
