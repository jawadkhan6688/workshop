"use client";

import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useSpring,
} from "framer-motion";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
     { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });

  // Glass on scroll + hide on scroll down / show on scroll up
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 20);
    setHidden(y > prev && y > 150 && !open);
  });

  // Highlight the section currently in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    NAV_LINKS.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Lock body scroll when menu is open + close on Escape
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-emerald-400 to-cyan-400"
      />

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={hidden ? { y: "-110%", opacity: 1 } : { y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: EASE }}
        className="fixed inset-x-0 top-0 z-50 px-4 pt-4"
      >
        <nav
          className={`mx-auto flex max-w-5xl items-center justify-between rounded-2xl border px-4 py-3 transition-all duration-300 sm:px-6 ${
            scrolled && !open
              ? "border-white/10 bg-zinc-950/70 shadow-lg shadow-black/30 backdrop-blur-xl"
              : "border-transparent bg-transparent"
          }`}
        >
          {/* Logo */}
          <a
            href="#home"
            onClick={() => setOpen(false)}
            className="group relative z-[60] flex items-center gap-2.5"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-400 text-sm font-bold text-zinc-950 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105">
              AR
            </span>
            <span className="font-semibold tracking-tight text-zinc-100">
              Ahmed Raza<span className="text-emerald-400">.</span>
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = active === href;
              return (
                <li key={href}>
                  <a
                    href={href}
                    className={`relative block rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                      isActive ? "text-zinc-950" : "text-zinc-400 hover:text-zinc-100"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative">{label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA */}
          <a
            href="#contact"
            className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-zinc-100 transition-all duration-300 hover:border-emerald-400/50 hover:bg-emerald-400/10 md:flex"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Hire me
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="relative z-[60] grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 backdrop-blur md:hidden"
          >
            <div className="relative h-3.5 w-5">
              <motion.span
                animate={open ? { top: 6, rotate: 45 } : { top: 0, rotate: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="absolute left-0 h-0.5 w-5 rounded-full bg-zinc-100"
              />
              <motion.span
                animate={open ? { opacity: 0, x: 10 } : { opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute left-0 top-1.5 h-0.5 w-3.5 rounded-full bg-emerald-400"
              />
              <motion.span
                animate={open ? { top: 6, rotate: -45 } : { top: 12, rotate: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="absolute left-0 h-0.5 w-5 rounded-full bg-zinc-100"
              />
            </div>
          </button>
        </nav>
      </motion.header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at 90% 44px)" }}
            animate={{ clipPath: "circle(150% at 90% 44px)" }}
            exit={{ clipPath: "circle(0% at 90% 44px)" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col justify-between overflow-hidden bg-zinc-950 px-6 pb-10 pt-28 md:hidden"
          >
            {/* Glow + grid decoration */}
            <div aria-hidden className="pointer-events-none absolute -right-24 top-1/3 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
            <div aria-hidden className="pointer-events-none absolute -left-24 bottom-10 h-60 w-60 rounded-full bg-cyan-500/10 blur-3xl" />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:40px_40px]"
            />

            <ul className="relative space-y-1">
              {NAV_LINKS.map(({ label, href }, i) => {
                const isActive = active === href;
                return (
                  <motion.li
                    key={href}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: 0.15 + i * 0.07, duration: 0.5, ease: EASE } }}
                    exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  >
                    <a
                      href={href}
                      onClick={() => setOpen(false)}
                      className="group flex items-baseline gap-4 py-2"
                    >
                      <span className="font-mono text-xs text-emerald-400/70">0{i + 1}</span>
                      <span
                        className={`text-4xl font-semibold tracking-tight transition-all duration-300 group-hover:translate-x-2 ${
                          isActive ? "text-zinc-100" : "text-zinc-500 group-hover:text-zinc-100"
                        }`}
                      >
                        {label}
                      </span>
                      {isActive && <span className="h-2 w-2 rounded-full bg-emerald-400" />}
                    </a>
                  </motion.li>
                );
              })}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.55, duration: 0.5, ease: EASE } }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              className="relative space-y-6"
            >
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 py-4 font-semibold text-zinc-950 active:scale-[0.98]"
              >
                Let&apos;s work together →
              </a>
              <div className="flex items-center justify-between text-sm text-zinc-500">
                <span>ahmed.raza@iub.edu.pk</span>
                <span>Bahawalpur, PK</span>
              </div>
              <div className="flex gap-3">
                {["GitHub", "LinkedIn", "X"].map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="rounded-full border border-white/10 px-4 py-2 text-xs font-medium text-zinc-400 transition-colors hover:border-emerald-400/50 hover:text-zinc-100"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}