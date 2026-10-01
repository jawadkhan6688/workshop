"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp, Heart, Clock } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

const SOCIALS = [
  { label: "GitHub", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "X / Twitter", href: "#" },
  { label: "Resume", href: "/resume.pdf" },
];

const NAME = "AHMED RAZA";

function LocalTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Karachi",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }).format(new Date());
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 10_000);
    return () => clearInterval(id);
  }, []);
  return <span className="font-mono">{time || "--:--"}</span>;
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-zinc-950 pt-20">
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-1/2 h-72 w-[700px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-5xl px-6">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <a href="#home" className="inline-flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-400 text-sm font-bold text-zinc-950">
                AR
              </span>
              <span className="font-semibold text-zinc-100">
                Ahmed Raza<span className="text-emerald-400">.</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-400">
              AI student at IUB, building products that make technology work in local languages.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-400">
              <Clock className="h-3.5 w-3.5 text-emerald-400" />
              Bahawalpur · <LocalTime />
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="mb-4 text-xs uppercase tracking-widest text-zinc-500">Navigate</p>
            <ul className="space-y-2.5">
              {LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="group inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-zinc-100">
                    <span className="h-px w-0 bg-emerald-400 transition-all duration-300 group-hover:w-4" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <p className="mb-4 text-xs uppercase tracking-widest text-zinc-500">Connect</p>
            <ul className="space-y-2.5">
              {SOCIALS.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="group inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-zinc-100">
                    <span className="h-px w-0 bg-emerald-400 transition-all duration-300 group-hover:w-4" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col-reverse items-center justify-between gap-4 border-t border-white/5 py-6 sm:flex-row">
          <p className="flex items-center gap-1.5 text-xs text-zinc-500">
            © {new Date().getFullYear()} Ahmed Raza · Made with
            <Heart className="h-3 w-3 fill-rose-400 text-rose-400" />
            in Bahawalpur
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-zinc-300 transition-all hover:border-emerald-400/40 hover:text-emerald-300 active:scale-95"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>

      {/* Giant name reveal */}
      <div className="relative select-none overflow-hidden px-2" aria-hidden>
        <div className="flex justify-center">
          {NAME.split("").map((ch, i) => (
            <motion.span
              key={i}
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: "18%", opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.05, ease: EASE }}
              className="bg-gradient-to-b from-zinc-700 to-zinc-950 bg-clip-text text-[15vw] font-black leading-none tracking-tighter text-transparent md:text-[13vw] lg:text-[160px]"
            >
              {ch === " " ? "\u00A0" : ch}
            </motion.span>
          ))}
        </div>
      </div>
    </footer>
  );
}