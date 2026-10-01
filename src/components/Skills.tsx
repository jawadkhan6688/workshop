"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Brain,
  Layout,
  Server,
  Wrench,
  Sparkles,
  Users,
  MessageSquare,
  Lightbulb,
  Timer,
  Target,
  Rocket,
  type LucideIcon,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

type Accent = {
  text: string;
  bar: string;
  glow: string;
  ring: string;
  border: string;
  bg: string;
};

const ACCENTS: Record<string, Accent> = {
  emerald: {
    text: "text-emerald-300",
    bar: "from-emerald-400 to-teal-300",
    glow: "bg-emerald-400/15",
    ring: "#34d399",
    border: "hover:border-emerald-400/40",
    bg: "bg-emerald-400/10 border-emerald-400/20",
  },
  cyan: {
    text: "text-cyan-300",
    bar: "from-cyan-400 to-sky-300",
    glow: "bg-cyan-400/15",
    ring: "#22d3ee",
    border: "hover:border-cyan-400/40",
    bg: "bg-cyan-400/10 border-cyan-400/20",
  },
  violet: {
    text: "text-violet-300",
    bar: "from-violet-400 to-fuchsia-300",
    glow: "bg-violet-400/15",
    ring: "#a78bfa",
    border: "hover:border-violet-400/40",
    bg: "bg-violet-400/10 border-violet-400/20",
  },
  amber: {
    text: "text-amber-300",
    bar: "from-amber-400 to-orange-300",
    glow: "bg-amber-400/15",
    ring: "#fbbf24",
    border: "hover:border-amber-400/40",
    bg: "bg-amber-400/10 border-amber-400/20",
  },
};

type Category = {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  accent: keyof typeof ACCENTS;
  overall: number;
  skills: { name: string; level: number; years: string }[];
};

const CATEGORIES: Category[] = [
  {
    title: "AI / Machine Learning",
    subtitle: "Models that see, hear & understand",
    icon: Brain,
    accent: "emerald",
    overall: 90,
    skills: [
      { name: "Python", level: 95, years: "4 yrs" },
      { name: "PyTorch", level: 88, years: "2 yrs" },
      { name: "TensorFlow / Keras", level: 85, years: "3 yrs" },
      { name: "Hugging Face", level: 82, years: "2 yrs" },
      { name: "OpenCV", level: 78, years: "2 yrs" },
    ],
  },
  {
    title: "Frontend",
    subtitle: "Fast, minimal & animated UIs",
    icon: Layout,
    accent: "cyan",
    overall: 88,
    skills: [
      { name: "React / Next.js", level: 92, years: "3 yrs" },
      { name: "TypeScript", level: 86, years: "2 yrs" },
      { name: "Tailwind CSS", level: 94, years: "3 yrs" },
      { name: "Framer Motion", level: 80, years: "1 yr" },
      { name: "React Native", level: 72, years: "1 yr" },
    ],
  },
  {
    title: "Backend & Data",
    subtitle: "APIs, databases & pipelines",
    icon: Server,
    accent: "violet",
    overall: 80,
    skills: [
      { name: "FastAPI", level: 87, years: "2 yrs" },
      { name: "Node.js / Express", level: 80, years: "2 yrs" },
      { name: "PostgreSQL", level: 78, years: "2 yrs" },
      { name: "MongoDB", level: 75, years: "2 yrs" },
      { name: "Prisma ORM", level: 74, years: "1 yr" },
    ],
  },
  {
    title: "DevOps & Tools",
    subtitle: "Ship, deploy & collaborate",
    icon: Wrench,
    accent: "amber",
    overall: 72,
    skills: [
      { name: "Git & GitHub", level: 92, years: "4 yrs" },
      { name: "Docker", level: 76, years: "1 yr" },
      { name: "Linux / Bash", level: 74, years: "2 yrs" },
      { name: "Vercel / AWS", level: 70, years: "1 yr" },
      { name: "Figma", level: 68, years: "2 yrs" },
    ],
  },
];

const SOFT: { icon: LucideIcon; label: string }[] = [
  { icon: Users, label: "Team leadership" },
  { icon: MessageSquare, label: "Communication" },
  { icon: Lightbulb, label: "Problem solving" },
  { icon: Timer, label: "Time management" },
  { icon: Target, label: "Ownership" },
  { icon: Rocket, label: "Fast learner" },
];

const LEARNING = ["Rust", "LLM fine-tuning", "Kubernetes", "WebGPU"];

function levelLabel(n: number) {
  if (n >= 90) return "Expert";
  if (n >= 80) return "Advanced";
  if (n >= 70) return "Proficient";
  return "Intermediate";
}

/* ---------- Radial ring ---------- */
function Ring({ cat, index }: { cat: Category; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const a = ACCENTS[cat.accent];
  const Icon = cat.icon;
  const r = 42;
  const c = 2 * Math.PI * r;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
      className={`group flex flex-col items-center rounded-3xl border border-white/10 bg-zinc-900/50 p-5 transition-all duration-500 hover:-translate-y-1 ${a.border}`}
    >
      <div className="relative h-24 w-24 sm:h-28 sm:w-28">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
          <motion.circle
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke={a.ring}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            animate={inView ? { strokeDashoffset: c * (1 - cat.overall / 100) } : {}}
            transition={{ duration: 1.6, delay: 0.2 + index * 0.1, ease: EASE }}
            style={{ filter: `drop-shadow(0 0 6px ${a.ring}80)` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Icon className={`h-5 w-5 ${a.text} transition-transform duration-500 group-hover:scale-125`} strokeWidth={1.75} />
          <span className="mt-1 text-lg font-bold text-zinc-100">{cat.overall}%</span>
        </div>
      </div>
      <p className="mt-3 text-center text-sm font-medium text-zinc-200">{cat.title.split(" ")[0]}</p>
    </motion.div>
  );
}

/* ---------- Skill bar ---------- */
function SkillBar({
  name,
  level,
  years,
  accent,
  index,
}: {
  name: string;
  level: number;
  years: string;
  accent: Accent;
  index: number;
}) {
  return (
    <div className="group/bar">
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-medium text-zinc-200">{name}</span>
        <span className="flex items-center gap-2 text-xs">
          <span className="text-zinc-500 opacity-0 transition-opacity duration-300 group-hover/bar:opacity-100">
            {years}
          </span>
          <span className={`rounded-md border px-1.5 py-0.5 text-[10px] font-medium ${accent.bg} ${accent.text}`}>
            {levelLabel(level)}
          </span>
        </span>
      </div>
      <div className="relative h-2 overflow-hidden rounded-full bg-white/5">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2 + index * 0.08, ease: EASE }}
          className={`relative h-full rounded-full bg-gradient-to-r ${accent.bar}`}
        >
          {/* shimmer */}
          <motion.span
            animate={{ x: ["-100%", "250%"] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 1.5 + index * 0.2 }}
            className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent"
          />
        </motion.div>
      </div>
    </div>
  );
}

/* ---------- Category card ---------- */
function CategoryCard({ cat, index }: { cat: Category; index: number }) {
  const a = ACCENTS[cat.accent];
  const Icon = cat.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: (index % 2) * 0.1, ease: EASE }}
      className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur-sm transition-colors duration-500 sm:p-7 ${a.border}`}
    >
      <div className={`pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full ${a.glow} opacity-40 blur-3xl transition-opacity duration-500 group-hover:opacity-100`} />

      <div className="relative">
        <div className="mb-6 flex items-center gap-4">
          <span className={`grid h-12 w-12 place-items-center rounded-2xl border ${a.bg} transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110`}>
            <Icon className={`h-5 w-5 ${a.text}`} strokeWidth={1.75} />
          </span>
          <div>
            <h3 className="font-semibold text-zinc-100">{cat.title}</h3>
            <p className="text-xs text-zinc-500">{cat.subtitle}</p>
          </div>
        </div>

        <div className="space-y-5">
          {cat.skills.map((s, i) => (
            <SkillBar key={s.name} {...s} accent={a} index={i} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden bg-zinc-950 py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet-500/5 blur-[120px]" />

      <div className="relative mx-auto max-w-5xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-12 sm:mb-16"
        >
          <p className="mb-3 flex items-center gap-3 font-mono text-sm text-emerald-400">
            <span>02</span>
            <span className="h-px w-10 bg-emerald-400/50" />
            <span>Skills</span>
          </p>
          <h2 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-zinc-100 sm:text-5xl">
            My{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              technical toolkit.
            </span>
          </h2>
          <p className="mt-4 max-w-lg text-zinc-400">
            The tools I use to go from idea to working product. Hover over a skill to see how long I&apos;ve used it.
          </p>
        </motion.div>

        {/* Overview rings */}
        <div className="mb-5 grid grid-cols-2 gap-4 md:grid-cols-4">
          {CATEGORIES.map((cat, i) => (
            <Ring key={cat.title} cat={cat} index={i} />
          ))}
        </div>

        {/* Category cards */}
        <div className="grid gap-5 md:grid-cols-2">
          {CATEGORIES.map((cat, i) => (
            <CategoryCard key={cat.title} cat={cat} index={i} />
          ))}
        </div>

        {/* Soft skills + learning */}
        <div className="mt-5 grid gap-5 md:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="rounded-3xl border border-white/10 bg-zinc-900/50 p-6 sm:p-7 md:col-span-3"
          >
            <p className="mb-5 text-xs uppercase tracking-widest text-zinc-500">Beyond code</p>
            <div className="flex flex-wrap gap-2.5">
              {SOFT.map(({ icon: Icon, label }, i) => (
                <motion.span
                  key={label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.06, type: "spring", stiffness: 260, damping: 18 }}
                  whileHover={{ y: -3 }}
                  className="inline-flex cursor-default items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-zinc-300 transition-colors hover:border-emerald-400/40 hover:text-zinc-100"
                >
                  <Icon className="h-4 w-4 text-emerald-400" strokeWidth={1.75} />
                  {label}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="relative overflow-hidden rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-emerald-500/10 via-zinc-900/60 to-cyan-500/10 p-6 sm:p-7 md:col-span-2"
          >
            <div className="mb-5 flex items-center gap-2">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="h-4 w-4 text-emerald-400" />
              </motion.span>
              <p className="text-xs uppercase tracking-widest text-zinc-400">Currently learning</p>
            </div>
            <ul className="space-y-3">
              {LEARNING.map((l, i) => (
                <motion.li
                  key={l}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.5, ease: EASE }}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-zinc-200">{l}</span>
                  <span className="flex gap-1">
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{ duration: 1.4, repeat: Infinity, delay: d * 0.2 + i * 0.1 }}
                        className="h-1.5 w-1.5 rounded-full bg-emerald-400"
                      />
                    ))}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}