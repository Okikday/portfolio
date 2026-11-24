import { Menu, Moon, Sun, X } from 'lucide-react'
import { animate, AnimatePresence, motion, useMotionValue, useReducedMotion } from 'motion/react'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { PROFILE, SLIDE_NAV } from '../data/portfolio'
import { useActiveSection } from '../hooks/useActiveSection'
import { Monogram } from './ui/Monogram'

const SECTION_IDS = ['work', 'journey', 'craft'] as const

export function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const activeSection = useActiveSection(SECTION_IDS)
  const [mobileOpen, setMobileOpen] = useState(false)
  const reduced = useReducedMotion() ?? false

  const barRef = useRef<HTMLDivElement>(null)
  const mobileOpenRef = useRef(mobileOpen)
  const focusedRef = useRef(false)
  const snapAnimRef = useRef<ReturnType<typeof animate> | null>(null)
  const snapTimerRef = useRef<number | null>(null)
  const y = useMotionValue(0)

  const cancelSnap = useCallback(() => {
    if (snapTimerRef.current !== null) {
      window.clearTimeout(snapTimerRef.current)
      snapTimerRef.current = null
    }
    snapAnimRef.current?.stop()
    snapAnimRef.current = null
  }, [])

  const reveal = useCallback(() => {
    cancelSnap()
    if (reduced) {
      y.set(0)
    } else {
      snapAnimRef.current = animate(y, 0, { duration: 0.22, ease: [0.2, 0.7, 0.2, 1] })
    }
  }, [cancelSnap, reduced, y])

  useLayoutEffect(() => {
    mobileOpenRef.current = mobileOpen
    if (mobileOpen) reveal()
  }, [mobileOpen, reveal])

  useEffect(() => {
    let threshold = 0
    let hideDistance = 0

    const measure = () => {
      threshold = (document.getElementById('work')?.offsetHeight ?? window.innerHeight) * 0.45
      hideDistance = (barRef.current?.offsetHeight ?? 52) + 32
    }

    const clampScroll = (raw: number) => {
      const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
      return Math.min(maxScroll, Math.max(0, raw))
    }

    measure()
    let lastScrollY = clampScroll(window.scrollY)
    let lastDirection: -1 | 0 | 1 = 0

    const onScroll = () => {
      const prevScrollY = lastScrollY
      const scrollY = clampScroll(window.scrollY)
      const delta = scrollY - prevScrollY
      lastScrollY = scrollY
      if (delta === 0) return

      lastDirection = delta > 0 ? 1 : -1

      if (mobileOpenRef.current || focusedRef.current) {
        if (y.get() !== 0) reveal()
        return
      }

      cancelSnap()
      const currentHidden = -y.get()

      if (reduced) {
        if (scrollY <= threshold || delta < -4) y.set(0)
        else if (delta > 4) y.set(-hideDistance)
        return
      }

      if (scrollY <= threshold) {
        if (currentHidden === 0) return
        const stepped = delta < 0 ? Math.max(0, currentHidden + delta) : currentHidden
        y.set(-stepped)
        if (stepped > 0) {
          snapAnimRef.current = animate(y, 0, { duration: 0.18, ease: [0.2, 0.7, 0.2, 1] })
        }
        return
      }

      const effectiveDelta = prevScrollY < threshold ? scrollY - threshold : delta
      const nextHidden = Math.min(hideDistance, Math.max(0, currentHidden + effectiveDelta))
      y.set(-nextHidden)

      if (nextHidden > 0 && nextHidden < hideDistance) {
        snapTimerRef.current = window.setTimeout(() => {
          const latestHidden = -y.get()
          if (latestHidden <= 0 || latestHidden >= hideDistance) return
          const shouldHide =
            lastDirection > 0 ? latestHidden > hideDistance * 0.25 : latestHidden > hideDistance * 0.75
          snapAnimRef.current = animate(y, shouldHide ? -hideDistance : 0, {
            duration: 0.2,
            ease: [0.2, 0.7, 0.2, 1],
          })
        }, 140)
      }
    }

    const onResize = () => {
      measure()
      if (-y.get() > hideDistance) y.set(-hideDistance)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      cancelSnap()
    }
  }, [cancelSnap, reduced, reveal, y])

  const isDark = theme === 'dark'

  return (
    <motion.header
      style={{ y }}
      onFocus={(event) => {
        const visible = event.currentTarget.matches(':focus-visible, :has(:focus-visible)')
        focusedRef.current = visible
        if (visible) reveal()
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) focusedRef.current = false
      }}
      className="pointer-events-none fixed inset-x-0 top-4 z-50 px-5 will-change-transform sm:top-5 sm:px-8 lg:px-[7vw]"
    >
      <div ref={barRef} className="mx-auto flex max-w-[1360px] items-center justify-between">
        <a
          href="#work"
          aria-label={`${PROFILE.name} — Home`}
          className="glass-pill pointer-events-auto inline-flex items-center gap-2.5 rounded-full py-1.5 pr-4 pl-2.5 text-ink transition-transform hover:scale-[1.02]"
        >
          <Monogram className="h-6 w-6" />
          <span className="font-display text-xs font-medium tracking-[-0.02em] sm:text-[13px]">
            {PROFILE.firstName}
          </span>
        </a>

        <nav
          aria-label="Primary"
          className="glass-pill pointer-events-auto hidden items-center gap-1 rounded-full p-1.5 md:flex"
        >
          {SLIDE_NAV.map((item) => {
            const active = activeSection === item.id
            return (
              <a
                key={item.id}
                href={item.href}
                className={`relative rounded-full px-3.5 py-1.5 text-[12px] font-medium transition-colors ${
                  active ? 'text-ink' : 'text-muted hover:text-ink'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-active-pill"
                    transition={{ type: 'spring', stiffness: 360, damping: 32 }}
                    className="absolute inset-0 -z-10 rounded-full bg-ink/[0.08]"
                  />
                )}
                <span className="mr-1.5 font-mono text-[10px] text-subtle">{item.index}</span>
                {item.label}
              </a>
            )
          })}
          <span aria-hidden="true" className="mx-1 h-4 w-px bg-line-strong" />
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
            aria-pressed={!isDark}
            className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/[0.08]"
          >
            {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
          </button>
        </nav>

        <div className="glass-pill pointer-events-auto flex items-center gap-1 rounded-full p-1 md:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
            aria-pressed={!isDark}
            className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/[0.08]"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMobileOpen((open) => !open)}
            className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/[0.08]"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            initial={reduced ? false : { opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? undefined : { opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="glass-pill pointer-events-auto mx-auto mt-3 max-w-[1360px] rounded-2xl p-2 md:hidden"
          >
            <ul className="grid gap-1">
              {SLIDE_NAV.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-ink/[0.06]"
                  >
                    <span>
                      <span className="mr-2 font-mono text-[11px] text-subtle">{item.index}</span>
                      {item.label}
                    </span>
                    {activeSection === item.id && <span className="h-1.5 w-1.5 rounded-full bg-ink" />}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
