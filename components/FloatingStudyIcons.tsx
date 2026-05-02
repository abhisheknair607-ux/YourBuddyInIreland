"use client";

import { motion } from "framer-motion";
import {
  Banknote,
  BookOpen,
  Briefcase,
  FileText,
  GraduationCap,
  Home,
  MapPin,
  Plane,
  ShieldCheck,
  Sparkles,
  UsersRound
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
  },
  {
    Icon: BookOpen,
    className: "left-[6%] top-[40%] text-blue-500/28",
    animation: {
      y: [0, -14, 0],
      rotate: [0, 8, 0]
    },
    duration: 10.5
  },
  {
    Icon: Banknote,
    className: "left-[10%] bottom-[30%] text-emerald-500/28",
    animation: {
      y: [0, 14, 0],
      rotate: [0, -6, 0]
    },
    duration: 11.5
  },
  {
    Icon: UsersRound,
    className: "right-[9%] top-[38%] text-sky-500/28",
    animation: {
      y: [0, -15, 0],
      rotate: [0, 7, 0]
    },
    duration: 9.75
  },
  {
    Icon: ShieldCheck,
    className: "right-[16%] bottom-[28%] text-indigo-500/24",
    animation: {
      y: [0, 16, 0],
      rotate: [0, -7, 0]
    },
    duration: 12.5
  },
  {
    Icon: Sparkles,
    className: "left-[24%] top-[30%] text-cyan-500/24",
    animation: {
      y: [0, -12, 0],
      rotate: [0, 10, 0]
    },
    duration: 8.75
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
