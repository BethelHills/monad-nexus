import type { Transition, Variants } from "framer-motion";

export const easeOut: Transition = {
  duration: 0.55,
  ease: [0.22, 1, 0.36, 1],
};

export const easeSpring: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 18,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1 },
};

export const slideDown: Variants = {
  hidden: { opacity: 0, y: -12 },
  visible: { opacity: 1, y: 0 },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.04,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export const hoverLift = {
  y: -3,
  transition: easeSpring,
};

export const tapScale = {
  scale: 0.98,
};
