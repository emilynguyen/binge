

import type { Metadata } from "next";

import "./globals.css";
import Footer from '@/components/layout/Footer';
import Intro from '@/components/ui/Intro';


/*
import localFont from 'next/font/local';

const basis = localFont({
  src: [
    {
      path: '/font/gt-alpina-standard-regular-italic.woff2',
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
        className='antialiased flex flex-col min-h-full'
      >
        <main className="flex min-h-full grow">
          <div className="hidden lg:block grow w-[14vw] max-w-[35rem]">
            <Intro className="rounded-r-3xl"/>
          </div>
          <div className="flex  justify-center items-center flex-col grow p-6 md:pl-12 md:pr-12 text-center">  
              <div className="relative w-full grow max-w-md flex flex-col justify-center items-center pt-12 pb-12">
              {children}
              </div>
              <Footer/>
          </div>
        </main>
       
      </body>
    </html>
  );
}
