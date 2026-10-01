"use client";

import { useEffect, useState, type MouseEvent } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useMotionTemplate,
  type Variants,
} from "framer-motion";

const ROLES = ["AI Engineer", "Full-Stack Developer", "ML Researcher", "Problem Solver"];

const STATS = [
  { value: "3.82", label: "CGPA" },
  { value: "15+", label: "Projects" },
  { value: "2×", label: "Hackathon wins" },
];

const TECH = [
  { name: "Next.js", pos: "-left-6 top-10", delay: 0 },
  { name: "Python", pos: "-right-4 top-24", delay: 0.6 },
  { name: "TensorFlow", pos: "-left-10 bottom-24", delay: 1.2 },
  { name: "Tailwind", pos: "-right-8 bottom-10", delay: 1.8 },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: EASE } },
};

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  // Mouse-follow spotlight
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);
  const spotlight = useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, rgba(52,211,153,0.10), transparent 70%)`;

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  useEffect(() => {
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % ROLES.length), 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="relative flex h-[100svh] min-h-[620px] items-center overflow-hidden bg-zinc-950"
    >
      {/* ---------- Background ---------- */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />
      <motion.div
        aria-hidden
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-32 top-1/4 h-80 w-80 rounded-full bg-emerald-500/20 blur-[100px]"
      />
      <motion.div
        aria-hidden
        animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-32 bottom-1/4 h-80 w-80 rounded-full bg-cyan-500/15 blur-[100px]"
      />
      <motion.div
        aria-hidden
        style={{ background: spotlight }}
        className="pointer-events-none absolute inset-0 hidden md:block"
      />

      {/* ---------- Content ---------- */}
      <div className="relative mx-auto grid w-full max-w-5xl items-center gap-12 px-6 pt-16 lg:grid-cols-[1.2fr_1fr]">
        {/* Left: text */}
        <motion.div variants={container} initial="hidden" animate="show">
          {/* Badge */}
          <motion.div
            variants={item}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1.5 text-xs font-medium text-emerald-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Open to internships · 2026
          </motion.div>

          {/* Name */}
          <motion.p variants={item} className="mb-2 font-mono text-sm text-zinc-500">
            Hi there 👋, I&apos;m
          </motion.p>
          <motion.h1
            variants={item}
            className="text-5xl font-bold leading-[1.05] tracking-tight text-zinc-100 sm:text-6xl lg:text-7xl"
          >
            Ahmed{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Raza
            </span>
          </motion.h1>

          {/* Rotating role */}
          <motion.div
            variants={item}
            className="mt-4 flex h-9 items-center gap-2 text-xl font-medium text-zinc-400 sm:text-2xl"
          >
            <span className="text-zinc-600">{"//"}</span>
            <div className="relative h-full overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={ROLES[roleIndex]}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="block leading-9 text-zinc-100"
                >
                  {ROLES[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="h-6 w-0.5 bg-emerald-400"
            />
          </motion.div>

          {/* Bio */}
          <motion.p
            variants={item}
            className="mt-5 max-w-md text-[15px] leading-relaxed text-zinc-400 sm:text-base"
          >
            BS Artificial Intelligence student at{" "}
            <span className="text-zinc-200">The Islamia University of Bahawalpur</span>. I build
            intelligent products that blend clean design with machine learning.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 px-6 py-3 text-sm font-semibold text-zinc-950 shadow-lg shadow-emerald-500/20 transition-transform active:scale-95"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">View my work</span>
              <span className="relative transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <a
              href="/resume.pdf"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-zinc-100 transition-all duration-300 hover:border-emerald-400/40 hover:bg-emerald-400/10 active:scale-95"
            >
              Download CV
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" />
              </svg>
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={item}
            className="mt-10 flex items-center gap-6 border-t border-white/5 pt-6 sm:gap-10"
          >
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <p className="text-2xl font-bold text-zinc-100 sm:text-3xl">{value}</p>
                <p className="mt-1 text-xs text-zinc-500">{label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: visual (desktop only, keeps mobile inside one screen) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: EASE }}
          className="relative mx-auto hidden aspect-square w-full max-w-sm lg:block"
        >
          {/* Rotating rings */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-dashed border-emerald-400/20"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute inset-8 rounded-full border border-cyan-400/15"
          >
            <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-cyan-400 shadow-[0_0_20px_4px] shadow-cyan-400/50" />
          </motion.div>

          {/* Avatar */}
          <div className="absolute inset-16 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 p-[2px]">
            <div className="grid h-full w-full place-items-center rounded-full bg-zinc-900">
              {/* Swap for <Image src="/ahmed.jpg" ... className="rounded-full object-cover" /> */}
              <span className="bg-gradient-to-br from-emerald-300 to-cyan-300 bg-clip-text text-7xl font-bold text-transparent">
                AR
              </span>
            </div>
          </div>

          {/* Floating tech chips */}
          {TECH.map(({ name, pos, delay }) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: [0, -10, 0] }}
              transition={{
                opacity: { delay: 1 + delay * 0.3, duration: 0.5 },
                y: { delay, duration: 4, repeat: Infinity, ease: "easeInOut" },
              }}
              className={`absolute ${pos} rounded-xl border border-white/10 bg-zinc-900/80 px-3 py-2 text-xs font-medium text-zinc-200 shadow-xl backdrop-blur-md`}
            >
              <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {name}
            </motion.div>
          ))}

          {/* Currently building card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6, ease: EASE }}
            className="absolute -bottom-6 left-1/2 w-60 -translate-x-1/2 rounded-2xl border border-white/10 bg-zinc-900/90 p-3 shadow-2xl backdrop-blur-md"
          >
            <p className="text-[10px] uppercase tracking-widest text-zinc-500">Currently building</p>
            <p className="mt-1 text-sm font-medium text-zinc-100">Urdu Speech Recognizer 🎙️</p>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "72%" }}
                transition={{ delay: 2, duration: 1.5, ease: EASE }}
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-zinc-500 sm:flex"
      >
        Scroll
        <span className="flex h-9 w-5 justify-center rounded-full border border-white/15 pt-1.5">
          <motion.span
            animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1 rounded-full bg-emerald-400"
          />
        </span>
      </motion.a>
    </section>
  );
}