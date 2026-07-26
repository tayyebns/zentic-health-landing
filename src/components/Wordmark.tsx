"use client";

import { motion } from "framer-motion";

const SIZE_CLASSES = {
  sm: "text-[18px]",
  base: "text-[20px]",
  lg: "text-[32px]",
} as const;

export default function Wordmark({
  size = "lg",
  animate = false,
}: {
  size?: keyof typeof SIZE_CLASSES;
  animate?: boolean;
}) {
  const className = `inline-block font-ds font-bold leading-none tracking-[-0.02em] text-ds-primary ${SIZE_CLASSES[size]}`;

  if (animate) {
    return (
      <motion.span
        className={className}
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        Zentic Health
      </motion.span>
    );
  }

  return (
    <span className={className} aria-hidden="true">
      Zentic Health
    </span>
  );
}
