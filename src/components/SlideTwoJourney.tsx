import { X } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import { JOURNEY_NODES, type JourneyNodeId } from '../data/portfolio'
import { JourneyIllustration } from './fx/JourneyIllustration'

export function SlideTwoJourney() {
  const [selectedId, setSelectedId] = useState<JourneyNodeId | null>(null)
  const reduced = useReducedMotion() ?? false

  const activeNode = JOURNEY_NODES.find((n) => n.id === selectedId) ?? null

  const toggleNode = (id: JourneyNodeId) => {
    setSelectedId((prev) => (prev === id ? null : id))
  }

  return (
    <section
      id="journey"
      aria-labelledby="journey-heading"
      className="relative flex min-h-[100svh] flex-col justify-between border-t border-line bg-canvas px-6 pt-24 pb-14 sm:px-10 sm:pt-28 sm:pb-16 lg:px-[7vw]"
    >
      {/* Top heading row */}
      <div className="mx-auto flex w-full max-w-[1360px] flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">02 · Journey</p>
          <h2
            id="journey-heading"
            className="mt-3 font-display text-4xl leading-[1.0] font-semibold tracking-[-0.045em] text-ink sm:text-5xl lg:text-6xl"
          >
            Over the <span className="font-serif font-normal text-muted italic">years.</span>
          </h2>
        </div>
        <p className="font-mono text-[11px] tracking-[0.06em] text-subtle">
          {activeNode ? `${activeNode.span} · Click again to close` : 'Select a milestone to inspect'}
        </p>
      </div>

      {/* Central illustration + on-demand disclosure */}
      <div className="relative mx-auto my-auto flex w-full max-w-[1360px] flex-1 flex-col items-center justify-center py-6">
        <JourneyIllustration activeId={selectedId} />

        <div className="mt-4 min-h-[112px] w-full max-w-xl">
          <AnimatePresence mode="wait">
            {activeNode ? (
              <motion.div
                key={activeNode.id}
                initial={reduced ? false : { opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduced ? undefined : { opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.25, ease: [0.2, 0.7, 0.2, 1] }}
                className="glass-pill relative rounded-2xl px-6 py-5 text-left"
              >
                <button
                  type="button"
                  aria-label="Close milestone detail"
                  onClick={() => setSelectedId(null)}
                  className="absolute top-4 right-4 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-muted transition-colors hover:bg-ink/10 hover:text-ink"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
                <p className="font-mono text-[11px] tracking-[0.1em] text-muted uppercase">
                  {activeNode.role} · {activeNode.organization} · {activeNode.span}
                </p>
                <p className="mt-2 pr-6 text-sm leading-6 text-ink sm:text-base">{activeNode.essence}</p>
              </motion.div>
            ) : (
              <motion.p
                key="idle-prompt"
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduced ? undefined : { opacity: 0 }}
                className="pt-8 text-center font-mono text-[11px] tracking-[0.14em] text-subtle uppercase"
              >
                Tap a node below to reveal role focus
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Interactive horizontal time-arc selector */}
      <nav aria-label="Career milestones" className="mx-auto w-full max-w-[780px]">
        <div className="relative grid grid-cols-4 items-start pt-4">
          {/* Hairline spine connecting the 4 nodes */}
          <div aria-hidden="true" className="absolute top-[27px] right-[12.5%] left-[12.5%] h-px bg-line-strong" />

          {JOURNEY_NODES.map((node) => {
            const active = selectedId === node.id
            return (
              <button
                key={node.id}
                type="button"
                aria-pressed={active}
                onClick={() => toggleNode(node.id)}
                className="group relative flex cursor-pointer flex-col items-center gap-2.5 text-center"
              >
                <span className="relative flex h-6 w-6 items-center justify-center">
                  {active && (
                    <motion.span
                      layoutId="journey-ring"
                      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                      className="absolute inset-0 rounded-full border border-ink"
                    />
                  )}
                  <span
                    className={`h-2.5 w-2.5 rounded-full transition-transform duration-200 ${
                      active
                        ? 'scale-110 bg-ink'
                        : 'border border-line-strong bg-canvas group-hover:scale-125 group-hover:border-ink'
                    }`}
                  />
                </span>

                <span className="space-y-0.5">
                  <span
                    className={`block font-mono text-[10px] tracking-[0.08em] ${
                      active ? 'text-ink' : 'text-subtle group-hover:text-muted'
                    }`}
                  >
                    {node.year}
                  </span>
                  <span
                    className={`block font-display text-xs font-medium sm:text-sm ${
                      active ? 'text-ink' : 'text-muted group-hover:text-ink'
                    }`}
                  >
                    {node.shortLabel}
                  </span>
                </span>
              </button>
            )
          })}
        </div>
      </nav>
    </section>
  )
}
