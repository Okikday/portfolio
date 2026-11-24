import { SLIDE_NAV } from '../data/portfolio'
import { useActiveSection } from '../hooks/useActiveSection'

const SECTION_IDS = ['work', 'journey', 'craft'] as const

export function SlideRail() {
  const active = useActiveSection(SECTION_IDS)

  return (
    <aside
      aria-label="Slide indicator"
      className="fixed top-1/2 right-6 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 lg:flex"
    >
      {SLIDE_NAV.map((slide) => {
        const isCurrent = active === slide.id
        return (
          <a
            key={slide.id}
            href={slide.href}
            aria-label={`Slide ${slide.index}: ${slide.label}`}
            aria-current={isCurrent ? 'step' : undefined}
            className="group flex items-center gap-2.5 py-1"
          >
            <span
              className={`font-mono text-[10px] tracking-[0.12em] uppercase transition-opacity duration-200 ${
                isCurrent ? 'text-ink opacity-90' : 'text-subtle opacity-0 group-hover:opacity-80'
              }`}
            >
              {slide.index}
            </span>
            <span
              className={`block rounded-full transition-all duration-300 ${
                isCurrent ? 'h-6 w-1.5 bg-ink' : 'h-1.5 w-1.5 bg-ink/25 group-hover:bg-ink/60'
              }`}
            />
          </a>
        )
      })}
    </aside>
  )
}
