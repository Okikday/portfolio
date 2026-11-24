import { useRef, type ReactNode } from 'react'
import { useTheme } from '../../context/ThemeContext'
import { placeRider, useCanvasLoop, type LoopFrame } from '../../hooks/useCanvasLoop'
import { Riders } from './Riders'

/**
 * A monochrome wireframe sheet bent into a gravity well, like a spacetime-curvature
 * diagram. Ripples roll outward from the well, data pulses travel along the grid
 * lines, and DOM riders (projects) rise out of the well and drift outward.
 *
 * The well's throat always projects to `center`, so UI can sit exactly in it.
 */

interface GravityGridProps {
  className?: string
  /** Screen position of the well's throat (0–1). */
  center?: [number, number]
  /** Fraction of the canvas' shorter side one world unit spans. */
  scale?: number
  riders?: number
  /** Loops per second each rider makes from the well to the rim. */
  riderFlow?: number
  riderScale?: number
  renderRider?: (index: number) => ReactNode
  still?: boolean
  active?: boolean
}

const EXTENT = 2.8
const LINES = 24
const SAMPLES = 80
const WELL_DEPTH = 2.3
const WELL_WIDTH = 0.42
const FOCAL = 4.2
const PULSES = 22

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)))
  return t * t * (3 - 2 * t)
}

function hash(n: number) {
  const x = Math.sin(n * 127.1) * 43758.5453
  return x - Math.floor(x)
}

const pulses = Array.from({ length: PULSES }, (_, i) => ({
  axis: i % 2,
  line: Math.floor(hash(i + 3) * LINES),
  dir: hash(i + 7) > 0.5 ? 1 : -1,
  speed: 0.06 + hash(i + 13) * 0.08,
  offset: hash(i + 29),
}))

export function GravityGrid({
  className,
  center = [0.5, 0.5],
  scale = 0.3,
  riders = 0,
  riderFlow = 1 / 16,
  riderScale = 1,
  renderRider,
  still = false,
  active = true,
}: GravityGridProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const riderRefs = useRef<(HTMLDivElement | null)[]>([])
  const { isDark } = useTheme()

  const draw = ({ ctx, width, height, time, pointerX, pointerY }: LoopFrame) => {
    const unit = Math.min(width, height) * scale
    const cx = width * center[0]
    const cy = height * center[1]
    const yaw = time * 0.05 + pointerX * 0.18
    const pitch = 0.9 + pointerY * 0.08
    const cosY = Math.cos(yaw)
    const sinY = Math.sin(yaw)
    const cosP = Math.cos(pitch)
    const sinP = Math.sin(pitch)

    const gridColor = isDark ? '#D8D5CE' : '#2B2A28'
    const pulseHeadColor = isDark ? '#FFFFFF' : '#141413'
    const glowRgb = isDark ? '242, 241, 238' : '20, 20, 19'

    /** Height of the fabric: a well, with ripples rolling outward from it. */
    const surface = (r: number) =>
      -WELL_DEPTH / Math.sqrt((r / WELL_WIDTH) ** 2 + 1) +
      0.055 * Math.sin(r * 6.5 - time * 2.4) * Math.exp(-r * 0.55) * smoothstep(0.05, 0.5, r)

    const out = { x: 0, y: 0, k: 0 }
    const project = (x: number, y: number, z: number) => {
      const yr = y + WELL_DEPTH
      const x1 = x * cosY + z * sinY
      const z1 = -x * sinY + z * cosY
      const y2 = yr * cosP + z1 * sinP
      const z2 = -yr * sinP + z1 * cosP
      const k = FOCAL / Math.max(0.6, FOCAL + z2)
      out.x = cx + x1 * k * unit
      out.y = cy - y2 * k * unit
      out.k = k
      return out
    }
    const point = (x: number, z: number) => project(x, surface(Math.hypot(x, z)), z)

    // 1. The bent neutral wireframe grid.
    ctx.strokeStyle = gridColor
    ctx.lineWidth = 1
    ctx.globalAlpha = isDark ? 0.28 : 0.24
    for (let axis = 0; axis < 2; axis += 1) {
      for (let l = 0; l <= LINES; l += 1) {
        const fixed = -EXTENT + (l / LINES) * EXTENT * 2
        ctx.beginPath()
        for (let s = 0; s <= SAMPLES; s += 1) {
          const along = -EXTENT + (s / SAMPLES) * EXTENT * 2
          const p = axis === 0 ? point(along, fixed) : point(fixed, along)
          if (s === 0) ctx.moveTo(p.x, p.y)
          else ctx.lineTo(p.x, p.y)
        }
        ctx.stroke()
      }
    }

    // 2. Fade the sheet's square edge into a soft ellipse.
    const rim = project(0, 0, 0)
    ctx.save()
    ctx.globalAlpha = 1
    ctx.globalCompositeOperation = 'destination-in'
    ctx.translate(cx, (cy + rim.y) / 2)
    ctx.scale(1, cosP * 1.15 + 0.15)
    const reach = EXTENT * unit * 0.95
    const mask = ctx.createRadialGradient(0, 0, 0, 0, 0, reach)
    mask.addColorStop(0, 'rgba(0,0,0,1)')
    mask.addColorStop(0.55, 'rgba(0,0,0,.85)')
    mask.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = mask
    ctx.fillRect(-reach, -reach / 0.2, reach * 2, (reach * 2) / 0.2)
    ctx.restore()

    // 3. Soft neutral glow pooling in the throat.
    ctx.save()
    ctx.globalCompositeOperation = isDark ? 'lighter' : 'source-over'
    const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, unit * 1.1)
    glow.addColorStop(0, `rgba(${glowRgb}, ${isDark ? 0.18 : 0.12})`)
    glow.addColorStop(0.45, `rgba(${glowRgb}, ${isDark ? 0.05 : 0.03})`)
    glow.addColorStop(1, `rgba(${glowRgb}, 0)`)
    ctx.fillStyle = glow
    ctx.fillRect(cx - unit * 1.1, cy - unit * 1.1, unit * 2.2, unit * 2.2)

    // 4. Data pulses running along the grid lines.
    for (const pulse of pulses) {
      const fixed = -EXTENT + (pulse.line / LINES) * EXTENT * 2
      const t = (pulse.offset + time * pulse.speed) % 1
      for (let trail = 0; trail < 4; trail += 1) {
        const along = (-EXTENT + (t - trail * 0.012) * EXTENT * 2) * pulse.dir
        const r = Math.hypot(along, fixed)
        const a = smoothstep(EXTENT, EXTENT * 0.55, r) * (1 - trail / 4)
        if (a < 0.02) continue
        const p = pulse.axis === 0 ? point(along, fixed) : point(fixed, along)
        const size = (trail === 0 ? 2.1 : 1.4) * Math.min(1.4, p.k)
        ctx.globalAlpha = a * (trail === 0 ? 0.95 : 0.45)
        ctx.fillStyle = trail === 0 ? pulseHeadColor : gridColor
        ctx.beginPath()
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2)
        ctx.fill()
        if (trail === 0) {
          ctx.globalAlpha = a * (isDark ? 0.2 : 0.14)
          ctx.fillStyle = gridColor
          ctx.beginPath()
          ctx.arc(p.x, p.y, size * 2.8, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }
    ctx.restore()
    ctx.globalAlpha = 1

    // 5. Riders rise out of the well and drift outward along a golden-angle spiral.
    for (let i = 0; i < riders; i += 1) {
      const f = (i / riders + time * riderFlow) % 1
      const r = 0.16 + f * EXTENT * 0.78
      const theta = i * 2.39996 + f * 2.4 + time * 0.06
      const x = r * Math.cos(theta)
      const z = r * Math.sin(theta)
      const p = project(x, surface(r) + 0.14, z)
      const alpha = smoothstep(0, 0.06, f) * (1 - smoothstep(0.86, 1, f))
      const s = Math.min(1.4, Math.pow(p.k, 0.9) * (0.45 + smoothstep(0, 0.35, f) * 0.6)) * riderScale
      placeRider(riderRefs.current[i], p.x, p.y, s, alpha, p.k)
    }
  }

  useCanvasLoop({ wrapRef, canvasRef, draw, active, still })

  return (
    <div ref={wrapRef} className={`relative ${className ?? ''}`}>
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 block" />
      {renderRider && <Riders count={riders} refs={riderRefs} render={renderRider} />}
    </div>
  )
}
