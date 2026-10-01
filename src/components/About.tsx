"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate, type Variants } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const FACTS = [
  { label: "Based in", value: "Bahawalpur, Pakistan" },
  { label: "University", value: "IUB" },
  { label: "Degree", value: "BS Artificial Intelligence" },
  { label: "Semester", value: "7th · Graduating 2027" },
];

const SERVICES = [
  {
    icon: "🧠",
    title: "Machine Learning",
    desc: "Training and deploying models for vision, speech and NLP.",
  },
  {
    icon: "⚡",
    title: "Full-Stack Web",
    desc: "Fast, scalable apps with Next.js, Node and PostgreSQL.",
  },
  {
    icon: "🎨",
    title: "UI Engineering",
    desc: "Minimal interfaces with motion that feels natural.",
  },
];

const SKILLS = [
  "Python", "TensorFlow", "PyTorch", "Next.js", "React", "TypeScript",
  "Tailwind", "Node.js", "PostgreSQL", "Docker", "FastAPI", "OpenCV",
  "Git", "Figma", "Hugging Face", "MongoDB",
];

const COUNTERS = [
  { to: 3, suffix: "+", label: "Years coding" },
  { to: 1200, suffix: "+", label: "GitHub commits" },
  { to: 8, suffix: "", label: "Certifications" },
];

const card: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: EASE },
  }),
};

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 2,
      ease: EASE,
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

function Card({
  children,
  className = "",
  i = 0,
}: {
  children: React.ReactNode;
  className?: string;
  i?: number;
}) {
  return (
    <motion.div
      custom={i}
      variants={card}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur-sm transition-colors duration-500 hover:border-emerald-400/30 sm:p-8 ${className}`}
    >
      {/* hover glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-emerald-400/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative">{children}</div>
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-zinc-950 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-12 sm:mb-16"
        >
          <p className="mb-3 flex items-center gap-3 font-mono text-sm text-emerald-400">
            <span>01</span>
            <span className="h-px w-10 bg-emerald-400/50" />
            <span>About me</span>
          </p>
          <h2 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-zinc-100 sm:text-5xl">
            Turning ideas into{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              intelligent products.
            </span>
          </h2>
        </motion.div>

        {/* Bento grid */}
        <div className="grid gap-4 md:grid-cols-6">
          {/* Bio */}
          <Card className="md:col-span-4" i={0}>
            <p className="text-xs uppercase tracking-widest text-zinc-500">Who I am</p>
            <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-zinc-400 sm:text-base">
              <p>
                I&apos;m <span className="font-medium text-zinc-100">Ahmed Raza</span>, an AI student
                at The Islamia University of Bahawalpur who loves building things people actually use.
                What started as a GPA calculator for my classmates turned into a habit of shipping
                real products.
              </p>
              <p>
                Right now I&apos;m focused on{" "}
                <span className="text-emerald-300">speech recognition for Urdu</span> and building
                full-stack AI apps. I care about clean code and fast interfaces, and I like to keep
                learning.
              </p>
            </div>
          </Card>

          {/* Quick facts */}
          <Card className="md:col-span-2" i={1}>
            <p className="text-xs uppercase tracking-widest text-zinc-500">Quick facts</p>
            <ul className="mt-4 space-y-4">
              {FACTS.map(({ label, value }) => (
                <li key={label}>
                  <p className="text-xs text-zinc-500">{label}</p>
                  <p className="mt-0.5 text-sm font-medium text-zinc-100">{value}</p>
                </li>
              ))}
            </ul>
          </Card>

          {/* Services */}
          <Card className="md:col-span-6" i={2}>
            <p className="text-xs uppercase tracking-widest text-zinc-500">What I do</p>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {SERVICES.map(({ icon, title, desc }) => (
                <div key={title} className="group/item">
                  <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5 text-2xl transition-transform duration-300 group-hover/item:-translate-y-1 group-hover/item:rotate-6">
                    {icon}
                  </div>
                  <h3 className="font-semibold text-zinc-100">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{desc}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Skills marquee */}
          <Card className="md:col-span-4 !px-0" i={3}>
            <p className="px-6 text-xs uppercase tracking-widest text-zinc-500 sm:px-8">Tech stack</p>
            <div className="mt-6 space-y-3 [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
              {[0, 1].map((row) => {
                const list = row === 0 ? SKILLS.slice(0, 8) : SKILLS.slice(8);
                return (
                  <div key={row} className="flex overflow-hidden">
                    <motion.div
                      animate={{ x: row === 0 ? ["0%", "-50%"] : ["-50%", "0%"] }}
                      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                      className="flex shrink-0 gap-3 pr-3"
                    >
                      {[...list, ...list].map((s, idx) => (
                        <span
                          key={idx}
                          className="whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300"
                        >
                          {s}
                        </span>
                      ))}
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Counters */}
          <Card className="md:col-span-2" i={4}>
            <div className="grid grid-cols-3 gap-4 md:grid-cols-1 md:gap-5">
              {COUNTERS.map(({ to, suffix, label }) => (
                <div key={label}>
                  <p className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
                    <Counter to={to} suffix={suffix} />
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">{label}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}