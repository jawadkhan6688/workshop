"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Copy,
  Check,
  Send,
  Loader2,
  CheckCircle2,
  Clock,
  Briefcase,
  Code2,
  Handshake,
  Hand,
  type LucideIcon,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;
const EMAIL = "ahmed.raza@iub.edu.pk";

const TOPICS: { label: string; icon: LucideIcon }[] = [
  { label: "Internship", icon: Briefcase },
  { label: "Freelance", icon: Code2 },
  { label: "Collaboration", icon: Handshake },
  { label: "Just saying hi", icon: Hand },
];

const INFO: { icon: LucideIcon; label: string; value: string; href?: string }[] = [
  { icon: Phone, label: "Phone / WhatsApp", value: "+92 300 1234567", href: "https://wa.me/923001234567" },
  { icon: MapPin, label: "Location", value: "Bahawalpur, Punjab, PK" },
  { icon: Clock, label: "Response time", value: "Usually within 24 hours" },
];

const SOCIALS = [
  {
    name: "GitHub",
    href: "#",
    path: "M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z",
  },
  {
    name: "LinkedIn",
    href: "#",
    path: "M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z",
  },
  {
    name: "X",
    href: "#",
    path: "M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.4l-5.8-7.58-6.63 7.58H.49l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93Zm-1.29 19.5h2.04L6.48 3.24H4.3l13.31 17.41Z",
  },
];

type Status = "idle" | "loading" | "success";

function Field({
  id,
  label,
  type = "text",
  textarea,
  error,
}: {
  id: string;
  label: string;
  type?: string;
  textarea?: boolean;
  error?: string;
}) {
  const base =
    "peer w-full rounded-2xl border bg-zinc-950/60 px-4 pb-2.5 pt-6 text-sm text-zinc-100 outline-none transition-all duration-300 placeholder:text-transparent focus:bg-zinc-950";
  const border = error
    ? "border-rose-400/50 focus:border-rose-400"
    : "border-white/10 focus:border-emerald-400/60 focus:shadow-[0_0_0_4px] focus:shadow-emerald-400/10";

  return (
    <div className="relative">
      {textarea ? (
        <textarea id={id} name={id} rows={5} placeholder={label} className={`${base} ${border} resize-none`} />
      ) : (
        <input id={id} name={id} type={type} placeholder={label} className={`${base} ${border}`} />
      )}
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-4 top-2 text-[11px] font-medium text-zinc-500 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-emerald-400"
      >
        {label}
      </label>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-1.5 pl-1 text-xs text-rose-400"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Contact() {
  const [topic, setTopic] = useState("Internship");
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const copyEmail = async () => {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const next: Record<string, string> = {};
    if (!String(data.get("name")).trim()) next.name = "Please enter your name";
    if (!/^\S+@\S+\.\S+$/.test(String(data.get("email")))) next.email = "Enter a valid email";
    if (String(data.get("message")).trim().length < 10) next.message = "Message should be at least 10 characters";
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("loading");
    // TODO: send to your API route / Resend / Formspree
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("success");
    form.reset();
    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-zinc-950 py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-emerald-500/10 blur-[120px]" />
      <div aria-hidden className="pointer-events-none absolute -left-40 bottom-20 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />

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
            <span>04</span>
            <span className="h-px w-10 bg-emerald-400/50" />
            <span>Contact</span>
          </p>
          <h2 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-zinc-100 sm:text-5xl">
            Let&apos;s build something{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              great together.
            </span>
          </h2>
          <p className="mt-4 max-w-lg text-zinc-400">
            Got an internship, a project idea, or just want to talk about AI? My inbox is always open.
          </p>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-5">
          {/* Left: info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="flex flex-col gap-5 lg:col-span-2"
          >
            {/* Email card */}
            <div className="group relative overflow-hidden rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-emerald-500/15 via-zinc-900/60 to-cyan-500/10 p-6">
              <div className="mb-6 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-400 shadow-lg shadow-emerald-500/30 transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110">
                <Mail className="h-5 w-5 text-zinc-950" />
              </div>
              <p className="text-xs uppercase tracking-widest text-zinc-500">Email me at</p>
              <a href={`mailto:${EMAIL}`} className="mt-1 block break-all text-lg font-semibold text-zinc-100 hover:text-emerald-300">
                {EMAIL}
              </a>
              <button
                onClick={copyEmail}
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-zinc-950/50 px-4 py-2 text-xs font-medium text-zinc-300 transition-all hover:border-emerald-400/40 hover:text-emerald-300 active:scale-95"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {copied ? (
                    <motion.span key="c" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                    </motion.span>
                  ) : (
                    <motion.span key="n" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                      <Copy className="h-3.5 w-3.5" />
                    </motion.span>
                  )}
                </AnimatePresence>
                {copied ? "Copied!" : "Copy email"}
              </button>
            </div>

            {/* Info list */}
            <div className="rounded-3xl border border-white/10 bg-zinc-900/50 p-6">
              <ul className="space-y-5">
                {INFO.map(({ icon: Icon, label, value, href }) => (
                  <li key={label} className="group flex items-center gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5 transition-colors group-hover:border-emerald-400/40 group-hover:bg-emerald-400/10">
                      <Icon className="h-[18px] w-[18px] text-emerald-400" strokeWidth={1.75} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs text-zinc-500">{label}</p>
                      {href ? (
                        <a href={href} className="text-sm font-medium text-zinc-100 hover:text-emerald-300">{value}</a>
                      ) : (
                        <p className="text-sm font-medium text-zinc-100">{value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex gap-2 border-t border-white/5 pt-6">
                {SOCIALS.map(({ name, href, path }) => (
                  <a
                    key={name}
                    href={href}
                    aria-label={name}
                    className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-zinc-400 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/40 hover:bg-emerald-400/10 hover:text-emerald-300"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d={path} /></svg>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur-sm sm:p-8 lg:col-span-3"
          >
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="flex min-h-[460px] flex-col items-center justify-center text-center"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.1 }}
                    className="mb-6 grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 shadow-2xl shadow-emerald-500/40"
                  >
                    <CheckCircle2 className="h-10 w-10 text-zinc-950" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-zinc-100">Message sent!</h3>
                  <p className="mt-2 max-w-xs text-sm text-zinc-400">
                    Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  noValidate
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  {/* Topic chips */}
                  <div>
                    <p className="mb-3 text-sm text-zinc-400">What&apos;s this about?</p>
                    <div className="flex flex-wrap gap-2">
                      {TOPICS.map(({ label, icon: Icon }) => {
                        const active = topic === label;
                        return (
                          <button
                            type="button"
                            key={label}
                            onClick={() => setTopic(label)}
                            className={`relative inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-medium transition-colors ${
                              active
                                ? "border-transparent text-zinc-950"
                                : "border-white/10 text-zinc-400 hover:border-white/20 hover:text-zinc-100"
                            }`}
                          >
                            {active && (
                              <motion.span
                                layoutId="topic-pill"
                                className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"
                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                              />
                            )}
                            <Icon className="relative h-3.5 w-3.5" />
                            <span className="relative">{label}</span>
                          </button>
                        );
                      })}
                    </div>
                    <input type="hidden" name="topic" value={topic} />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field id="name" label="Your name" error={errors.name} />
                    <Field id="email" label="Email address" type="email" error={errors.email} />
                  </div>
                  <Field id="message" label="Tell me about your project..." textarea error={errors.message} />

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 py-4 text-sm font-semibold text-zinc-950 shadow-lg shadow-emerald-500/20 transition-transform active:scale-[0.98] disabled:opacity-80"
                  >
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                    {status === "loading" ? (
                      <>
                        <Loader2 className="relative h-4 w-4 animate-spin" />
                        <span className="relative">Sending...</span>
                      </>
                    ) : (
                      <>
                        <span className="relative">Send message</span>
                        <Send className="relative h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}