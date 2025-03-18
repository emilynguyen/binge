import type { Metadata } from "next";
import { GoogleAnalytics } from '@next/third-parties/google'


import "./globals.css";
import Footer from '@/components/layout/Footer';
import Intro from '@/components/ui/Intro';



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
        <main className="flex min-h-full grow w-full">
          <div className="hidden w-full lg:block grow w[14vw] max-w-[35rem]">
            <Intro className="rounded-r-3xl"/>
          </div>
          <div className="flex w-full justify-center items-center flex-col grow p-6 md:pl-12 md:pr-12 text-center ">  
              <div className="relative w-full grow max-w-md flex flex-col justify-center items-center pt-12 pb-12">
              {children}
              </div>
              <Footer/>
          </div>
        </main>
       
      </body>
      <GoogleAnalytics gaId="G-SYQSHMG9Q3" />
    </html>
  );
}
