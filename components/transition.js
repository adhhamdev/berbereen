"use client";
import { motion } from "framer-motion";

export default function Transition({ children, ...props }) {
  console.log(props);
  return <motion.div {...props}>{children}</motion.div>;
}
