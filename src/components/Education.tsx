"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  GraduationCap,
  School,
  BookOpen,
  Calendar,
  MapPin,
  Award,
  Trophy,
  Medal,
  BadgeCheck,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

type Edu = {
  icon: LucideIcon;
  degree: string;
  school: string;
  location: string;
  period: string;
  score: string;
  scoreLabel: string;
  current?: boolean;
  progress?: { done: number; total: number };
  desc: string;
  highlights: string[];
};

const EDUCATION: Edu[] = [
  {
    icon: GraduationCap,
    degree: "BS Artificial Intelligence",
    school: "The Islamia University of Bahawalpur",
    location: "Bahawalpur",
    period: "2023 — 2027",
    score: "3.82",
    scoreLabel: "CGPA / 4.00",
    current: true,
    progress: { done: 7, total: 8 },
    desc: "Focused on deep learning, speech processing and NLP. Final-year project: real-time Urdu speech recognition.",
    highlights: ["Deep Learning", "NLP", "Computer Vision", "Data Structures", "Probability & Stats"],
  },
  {
    icon: School,
    degree: "FSc Pre-Engineering",
    school: "Government Sadiq College",
    location: "Bahawalpur",
    period: "2021 — 2023",
    score: "1046",
    scoreLabel: "Marks / 1100",
    desc: "Studied Mathematics, Physics and Chemistry. Wrote my first Python program here.",
    highlights: ["Mathematics", "Physics", "Computer Club Lead"],
  },
  {
    icon: BookOpen,
    degree: "Matriculation (Science)",
    school: "Bahawalpur Model School",
    location: "Bahawalpur",
    period: "2019 — 2021",
    score: "1082",
    scoreLabel: "Marks / 1100",
    desc: "Science group with Computer Science, plus the school's Math Olympiad team.",
    highlights: ["Computer Science", "Math Olympiad"],
  },
];

const CERTS = [
  { title: "Deep Learning Specialization", org: "DeepLearning.AI", year: "2025" },
  { title: "TensorFlow Developer", org: "Google", year: "2025" },
  { title: "Meta Front-End Developer", org: "Meta · Coursera", year: "2024" },
  { title: "AWS Cloud Practitioner", org: "Amazon Web Services", year: "2024" },
];

const AWARDS: { icon: LucideIcon; title: string; detail: string }[] = [
  { icon: Trophy, title: "1st Place — IUB AI Hackathon", detail: "2025 · UrduVoice prototype" },
  { icon: Medal, title: "Dean's Honor List", detail: "4 consecutive semesters" },
  { icon: Award, title: "Runner-up — NASTP Hackathon", detail: "2024 · CropScan" },
];

function SectionLabel({ n, text }: { n: string; text: string }) {
  return (
    <p className="mb-3 flex items-center gap-3 font-mono text-sm text-emerald-400">
      <span>{n}</span>
      <span className="h-px w-10 bg-emerald-400/50" />
      <span>{text}</span>
    </p>
  );
}

function TimelineItem({ edu, index }: { edu: Edu; index: number }) {
  const { icon: Icon, degree, school, location, period, score, scoreLabel, current, progress, desc, highlights } = edu;

  return (
    <motion.li
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: index * 0.05, ease: EASE }}
      className="relative pl-14 sm:pl-20"
    >
      {/* Node */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.15 }}
        className="absolute left-0 top-0 sm:left-2"
      >
        <div className="relative grid h-11 w-11 place-items-center rounded-2xl border border-emerald-400/30 bg-zinc-950 shadow-[0_0_30px_-5px] shadow-emerald-400/40">
          <Icon className="h-5 w-5 text-emerald-300" strokeWidth={1.75} />
          {current && (
            <span className="absolute -right-1 -top-1 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-zinc-950 bg-emerald-400" />
            </span>
          )}
        </div>
      </motion.div>

      {/* Card */}
      <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-emerald-400/30 sm:p-7">
        <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-emerald-400/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-zinc-500">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" /> {period}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" /> {location}
            </span>
            {current && (
              <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-0.5 font-medium text-emerald-300">
                Currently enrolled
              </span>
            )}
          </div>

          {/* Title + score */}
          <div className="mt-4 flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold tracking-tight text-zinc-100 sm:text-2xl">{degree}</h3>
              <p className="mt-1 text-sm text-zinc-400">{school}</p>
            </div>
            <div className="shrink-0 text-right">
              <p className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
                {score}
              </p>
              <p className="text-[11px] text-zinc-500">{scoreLabel}</p>
            </div>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-zinc-400">{desc}</p>

          {/* Semester progress */}
          {progress && (
            <div className="mt-5">
              <div className="mb-2 flex justify-between text-xs">
                <span className="text-zinc-500">Degree progress</span>
                <span className="font-mono text-zinc-300">
                  Semester {progress.done}/{progress.total}
                </span>
              </div>
              <div className="flex gap-1">
                {Array.from({ length: progress.total }).map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.08, duration: 0.4, ease: EASE }}
                    className={`h-1.5 flex-1 origin-left rounded-full ${
                      i < progress.done
                        ? "bg-gradient-to-r from-emerald-400 to-cyan-400"
                        : i === progress.done
                        ? "animate-pulse bg-emerald-400/30"
                        : "bg-white/10"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Highlights */}
          <div className="mt-5 flex flex-wrap gap-1.5">
            {highlights.map((h) => (
              <span key={h} className="rounded-md bg-white/5 px-2 py-1 font-mono text-[11px] text-zinc-400">
                {h}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.li>
  );
}

export default function Education() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 60%"],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });

  return (
    <section id="education" className="relative overflow-hidden bg-zinc-950 py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-5xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-14 sm:mb-16"
        >
          <SectionLabel n="03" text="Education" />
          <h2 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-zinc-100 sm:text-5xl">
            Where I{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              learned & grew.
            </span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Track */}
          <div className="absolute bottom-0 left-[21px] top-0 w-px bg-white/10 sm:left-[29px]" />
          {/* Animated fill */}
          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute bottom-0 left-[21px] top-0 w-px origin-top bg-gradient-to-b from-emerald-400 via-teal-400 to-cyan-400 shadow-[0_0_12px_1px] shadow-emerald-400/50 sm:left-[29px]"
          />

          <ol className="space-y-8 sm:space-y-10">
            {EDUCATION.map((edu, i) => (
              <TimelineItem key={edu.degree} edu={edu} index={i} />
            ))}
          </ol>
        </div>

        {/* Certifications + Awards */}
        <div className="mt-20 grid gap-5 lg:grid-cols-5">
          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="rounded-3xl border border-white/10 bg-zinc-900/50 p-6 sm:p-7 lg:col-span-3"
          >
            <div className="mb-5 flex items-center gap-2">
              <BadgeCheck className="h-5 w-5 text-emerald-400" />
              <h3 className="font-semibold text-zinc-100">Certifications</h3>
            </div>
            <ul className="divide-y divide-white/5">
              {CERTS.map(({ title, org, year }, i) => (
                <motion.li
                  key={title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: EASE }}
                >
                  <a href="#" className="group flex items-center justify-between gap-4 py-3.5">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-zinc-200 transition-colors group-hover:text-emerald-300">
                        {title}
                      </p>
                      <p className="mt-0.5 text-xs text-zinc-500">{org}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      <span className="font-mono text-xs text-zinc-500">{year}</span>
                      <span className="grid h-7 w-7 place-items-center rounded-full border border-white/10 text-zinc-400 transition-all group-hover:border-emerald-400/40 group-hover:bg-emerald-400/10 group-hover:text-emerald-300">
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:rotate-45" />
                      </span>
                    </div>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Awards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="relative overflow-hidden rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-emerald-500/10 via-zinc-900/60 to-cyan-500/10 p-6 sm:p-7 lg:col-span-2"
          >
            <div className="mb-5 flex items-center gap-2">
              <Trophy className="h-5 w-5 text-emerald-400" />
              <h3 className="font-semibold text-zinc-100">Achievements</h3>
            </div>
            <ul className="space-y-4">
              {AWARDS.map(({ icon: Icon, title, detail }, i) => (
                <motion.li
                  key={title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: EASE }}
                  className="group flex items-start gap-3"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-zinc-950/60 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110">
                    <Icon className="h-[18px] w-[18px] text-amber-300" strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-zinc-100">{title}</p>
                    <p className="mt-0.5 text-xs text-zinc-500">{detail}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}