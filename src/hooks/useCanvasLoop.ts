import { useEffect, useLayoutEffect, useRef, type RefObject } from 'react'

/** Per-frame state handed to a canvas effect's draw function. */
export interface LoopFrame {
  ctx: CanvasRenderingContext2D
  width: number
  height: number
  dpr: number
  /** Seconds of animation time (slows down while a rider is hovered). */
  time: number
  /** Eased pointer position over the canvas, -1…1 on each axis. */
  pointerX: number
  pointerY: number
}

interface CanvasLoopOptions {
  wrapRef: RefObject<HTMLDivElement | null>
  canvasRef: RefObject<HTMLCanvasElement | null>
  draw: (frame: LoopFrame) => void
  /** When false the loop is parked entirely. */
  active: boolean
  /** Freeze on a single frame (reduced motion). */
  still: boolean
  /** Where animation time starts, so the first frame is already composed. */
  startTime?: number
}

/**
 * DPR-aware rAF loop that only runs while visible + active + tab shown,
 * eases pointer parallax, and slows down while hovering any `[data-rider]`
 * so orbiting elements are effortless to inspect and click.
 */
export function useCanvasLoop({
  wrapRef,
  canvasRef,
  draw,
  active,
  still,
  startTime = 7,
}: CanvasLoopOptions) {
  const drawRef = useRef(draw)
  const flags = useRef({ active, still })
  const wake = useRef<() => void>(() => {})

  useLayoutEffect(() => {
    drawRef.current = draw
    flags.current = { active, still }
  })

  useEffect(() => {
    if (active) wake.current()
  }, [active])

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d', { alpha: true })
    if (!wrap || !canvas || !ctx) return

    const frameState: LoopFrame = {
      ctx,
      width: 0,
      height: 0,
      dpr: 1,
      time: startTime,
      pointerX: 0,
      pointerY: 0,
    }
    let raf = 0
    let visible = true
    let last = performance.now()
    let speed = 1
    let targetSpeed = 1
    let pointerX = 0
    let pointerY = 0

    const resize = () => {
      frameState.dpr = Math.min(window.devicePixelRatio || 1, 1.75)
      frameState.width = wrap.clientWidth
      frameState.height = wrap.clientHeight
      canvas.width = Math.max(1, Math.round(frameState.width * frameState.dpr))
      canvas.height = Math.max(1, Math.round(frameState.height * frameState.dpr))
      canvas.style.width = `${frameState.width}px`
      canvas.style.height = `${frameState.height}px`
    }

    const paint = () => {
      if (frameState.width === 0 || frameState.height === 0) return
      ctx.setTransform(frameState.dpr, 0, 0, frameState.dpr, 0, 0)
      ctx.clearRect(0, 0, frameState.width, frameState.height)
      drawRef.current(frameState)
    }

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      speed += (targetSpeed - speed) * Math.min(1, dt * 4)
      frameState.pointerX += (pointerX - frameState.pointerX) * Math.min(1, dt * 3)
      frameState.pointerY += (pointerY - frameState.pointerY) * Math.min(1, dt * 3)
      frameState.time += dt * speed
      paint()
      raf = visible && flags.current.active && !flags.current.still ? requestAnimationFrame(tick) : 0
    }

    const start = () => {
      if (raf || !visible || flags.current.still || !flags.current.active) return
      last = performance.now()
      raf = requestAnimationFrame(tick)
    }

    const stop = () => {
      cancelAnimationFrame(raf)
      raf = 0
    }

    const resizeObserver = new ResizeObserver(() => {
      resize()
      paint()
    })
    resizeObserver.observe(wrap)

    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && !document.hidden
      if (visible) {
        paint()
        start()
      } else {
        stop()
      }
    })
    intersection.observe(wrap)

    const onVisibility = () => {
      if (document.hidden) stop()
      else {
        visible = true
        start()
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      const rect = wrap.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) return
      pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 2
      pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 2
    }

    const onPointerOver = (event: PointerEvent) => {
      targetSpeed = (event.target as HTMLElement).closest('[data-rider]') ? 0.12 : 1
    }

    const onPointerLeave = () => {
      targetSpeed = 1
      pointerX = 0
      pointerY = 0
    }

    wrap.addEventListener('pointermove', onPointerMove)
    wrap.addEventListener('pointerover', onPointerOver)
    wrap.addEventListener('pointerleave', onPointerLeave)

    resize()
    paint()
    wake.current = start
    start()

    return () => {
      stop()
      resizeObserver.disconnect()
      intersection.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      wrap.removeEventListener('pointermove', onPointerMove)
      wrap.removeEventListener('pointerover', onPointerOver)
      wrap.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [canvasRef, startTime, wrapRef])
}

/** Positions a rider element in the same frame as the canvas draw. */
export function placeRider(
  el: HTMLElement | null,
  x: number,
  y: number,
  scale: number,
  alpha: number,
  depth: number,
) {
  if (!el) return
  el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`
  el.style.opacity = alpha.toFixed(3)
  el.style.zIndex = String(Math.round(depth * 100))
  el.style.setProperty('--depth', scale.toFixed(3))
  el.style.pointerEvents = alpha > 0.5 ? 'auto' : 'none'
  el.style.visibility = alpha < 0.01 ? 'hidden' : 'visible'
}
