"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  FileText,
  GraduationCap,
  Home,
  MapPin,
  Plane,
  Sparkles
} from "lucide-react";

const floatingIcons = [
  {
    Icon: Plane,
    className: "left-[8%] top-[18%] text-sky-500/35",
    animation: {
      y: [0, -18, 0],
      rotate: [0, -6, 0]
    },
    duration: 9
  },
  {
    Icon: MapPin,
    className: "right-[14%] top-[22%] text-cyan-500/35",
    animation: {
      y: [0, 16, 0],
      rotate: [0, 8, 0]
    },
    duration: 10
  },
  {
    Icon: GraduationCap,
    className: "right-[7%] top-[54%] text-indigo-500/30",
    animation: {
      y: [0, -16, 0],
      rotate: [0, 6, 0]
    },
    duration: 11
  },
  {
    Icon: Home,
    className: "left-[14%] bottom-[16%] text-blue-500/30",
    animation: {
      y: [0, 18, 0],
      rotate: [0, -8, 0]
    },
    duration: 12
  },
  {
    Icon: FileText,
    className: "left-[46%] top-[14%] text-slate-500/25",
    animation: {
      y: [0, -14, 0],
      rotate: [0, -10, 0]
    },
    duration: 8
  },
  {
    Icon: Briefcase,
    className: "left-[72%] bottom-[20%] text-amber-500/30",
    animation: {
      y: [0, 12, 0],
      rotate: [0, 12, 0]
    },
    duration: 9.5
  }
];

export function FloatingStudyIcons() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden overflow-hidden sm:block">
      {floatingIcons.map(({ Icon, className, animation, duration }) => (
        <motion.div
          key={className}
          className={`absolute ${className}`}
          animate={animation}
          transition={{
            duration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Icon className="h-10 w-10 md:h-12 md:w-12" strokeWidth={1.6} />
        </motion.div>
      ))}
    </div>
  );
}
