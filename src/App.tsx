import { motion, MotionConfig, useScroll, useSpring } from 'motion/react'
import { Navbar } from './components/Navbar'
import { SlideOneOrbit } from './components/SlideOneOrbit'
import { SlideRail } from './components/SlideRail'
import { SlideThreeClosing } from './components/SlideThreeClosing'
import { SlideTwoJourney } from './components/SlideTwoJourney'
import { ThemeProvider } from './context/ThemeContext'
import { ToastProvider } from './context/ToastContext'

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 280, damping: 32, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[1.5px] origin-left bg-ink"
    />
  )
}

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <ToastProvider>
          <div className="relative min-h-screen bg-canvas text-ink">
            <div aria-hidden="true" className="grain-overlay fixed inset-0 z-[65]" />
            <ScrollProgressBar />

            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[80] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-xs focus:font-semibold focus:text-canvas"
            >
              Skip to content
            </a>

            <Navbar />
            <SlideRail />

            <main id="main-content">
              <SlideOneOrbit />
              <SlideTwoJourney />
            </main>

            <SlideThreeClosing />
          </div>
        </ToastProvider>
      </ThemeProvider>
    </MotionConfig>
  )
}

export default App
