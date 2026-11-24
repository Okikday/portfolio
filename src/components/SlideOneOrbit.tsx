import { ArrowDown, ArrowUpRight, X } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ORBIT_PROJECTS, PROFILE, type OrbitProject } from '../data/portfolio'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { GravityGrid } from './fx/GravityGrid'
import { ProjectIcon } from './fx/ProjectIcons'
import { Monogram } from './ui/Monogram'

export function SlideOneOrbit() {
  const wide = useMediaQuery('(min-width: 1024px)')
  const reduced = useReducedMotion() ?? false
  const [selected, setSelected] = useState<OrbitProject | null>(null)
  const [indexOpen, setIndexOpen] = useState(false)
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  const core: [number, number] = wide ? [0.63, 0.5] : [0.5, 0.39]
  const anyModalOpen = selected !== null || indexOpen

  useEffect(() => {
    if (!anyModalOpen) return
    const prevFocus = document.activeElement
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeBtnRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelected(null)
        setIndexOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      if (prevFocus instanceof HTMLElement) prevFocus.focus()
    }
  }, [anyModalOpen])

  return (
    <>
      <section
        id="work"
        aria-label="Okikiola Gbeleyi — Selected Projects Orbit"
        className="relative isolate h-[100svh] min-h-[680px] overflow-hidden bg-canvas"
      >
        {/* Subtle neutral radial ambience behind the well */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: wide
              ? 'radial-gradient(50vmax 50vmax at 63% 50%, color-mix(in oklab, var(--fg-ink) 7%, transparent), transparent 68%)'
              : 'radial-gradient(46vmax 46vmax at 50% 39%, color-mix(in oklab, var(--fg-ink) 7%, transparent), transparent 68%)',
          }}
        />

        {/* Neutral spacetime-curvature GravityGrid + orbiting project medallions */}
        <GravityGrid
          className="h-full w-full"
          center={core}
          scale={wide ? 0.31 : 0.25}
          riders={ORBIT_PROJECTS.length}
          riderFlow={1 / 14}
          riderScale={wide ? 1.06 : 0.84}
          still={reduced}
          active={!anyModalOpen}
          renderRider={(index) => {
            const project = ORBIT_PROJECTS[index]
            if (!project) return null
            return (
              <button
                type="button"
                onClick={() => setSelected(project)}
                aria-label={`Inspect ${project.title}: ${project.tag}`}
                className="group flex w-36 cursor-pointer flex-col items-center gap-2 text-center"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full border border-line-strong bg-surface/90 text-ink shadow-[0_14px_38px_-14px_rgba(0,0,0,0.65)] backdrop-blur-md transition-transform duration-300 group-hover:scale-110 group-hover:border-ink/45">
                  <ProjectIcon id={project.id} className="h-6 w-6 opacity-90" />
                </span>
                <span className="rider-label block">
                  <span className="block font-display text-[13px] leading-tight font-medium text-ink">
                    {project.title}
                  </span>
                  <span className="mt-0.5 block font-mono text-[10px] text-muted">{project.tag}</span>
                </span>
              </button>
            )
          }}
        />

        {/* Gravity-well core hub button */}
        <motion.button
          type="button"
          onClick={() => setIndexOpen(true)}
          aria-haspopup="dialog"
          aria-label={`Open index of all ${ORBIT_PROJECTS.length} projects`}
          whileHover={reduced ? undefined : { scale: 1.07 }}
          whileTap={reduced ? undefined : { scale: 0.96 }}
          style={{ left: `${core[0] * 100}%`, top: `${core[1] * 100}%` }}
          className="glass-pill absolute z-[200] flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-line-strong text-ink shadow-[0_0_70px_rgba(0,0,0,0.35)] sm:h-28 sm:w-28"
        >
          <Monogram className="h-11 w-11 opacity-90 sm:h-12 sm:w-12" />
          <span className="absolute -bottom-7 font-mono text-[11px] whitespace-nowrap text-muted">
            {ORBIT_PROJECTS.length} works
          </span>
        </motion.button>

        {/* Minimal foreground identity */}
        <div className="pointer-events-none absolute inset-x-0 bottom-[8%] mx-auto w-full max-w-[1360px] px-6 sm:px-10 lg:top-1/2 lg:bottom-auto lg:-translate-y-1/2 lg:px-[7vw]">
          <div className="max-w-md">
            <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
              {PROFILE.role} · {PROFILE.shortLocation}
            </p>

            <h1 className="mt-4 font-display text-[clamp(3rem,6.8vw,6rem)] leading-[0.9] font-semibold tracking-[-0.05em] text-ink">
              {PROFILE.firstName}
              <br />
              <span className="font-serif font-normal text-muted italic">{PROFILE.lastName}.</span>
            </h1>

            <div className="pointer-events-auto mt-7 flex items-center gap-5">
              <button
                type="button"
                onClick={() => setIndexOpen(true)}
                className="cursor-pointer border-b border-line-strong pb-1 font-mono text-[11px] tracking-[0.08em] text-ink uppercase transition-colors hover:border-ink"
              >
                Index ({ORBIT_PROJECTS.length})
              </button>

              <a
                href="#journey"
                className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.08em] text-muted uppercase transition-colors hover:text-ink"
              >
                Journey
                <ArrowDown className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {createPortal(
        <AnimatePresence>
          {selected && (
            <motion.div
              key="project-detail"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.2 }}
              onMouseDown={(e) => e.target === e.currentTarget && setSelected(null)}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
            >
              <motion.section
                role="dialog"
                aria-modal="true"
                aria-labelledby="project-modal-title"
                initial={reduced ? false : { opacity: 0, y: 20, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduced ? undefined : { opacity: 0, y: 12, scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 280, damping: 28 }}
                className="relative w-full max-w-md rounded-[1.75rem] border border-line-strong bg-surface p-7 text-ink shadow-2xl sm:p-8"
              >
                <button
                  ref={closeBtnRef}
                  type="button"
                  aria-label="Close"
                  onClick={() => setSelected(null)}
                  className="absolute top-5 right-5 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-ink"
                >
                  <X className="h-4 w-4" />
                </button>

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-line bg-elevated text-ink">
                  <ProjectIcon id={selected.id} className="h-7 w-7" />
                </div>

                <p className="mt-6 font-mono text-[11px] tracking-[0.12em] text-muted uppercase">{selected.tag}</p>
                <h2 id="project-modal-title" className="mt-1.5 font-display text-2xl font-semibold tracking-[-0.03em]">
                  {selected.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted">{selected.summary}</p>

                {selected.href && (
                  <a
                    href={selected.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 rounded-full border border-line-strong bg-elevated px-4 py-2 text-xs font-medium text-ink transition-colors hover:bg-ink hover:text-canvas"
                  >
                    {selected.linkLabel ?? 'Open'}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                )}
              </motion.section>
            </motion.div>
          )}

          {indexOpen && (
            <motion.div
              key="project-index"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.2 }}
              onMouseDown={(e) => e.target === e.currentTarget && setIndexOpen(false)}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md sm:p-8"
            >
              <motion.section
                role="dialog"
                aria-modal="true"
                aria-labelledby="index-modal-title"
                initial={reduced ? false : { opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduced ? undefined : { opacity: 0, y: 14, scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                className="flex max-h-[min(84svh,760px)] w-full max-w-2xl flex-col overflow-hidden rounded-[1.75rem] border border-line-strong bg-surface text-ink shadow-2xl"
              >
                <header className="flex items-center justify-between border-b border-line px-6 py-5 sm:px-8">
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">Archive</p>
                    <h2 id="index-modal-title" className="mt-1 font-display text-2xl font-semibold tracking-[-0.03em]">
                      Orbiting Works
                    </h2>
                  </div>
                  <button
                    ref={closeBtnRef}
                    type="button"
                    aria-label="Close"
                    onClick={() => setIndexOpen(false)}
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-ink"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </header>

                <ul className="divide-y divide-line overflow-y-auto px-6 py-2 sm:px-8">
                  {ORBIT_PROJECTS.map((project) => (
                    <li key={project.id} className="flex items-start justify-between gap-4 py-5">
                      <div className="flex items-start gap-4">
                        <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-elevated text-ink">
                          <ProjectIcon id={project.id} className="h-5 w-5" />
                        </span>
                        <div>
                          <div className="flex flex-wrap items-center gap-2.5">
                            <span className="font-display text-base font-semibold tracking-[-0.02em]">
                              {project.title}
                            </span>
                            <span className="font-mono text-[10px] text-muted">{project.tag}</span>
                          </div>
                          <p className="mt-1 text-xs leading-5 text-muted sm:text-sm sm:leading-6">
                            {project.summary}
                          </p>
                        </div>
                      </div>

                      {project.href && (
                        <a
                          href={project.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open ${project.title}`}
                          className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-ink"
                        >
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.section>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  )
}
