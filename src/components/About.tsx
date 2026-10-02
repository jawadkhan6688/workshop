"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  animate,
  type MotionValue,
} from "framer-motion";
import {
  MapPin,
  GraduationCap,
  CalendarDays,
  Languages,
  Download,
  Sparkles,
  Brain,
  Code2,
  Palette,
  ArrowUpRight,
  Clock,
  GitBranch,
  Award,
  Coffee,
  BookOpen,
  Gamepad2,
  Camera,
  Plane,
  Music,
  Trophy,
  Mountain,
  Quote,
  type LucideIcon,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const FACTS: { icon: LucideIcon; label: string; value: string }[] = [
  { icon: MapPin, label: "Based in", value: "Bahawalpur, PK" },
  { icon: GraduationCap, label: "Studying", value: "BS AI · IUB" },
  { icon: CalendarDays, label: "Graduating", value: "2027" },
  { icon: Languages, label: "Speaks", value: "Urdu, English, Saraiki" },
];

const SERVICES: { icon: LucideIcon; title: string; desc: string; points: string[] }[] = [
  {
    icon: Brain,
    title: "Machine Learning",
    desc: "Training and deploying models for vision, speech and language.",
    points: ["Speech AI", "Computer Vision", "RAG / LLMs"],
  },
  {
    icon: Code2,
    title: "Full-Stack Web",
    desc: "Production apps that are fast, typed and scalable from day one.",
    points: ["Next.js", "APIs", "Databases"],
  },
  {
    icon: Palette,
    title: "UI Engineering",
    desc: "Minimal interfaces with motion that feels natural.",
    points: ["Design systems", "Animation", "Responsive"],
  },
];

const COUNTERS: { icon: LucideIcon; to: number; suffix: string; label: string }[] = [
  { icon: Clock, to: 3, suffix: "+", label: "Years coding" },
  { icon: GitBranch, to: 1200, suffix: "+", label: "GitHub commits" },
  { icon: Award, to: 8, suffix: "", label: "Certifications" },
  { icon: Coffee, to: 900, suffix: "+", label: "Cups of chai" },
];

const INTERESTS: { icon: LucideIcon; label: string }[] = [
  { icon: Trophy, label: "Cricket" },
  { icon: BookOpen, label: "Reading" },
  { icon: Gamepad2, label: "Gaming" },
  { icon: Camera, label: "Photography" },
  { icon: Plane, label: "Travelling" },
  { icon: Music, label: "Qawwali" },
  { icon: Mountain, label: "Hiking" },
  { icon: Coffee, label: "Chai" },
];

const BIO =
  "What started as a GPA calculator for my classmates turned into a habit of shipping real products. Today I build speech recognition for Urdu and full-stack AI apps, and I care about clean code, fast interfaces and solving problems people actually have.";

/* ---------- Animated heading: word by word ---------- */
function RevealHeading() {
  const plain = ["Turning", "ideas", "into"];
  const grad = ["intelligent", "products."];
  return (
    <h2 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-zinc-100 sm:text-5xl">
      {[...plain, ...grad].map((w, i) => (
        <span key={i} className="mr-[0.25em] inline-block overflow-hidden pb-1 align-bottom">
          <motion.span
            initial={{ y: "110%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
            className={`inline-block ${
              i >= plain.length ? "bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent" : ""
            }`}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </h2>
  );
}

/* ---------- Scroll-linked word highlight ---------- */
function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const highlight = ["Urdu", "speech", "recognition", "real", "products."].includes(children);
  return (
    <motion.span style={{ opacity }} className={`mr-[0.3em] inline-block ${highlight ? "text-emerald-300" : "text-zinc-100"}`}>
      {children}
    </motion.span>
  );
}

function ScrollBio() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = BIO.split(" ");
  return (
    <p ref={ref} className="text-xl font-medium leading-relaxed sm:text-2xl">
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </p>
  );
}

/* ---------- Counter ---------- */
function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 2, ease: EASE, onUpdate: (v) => setVal(Math.round(v)) });
    return () => c.stop();
  }, [inView, to]);
  return (
    <span ref={ref}>
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ---------- Profile card with rotating gradient border ---------- */
function ProfileCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotate: -2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: EASE }}
      className="relative overflow-hidden rounded-3xl p-px"
    >
      {/* rotating conic border */}
      <motion.div
        aria-hidden
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        className="absolute left-1/2 top-1/2 h-[200%] w-[200%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_0%,#34d399_10%,transparent_20%,transparent_50%,#22d3ee_60%,transparent_70%)]"
      />
      <div className="relative h-full rounded-[calc(1.5rem-1px)] bg-zinc-900 p-6 sm:p-7">
        {/* Avatar */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-2 rounded-full border border-dashed border-emerald-400/30"
            />
            <div className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 text-xl font-bold text-zinc-950">
              AR
            </div>
            <span className="absolute bottom-0 right-0 flex h-4 w-4">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-zinc-900 bg-emerald-400" />
            </span>
          </div>
          <div>
            <p className="font-semibold text-zinc-100">Ahmed Raza</p>
            <p className="text-xs text-emerald-400">AI Engineer · Student</p>
          </div>
        </div>

        {/* Facts */}
        <ul className="mt-6 space-y-3">
          {FACTS.map(({ icon: Icon, label, value }, i) => (
            <motion.li
              key={label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.5, ease: EASE }}
              className="group flex items-center gap-3"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5 transition-all duration-300 group-hover:rotate-12 group-hover:border-emerald-400/40 group-hover:bg-emerald-400/10">
                <Icon className="h-4 w-4 text-emerald-400" strokeWidth={1.75} />
              </span>
              <div className="min-w-0">
                <p className="text-[11px] text-zinc-500">{label}</p>
                <p className="truncate text-sm font-medium text-zinc-100">{value}</p>
              </div>
            </motion.li>
          ))}
        </ul>

        <a
          href="/resume.pdf"
          className="group mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 py-3 text-sm font-semibold text-zinc-100 transition-all hover:border-emerald-400/40 hover:bg-emerald-400/10 active:scale-[0.98]"
        >
          <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
          Download résumé
        </a>
      </div>
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-zinc-950 py-24 sm:py-32">
      {/* background */}
      <motion.div
        aria-hidden
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-emerald-500/10 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:24px_24px]"
      />

      <div className="relative mx-auto max-w-5xl px-6">
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-3 flex items-center gap-3 font-mono text-sm text-emerald-400"
          >
            <span>01</span>
            <motion.span
              initial={{ width: 0 }}
              whileInView={{ width: 40 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
              className="h-px bg-emerald-400/50"
            />
            <span>About me</span>
          </motion.p>
          <RevealHeading />
        </div>

        {/* Profile + Bio */}
        <div className="grid gap-5 lg:grid-cols-[320px_1fr]">
          <ProfileCard />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur-sm sm:p-8"
          >
            <Quote className="absolute right-6 top-6 h-16 w-16 rotate-180 text-white/[0.04]" />
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1 text-xs text-emerald-300">
                <motion.span animate={{ rotate: 360 }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }}>
                  <Sparkles className="h-3.5 w-3.5" />
                </motion.span>
                My story
              </div>
              <ScrollBio />
            </div>

            {/* Counters */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {COUNTERS.map(({ icon: Icon, to, suffix, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: EASE }}
                  whileHover={{ y: -4 }}
                  className="group rounded-2xl border border-white/5 bg-zinc-950/50 p-4 transition-colors hover:border-emerald-400/30"
                >
                  <Icon className="mb-3 h-4 w-4 text-zinc-500 transition-colors group-hover:text-emerald-400" />
                  <p className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-2xl font-bold text-transparent">
                    <Counter to={to} suffix={suffix} />
                  </p>
                  <p className="mt-0.5 text-[11px] text-zinc-500">{label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Services */}
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {SERVICES.map(({ icon: Icon, title, desc, points }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: EASE }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/50 p-6 transition-all duration-500 hover:-translate-y-2 hover:border-emerald-400/30 hover:shadow-2xl hover:shadow-emerald-500/10"
            >
              {/* sweep fill on hover */}
              <div className="pointer-events-none absolute inset-0 translate-y-full bg-gradient-to-t from-emerald-500/10 to-transparent transition-transform duration-700 group-hover:translate-y-0" />
              <span className="absolute right-5 top-4 font-mono text-5xl font-black text-white/[0.04] transition-colors duration-500 group-hover:text-emerald-400/10">
                0{i + 1}
              </span>

              <div className="relative">
                <div className="relative mb-6 h-14 w-14">
                  <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-400 opacity-20 blur-lg transition-opacity duration-500 group-hover:opacity-60" />
                  <span className="relative grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-zinc-950 transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110">
                    <Icon className="h-6 w-6 text-emerald-300" strokeWidth={1.75} />
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-zinc-100">{title}</h3>
                  <ArrowUpRight className="h-5 w-5 -translate-x-2 translate-y-2 text-emerald-400 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                </div>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{desc}</p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {points.map((p) => (
                    <span key={p} className="rounded-md bg-white/5 px-2 py-1 font-mono text-[11px] text-zinc-400">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interests marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-14"
        >
          <p className="mb-5 text-center text-xs uppercase tracking-widest text-zinc-500">When I&apos;m not coding</p>
          <div className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="flex shrink-0 gap-3 pr-3"
            >
              {[...INTERESTS, ...INTERESTS].map(({ icon: Icon, label }, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-zinc-900/60 px-5 py-2.5 text-sm text-zinc-300"
                >
                  <Icon className="h-4 w-4 text-emerald-400" strokeWidth={1.75} />
                  {label}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}