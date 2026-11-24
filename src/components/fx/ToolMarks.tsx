import type { HonourId, ToolKey } from '../../data/portfolio'

export function ToolMark({ id, className = 'h-6 w-6' }: { id: ToolKey; className?: string }) {
  switch (id) {
    case 'flutter':
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
          <path d="M6 12.5 14.5 4H19L10.5 12.5 14.5 16.5H10L6 12.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="m11.5 18 2.5-2.5 4.5 4.5H14L11.5 18Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      )
    case 'dart':
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
          <path d="M5 9.5 11.5 4H18l2 5.5-5.5 10.5H8L5 9.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M8 14.5 18 9.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      )
    case 'swift':
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
          <path
            d="M4.5 16.2c4.4 3.4 10.2 3.1 13.7-.9.8-.9 1.3 1.4 1.3 2.5-1.1-1.3-2.6-1.4-4-.9-3.9 1.3-8-.7-11-4.7 2.8 1.5 5.4 1.8 7.5 1.1C8.8 10.7 7 7.6 6.5 4.5c2.5 2.7 5.2 5 8 6.4-.8-2.3-1.4-4.7-1.4-6.9 3.6 3.5 5.4 7.7 5.1 11.3"
            stroke="currentColor"
            strokeWidth="1.45"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    case 'python':
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
          <path d="M12 4c-3.2 0-3 1.4-3 3v2h5v1H7.2C5.2 10 4 11.4 4 13.8S5.2 17.5 7 17.5H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M12 20c3.2 0 3-1.4 3-3v-2h-5v-1h6.8c2 0 3.2-1.4 3.2-3.8S18.8 6.5 17 6.5H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    case 'riverpod':
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="6" cy="6.5" r="2" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="18" cy="6.5" r="2" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="12" cy="19" r="2" stroke="currentColor" strokeWidth="1.4" />
          <path d="M7.6 7.9 9.8 10M16.4 7.9 14.2 10M12 15v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      )
    case 'firebase':
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
          <path d="M6 17.5 8.6 4.5l3.7 6.2 3.1-3.2 2.6 10-6 3.5-6-3.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M6 17.5 15.4 7.5" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.6" />
        </svg>
      )
    case 'git':
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
          <circle cx="8" cy="6.5" r="2.2" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="8" cy="17.5" r="2.2" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="16.5" cy="11.5" r="2.2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 8.7v6.6M8 9.5c0 2 2.5 2 6.3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    case 'architecture':
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
          <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.4" strokeDasharray="3 3" />
          <rect x="8.5" y="8.5" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="1.4" fill="currentColor" />
        </svg>
      )
  }
}

export function HonourMedallion({ id, className = 'h-11 w-11' }: { id: HonourId; className?: string }) {
  if (id === 'cavista') {
    return (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className={className}>
        <circle cx="24" cy="24" r="19" stroke="currentColor" strokeOpacity="0.22" />
        <circle cx="20.5" cy="24" r="8.5" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="27.5" cy="24" r="8.5" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="24" cy="24" r="2" fill="currentColor" />
      </svg>
    )
  }

  if (id === 'gtco') {
    return (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className={className}>
        <circle cx="24" cy="24" r="19" stroke="currentColor" strokeOpacity="0.22" strokeDasharray="3 4" />
        <polygon points="24,10 36,17 36,31 24,38 12,31 12,17" stroke="currentColor" strokeWidth="1.4" />
        <path d="M18 26.5 22 22.5 25 25 30 19.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className={className}>
      <circle cx="24" cy="24" r="19" stroke="currentColor" strokeOpacity="0.22" />
      <path d="M16 24.5 25.5 15H31l-9.5 9.5L26 29h-5.5L16 24.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="m22.5 31 3-3 5.5 5.5h-5.5l-3-2.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  )
}
