"use client";
import { motion } from "framer-motion";

export default function Template({ children }) {
  return (
    <motion.div
    //   initial={{ scale: .95, opacity: 0 }}
    //   animate={{ scale: 1, opacity: 1 }}
    //   transition={{ ease: "easeInOut", duration: 0.75 }}
    >
      {children}
    </motion.div>
  );
}
