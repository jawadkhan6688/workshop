"use client";

import { useState, type MouseEvent } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import {
  Mic,
  Calculator,
  Leaf,
  Users,
  Bot,
  Smartphone,
  ArrowUpRight,
  Star,
  TrendingUp,
  LayoutGrid,
  Brain,
  Globe,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

type Category = "All" | "AI / ML" | "Web" | "Mobile";

const FILTERS: { label: Category; icon: LucideIcon }[] = [
  { label: "All", icon: LayoutGrid },
  { label: "AI / ML", icon: Brain },
  { label: "Web", icon: Globe },
  { label: "Mobile", icon: Smartphone },
];

type Project = {
  title: string;
  tagline: string;
  desc: string;
  category: Exclude<Category, "All">;
  icon: LucideIcon;
  gradient: string;
  metric: string;
  tags: string[];
  year: string;
  featured?: boolean;
  github: string;
  live?: string;
};

const PROJECTS: Project[] = [
  {
    title: "UrduVoice",
    tagline: "Speech recognition for Urdu",
    desc: "A fine-tuned Whisper model that transcribes Urdu speech in real time, trained on 300+ hours of local audio. It also handles mixed Urdu-English speech.",
    category: "AI / ML",
    icon: Mic,
    gradient: "from-emerald-500/30 via-teal-500/10 to-transparent",
    metric: "11.4% WER",
    tags: ["PyTorch", "Whisper", "FastAPI", "Next.js"],
    year: "2026",
    featured: true,
    github: "#",
    live: "#",
  },
  {
    title: "IUB GPA Calculator",
    tagline: "Built for my classmates",
    desc: "Calculates semester and cumulative GPA using IUB's grading rules. Used by students across departments.",
    category: "Web",
    icon: Calculator,
    gradient: "from-cyan-500/30 via-sky-500/10 to-transparent",
    metric: "2.1k users",
    tags: ["React", "Tailwind", "Vercel"],
    year: "2023",
    github: "#",
    live: "#",
  },
  {
    title: "CropScan",
    tagline: "Plant disease detection",
    desc: "A CNN that detects 38 crop diseases from a leaf photo, aimed at farmers in South Punjab.",
    category: "AI / ML",
    icon: Leaf,
    gradient: "from-lime-500/30 via-emerald-500/10 to-transparent",
    metric: "96% accuracy",
    tags: ["TensorFlow", "OpenCV", "Flask"],
    year: "2025",
    github: "#",
  },
  {
    title: "CampusConnect",
    tagline: "Student marketplace",
    desc: "Lets students buy and sell books, notes and gadgets, with verified university emails and in-app chat.",
    category: "Web",
    icon: Users,
    gradient: "from-violet-500/30 via-indigo-500/10 to-transparent",
    metric: "450+ listings",
    tags: ["Next.js", "PostgreSQL", "Prisma"],
    year: "2025",
    github: "#",
    live: "#",
  },
  {
    title: "MediBot",
    tagline: "RAG health assistant",
    desc: "A chatbot that answers medical questions from verified sources and cites every answer. It runs on a RAG pipeline.",
    category: "AI / ML",
    icon: Bot,
    gradient: "from-rose-500/30 via-pink-500/10 to-transparent",
    metric: "0.89 faithfulness",
    tags: ["LangChain", "Pinecone", "OpenAI"],
    year: "2026",
    github: "#",
  },
  {
    title: "FocusFlow",
    tagline: "Study planner app",
    desc: "A Pomodoro timer combined with exam planning. It works offline and syncs when the phone is back online.",
    category: "Mobile",
    icon: Smartphone,
    gradient: "from-amber-500/30 via-orange-500/10 to-transparent",
    metric: "4.8★ rating",
    tags: ["React Native", "Expo", "Firebase"],
    year: "2024",
    github: "#",
    live: "#",
  },
];

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const { title, tagline, desc, icon: Icon, gradient, metric, tags, year, featured, github, live } = project;

  // 3D tilt + spotlight
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 200, damping: 20 });
  const spotX = useTransform(mx, (v) => `${v * 100}%`);
  const spotY = useTransform(my, (v) => `${v * 100}%`);
  const spotlight = useMotionTemplate`radial-gradient(400px circle at ${spotX} ${spotY}, rgba(52,211,153,0.12), transparent 60%)`;

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 30 }}
      transition={{ duration: 0.5, ease: EASE }}
      className={`[perspective:1200px] ${featured ? "md:col-span-2" : ""}`}
    >
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/60 transition-colors duration-500 hover:border-emerald-400/30"
      >
        {/* Spotlight */}
        <motion.div
          style={{ background: spotlight }}
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />

        {/* Visual header */}
        <div className={`relative h-44 overflow-hidden bg-gradient-to-br ${gradient} ${featured ? "md:h-56" : ""}`}>
          <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:24px_24px]" />

          {/* Orbits */}
          <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 transition-transform duration-700 group-hover:scale-125" />
          <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5 transition-transform duration-700 group-hover:scale-110" />

          {/* Icon */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ transform: "translateZ(40px)" }}>
            <div className="grid h-16 w-16 place-items-center rounded-2xl border border-white/15 bg-zinc-950/60 shadow-2xl backdrop-blur-md transition-all duration-500 group-hover:-translate-y-2 group-hover:rotate-6 group-hover:border-emerald-400/40">
              <Icon className="h-7 w-7 text-zinc-100 transition-colors duration-500 group-hover:text-emerald-300" strokeWidth={1.75} />
            </div>
          </div>

          {/* Badges */}
          <div className="absolute left-4 top-4 flex gap-2">
            {featured && (
              <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 px-2.5 py-1 text-[11px] font-semibold text-zinc-950">
                <Star className="h-3 w-3 fill-current" /> Featured
              </span>
            )}
          </div>
          <span className="absolute right-4 top-4 rounded-full border border-white/10 bg-zinc-950/50 px-2.5 py-1 font-mono text-[11px] text-zinc-300 backdrop-blur">
            {year}
          </span>
        </div>

        {/* Body */}
        <div className="relative flex flex-1 flex-col p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-medium text-emerald-400">{tagline}</p>
              <h3 className="mt-1 text-xl font-bold tracking-tight text-zinc-100">{title}</h3>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[11px] font-medium text-emerald-300">
              <TrendingUp className="h-3 w-3" /> {metric}
            </span>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-zinc-400">{desc}</p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {tags.map((t) => (
              <span key={t} className="rounded-md bg-white/5 px-2 py-1 font-mono text-[11px] text-zinc-400">
                {t}
              </span>
            ))}
          </div>

          <div className="mt-auto flex items-center gap-2 pt-6">
            <a
              href={github}
              aria-label={`${title} source code`}
              className="relative z-20 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-zinc-200 transition-all hover:border-white/25 hover:bg-white/10 active:scale-95"
            >
              <GithubIcon className="h-3.5 w-3.5" /> Code
            </a>
            {live && (
              <a
                href={live}
                aria-label={`${title} live demo`}
                className="group/btn relative z-20 inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-4 py-2 text-xs font-semibold text-zinc-950 transition-all hover:bg-emerald-300 active:scale-95"
              >
                Live demo
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}

export default function Projects() {
  const [active, setActive] = useState<Category>("All");
  const filtered = active === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === active);

  return (
    <section id="projects" className="relative overflow-hidden bg-zinc-950 py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-40 h-96 w-[600px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-5xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-10 flex flex-col gap-6 sm:mb-12 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="mb-3 flex items-center gap-3 font-mono text-sm text-emerald-400">
              <span>02</span>
              <span className="h-px w-10 bg-emerald-400/50" />
              <span>Projects</span>
            </p>
            <h2 className="max-w-xl text-4xl font-bold leading-tight tracking-tight text-zinc-100 sm:text-5xl">
              Things I&apos;ve{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                built & shipped.
              </span>
            </h2>
          </div>
          <p className="flex items-center gap-2 text-sm text-zinc-500">
            <Sparkles className="h-4 w-4 text-emerald-400" />
            {PROJECTS.length} projects · 3 in production
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          className="-mx-6 mb-8 overflow-x-auto px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="inline-flex gap-1 rounded-full border border-white/10 bg-zinc-900/60 p-1 backdrop-blur">
            {FILTERS.map(({ label, icon: Icon }) => {
              const isActive = active === label;
              const count = label === "All" ? PROJECTS.length : PROJECTS.filter((p) => p.category === label).length;
              return (
                <button
                  key={label}
                  onClick={() => setActive(label)}
                  className={`relative inline-flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isActive ? "text-zinc-950" : "text-zinc-400 hover:text-zinc-100"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Icon className="relative h-4 w-4" />
                  <span className="relative">{label}</span>
                  <span className={`relative rounded-full px-1.5 text-[10px] ${isActive ? "bg-zinc-950/15" : "bg-white/10"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <ProjectCard key={p.title} project={p} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 flex justify-center"
        >
          <a
            href="https://github.com"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-zinc-100 transition-all hover:border-emerald-400/40 hover:bg-emerald-400/10 active:scale-95"
          >
            <GithubIcon className="h-4 w-4" />
            See more on GitHub
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}