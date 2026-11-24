import { ArrowUpRight, Check, Copy, FileDown } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import { useToast } from '../context/ToastContext'
import { HONOURS, PROFILE, TOOLS, type HonourId } from '../data/portfolio'
import { HonourMedallion, ToolMark } from './fx/ToolMarks'
import { Magnetic } from './ui/Magnetic'
import { GithubMark, LinkedinMark, PubDevMark } from './ui/SocialIcons'

const YEAR = new Date().getFullYear()

export function SlideThreeClosing() {
  const { showToast } = useToast()
  const reduced = useReducedMotion() ?? false
  const [activeHonour, setActiveHonour] = useState<HonourId | null>(null)
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email)
    } catch {
      // Clipboard fallback
    }
    setCopied(true)
    showToast(`${PROFILE.email} copied`)
    window.setTimeout(() => setCopied(false), 2200)
  }

  return (
    <footer
      id="craft"
      aria-labelledby="craft-heading"
      className="relative flex min-h-[100svh] flex-col justify-between border-t border-line bg-canvas px-6 pt-24 pb-10 sm:px-10 sm:pt-28 lg:px-[7vw]"
    >
      <div className="mx-auto w-full max-w-[1360px]">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">03 · Craft &amp; Contact</p>
            <h2
              id="craft-heading"
              className="mt-3 font-display text-4xl leading-[1.0] font-semibold tracking-[-0.045em] text-ink sm:text-5xl lg:text-6xl"
            >
              Tools, honours <span className="font-serif font-normal text-muted italic">&amp; next.</span>
            </h2>
          </div>
          <p className="font-mono text-[11px] tracking-[0.06em] text-subtle">{PROFILE.education}</p>
        </div>

        {/* Tools + Honours illustration-first grid */}
        <div className="mt-12 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          {/* Illustrated Tools */}
          <div>
            <p className="mb-4 font-mono text-[11px] tracking-[0.16em] text-subtle uppercase">Tools</p>
            <div className="grid grid-cols-4 gap-3">
              {TOOLS.map((tool, idx) => (
                <motion.div
                  key={tool.id}
                  initial={reduced ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: idx * 0.03 }}
                  className="group flex flex-col items-center justify-center gap-2.5 rounded-2xl border border-line bg-surface/65 px-2 py-5 text-ink transition-colors hover:border-line-strong hover:bg-surface"
                >
                  <ToolMark
                    id={tool.id}
                    className="h-6 w-6 opacity-80 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:opacity-100"
                  />
                  <span className="font-mono text-[10px] tracking-[0.04em] text-muted group-hover:text-ink">
                    {tool.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Illustrated Honours with on-demand 1-line detail */}
          <div>
            <p className="mb-4 font-mono text-[11px] tracking-[0.16em] text-subtle uppercase">Honours</p>
            <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface/65">
              {HONOURS.map((honour) => {
                const open = activeHonour === honour.id
                return (
                  <div key={honour.id}>
                    <button
                      type="button"
                      aria-expanded={open}
                      onClick={() => setActiveHonour(open ? null : honour.id)}
                      className="group flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-ink/[0.03]"
                    >
                      <div className="flex items-center gap-4">
                        <HonourMedallion
                          id={honour.id}
                          className="h-11 w-11 shrink-0 text-ink opacity-85 transition-transform duration-300 group-hover:scale-105"
                        />
                        <div>
                          <p className="font-display text-base font-semibold tracking-[-0.02em] text-ink sm:text-lg">
                            {honour.title}
                          </p>
                          <p className="font-mono text-[11px] text-muted">{honour.badge}</p>
                        </div>
                      </div>

                      <span className="font-mono text-[11px] text-subtle transition-colors group-hover:text-ink">
                        {open ? '−' : '+'}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          initial={reduced ? false : { height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={reduced ? undefined : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.24, ease: [0.2, 0.7, 0.2, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-3 px-5 pb-4 pl-[5rem] text-xs leading-5 text-muted sm:text-sm">
                            <span>{honour.detail}</span>
                            {honour.href && (
                              <a
                                href={honour.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 border-b border-line-strong pb-0.5 font-mono text-[11px] text-ink hover:border-ink"
                              >
                                Commits
                                <ArrowUpRight className="h-3 w-3" />
                              </a>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom closing dock: Download CV + Contact */}
      <div className="mx-auto mt-16 w-full max-w-[1360px]">
        <div className="flex flex-col justify-between gap-6 border-t border-line pt-8 lg:flex-row lg:items-center">
          <div>
            <p className="font-display text-xl font-medium tracking-[-0.03em] text-ink sm:text-2xl">
              Available for <span className="font-serif font-normal text-muted italic">thoughtful engineering.</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Magnetic>
              <a
                href={PROFILE.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-xs font-semibold text-canvas transition-transform active:scale-[0.97] sm:text-sm"
              >
                <FileDown className="h-4 w-4" />
                Download CV
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </Magnetic>

            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-line-strong bg-surface px-4 py-3 font-mono text-xs text-ink transition-colors hover:bg-elevated"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5 text-muted" />}
              <span>{copied ? 'Copied' : PROFILE.email}</span>
            </button>

            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-muted transition-colors hover:border-line-strong hover:text-ink"
            >
              <GithubMark className="h-4 w-4" />
            </a>

            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-muted transition-colors hover:border-line-strong hover:text-ink"
            >
              <LinkedinMark className="h-4 w-4" />
            </a>

            <a
              href={PROFILE.pubdev}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="pub.dev"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-muted transition-colors hover:border-line-strong hover:text-ink"
            >
              <PubDevMark className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-line pt-6 font-mono text-[11px] text-subtle">
          <span>
            © {YEAR} {PROFILE.name} · {PROFILE.location}
          </span>
          <a href="#work" className="transition-colors hover:text-ink">
            Top ↑
          </a>
        </div>
      </div>
    </footer>
  )
}
