import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { useRef, type ReactNode } from 'react'

interface MagneticProps {
  children: ReactNode
  className?: string
  strength?: number
}

export function Magnetic({ children, className = '', strength = 0.28 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion() ?? false
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 260, damping: 20, mass: 0.4 })
  const y = useSpring(rawY, { stiffness: 260, damping: 20, mass: 0.4 })

  return (
    <motion.div
      ref={ref}
      style={reduced ? undefined : { x, y }}
      onPointerMove={(e) => {
        if (reduced || e.pointerType !== 'mouse' || !ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const dx = e.clientX - (rect.left + rect.width / 2)
        const dy = e.clientY - (rect.top + rect.height / 2)
        rawX.set(dx * strength)
        rawY.set(dy * strength)
      }}
      onPointerLeave={() => {
        rawX.set(0)
        rawY.set(0)
      }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  )
}
