import { Check } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react'

interface ToastContextValue {
  showToast: (message: string) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null)
  const timerRef = useRef<number | null>(null)
  const reduced = useReducedMotion() ?? false

  const showToast = useCallback((text: string) => {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current)
    setMessage(text)
    timerRef.current = window.setTimeout(() => {
      setMessage(null)
      timerRef.current = null
    }, 2400)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="pointer-events-none fixed inset-x-0 bottom-6 z-[90] flex justify-center px-4"
      >
        <AnimatePresence>
          {message && (
            <motion.div
              key={message}
              initial={reduced ? { opacity: 1 } : { opacity: 0, y: 16, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 360, damping: 28 }}
              className="glass-pill inline-flex items-center gap-2.5 rounded-full px-4 py-2.5 text-xs font-medium text-ink shadow-xl"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/15 text-accent">
                <Check className="h-3.5 w-3.5" />
              </span>
              <span>{message}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside ToastProvider')
  return ctx
}
