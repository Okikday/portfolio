import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import type { JourneyNodeId } from '../../data/portfolio'

const EASE = [0.2, 0.7, 0.2, 1] as const

function IdleAstrolabe() {
  return (
    <g>
      <circle cx="280" cy="180" r="130" stroke="currentColor" strokeOpacity="0.14" strokeDasharray="4 7" />
      <circle cx="280" cy="180" r="94" stroke="currentColor" strokeOpacity="0.24" />
      <ellipse cx="280" cy="180" rx="146" ry="52" transform="rotate(-16 280 180)" stroke="currentColor" strokeOpacity="0.28" />
      <ellipse cx="280" cy="180" rx="146" ry="52" transform="rotate(24 280 180)" stroke="currentColor" strokeOpacity="0.18" />
      <line x1="90" y1="180" x2="470" y2="180" stroke="currentColor" strokeOpacity="0.12" />
      <line x1="280" y1="24" x2="280" y2="336" stroke="currentColor" strokeOpacity="0.12" />
      <circle cx="280" cy="180" r="12" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="280" cy="180" r="3.5" fill="currentColor" />
      <circle cx="408" cy="136" r="4" fill="currentColor" fillOpacity="0.85" />
      <circle cx="164" cy="232" r="3.5" stroke="currentColor" strokeWidth="1.4" />
    </g>
  )
}

function RenderIllustration() {
  return (
    <g>
      {/* 16.6ms budget ceiling hairline */}
      <line x1="60" y1="115" x2="500" y2="115" stroke="currentColor" strokeOpacity="0.25" strokeDasharray="5 5" />
      {/* 5ms calm target baseline */}
      <line x1="60" y1="226" x2="500" y2="226" stroke="currentColor" strokeOpacity="0.16" />
      {/* Old jagged 17ms+ ghost curve */}
      <path
        d="M60 190 C95 82, 125 220, 160 92 C195 76, 225 226, 260 100 C295 88, 325 214, 360 94 C395 78, 430 220, 500 185"
        stroke="currentColor"
        strokeOpacity="0.18"
        strokeWidth="1.2"
        strokeDasharray="3 4"
      />
      {/* Optimized ~5ms laminar wave */}
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.7, ease: EASE }}
        d="M60 224 Q115 216 170 224 T280 224 T390 224 T500 224"
        stroke="currentColor"
        strokeWidth="1.9"
      />
      {[170, 280, 390].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy={224} r="5" stroke="currentColor" strokeWidth="1.5" fill="var(--bg-canvas)" />
          <circle cx={cx} cy={224} r="1.8" fill="currentColor" />
        </g>
      ))}
      <line x1="280" y1="115" x2="280" y2="224" stroke="currentColor" strokeOpacity="0.32" />
    </g>
  )
}

function ProductIllustration() {
  return (
    <g>
      <line x1="90" y1="180" x2="470" y2="180" stroke="currentColor" strokeOpacity="0.14" strokeDasharray="4 6" />
      {[0, 1, 2, 3, 4].map((i) => {
        const x = 112 + i * 62
        const y = 104 + (i % 2 === 0 ? -12 : 12)
        const isCenter = i === 2
        return (
          <motion.g
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: i * 0.05, ease: EASE }}
          >
            <rect
              x={x}
              y={y}
              width="76"
              height="136"
              rx="14"
              fill="var(--bg-canvas)"
              fillOpacity="0.72"
              stroke="currentColor"
              strokeOpacity={isCenter ? 0.9 : 0.28}
              strokeWidth={isCenter ? 1.7 : 1.1}
            />
            <line
              x1={x + 18}
              y1={y + 24}
              x2={x + 58}
              y2={y + 24}
              stroke="currentColor"
              strokeOpacity={isCenter ? 0.55 : 0.22}
            />
            <circle cx={x + 38} cy={y + 72} r={isCenter ? 14 : 10} stroke="currentColor" strokeOpacity={isCenter ? 0.7 : 0.24} />
          </motion.g>
        )
      })}
    </g>
  )
}

function SystemsIllustration() {
  const nodes = Array.from({ length: 9 }, (_, i) => {
    const a = (i / 9) * Math.PI * 2 - Math.PI / 2
    return {
      x: 280 + Math.cos(a) * 116,
      y: 180 + Math.sin(a) * 116,
    }
  })
  return (
    <g>
      <circle cx="280" cy="180" r="116" stroke="currentColor" strokeOpacity="0.12" strokeDasharray="3 6" />
      <polygon
        points={nodes.map((n) => `${n.x.toFixed(1)},${n.y.toFixed(1)}`).join(' ')}
        stroke="currentColor"
        strokeOpacity="0.22"
      />
      {nodes.map((n, idx) => (
        <motion.g
          key={idx}
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: idx * 0.03, ease: EASE }}
        >
          <line x1="280" y1="180" x2={n.x} y2={n.y} stroke="currentColor" strokeOpacity="0.28" />
          <circle cx={n.x} cy={n.y} r="15" stroke="currentColor" strokeOpacity="0.38" fill="var(--bg-canvas)" />
          <circle cx={n.x} cy={n.y} r="3.5" fill="currentColor" />
        </motion.g>
      ))}
      <circle cx="280" cy="180" r="24" fill="var(--bg-canvas)" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="280" cy="180" r="5" fill="currentColor" />
    </g>
  )
}

function DirectionIllustration() {
  return (
    <g>
      {[54, 94, 134].map((r, i) => (
        <circle
          key={r}
          cx="280"
          cy="180"
          r={r}
          stroke="currentColor"
          strokeOpacity={0.38 - i * 0.1}
          strokeDasharray={i === 1 ? '4 6' : undefined}
        />
      ))}
      {[0, 60, 120, 180, 240, 300].map((deg) => {
        const rad = (deg * Math.PI) / 180
        const x1 = 280 + Math.cos(rad) * 34
        const y1 = 180 + Math.sin(rad) * 34
        const x2 = 280 + Math.cos(rad) * 144
        const y2 = 180 + Math.sin(rad) * 144
        return (
          <g key={deg}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeOpacity="0.24" />
            <circle cx={x2} cy={y2} r="4.5" fill="var(--bg-canvas)" stroke="currentColor" strokeWidth="1.4" />
          </g>
        )
      })}
      <circle cx="280" cy="180" r="14" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="280" cy="180" r="4.5" fill="currentColor" />
    </g>
  )
}

export function JourneyIllustration({ activeId }: { activeId: JourneyNodeId | null }) {
  const reduced = useReducedMotion() ?? false

  return (
    <div className="relative mx-auto flex w-full max-w-[580px] items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.svg
          key={activeId ?? 'idle'}
          viewBox="0 0 560 360"
          fill="none"
          aria-hidden="true"
          initial={reduced ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={reduced ? undefined : { opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="h-auto w-full text-ink"
        >
          {activeId === null && <IdleAstrolabe />}
          {activeId === 'render' && <RenderIllustration />}
          {activeId === 'product' && <ProductIllustration />}
          {activeId === 'systems' && <SystemsIllustration />}
          {activeId === 'direction' && <DirectionIllustration />}
        </motion.svg>
      </AnimatePresence>
    </div>
  )
}
