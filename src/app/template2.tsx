"use client";

//import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full grow max-w-md flex flex-col justify-center items-center">
    {children}
    </div>
  );
  /*
  return (
    
    <motion.div className="w-full grow max-w-md flex flex-col justify-center items-center"
      initial={{ y: 20, opacity: 1 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 1 }}
      transition={{ ease: "easeOut", duration: 0.4 }}
    >
      {children}
    </motion.div>
  
  ); */
}

