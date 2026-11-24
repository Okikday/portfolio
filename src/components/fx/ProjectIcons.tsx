import type { OrbitProjectId } from '../../data/portfolio'

export function ProjectIcon({ id, className = 'h-6 w-6' }: { id: OrbitProjectId; className?: string }) {
  if (id === 'kickin') {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
        <polygon points="12,3 20,7.5 20,16.5 12,21 4,16.5 4,7.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M12 12 20 7.5M12 12v9M12 12 4 7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    )
  }

  if (id === 'kickin-network') {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" />
      </svg>
    )
  }

  if (id === 'flutter-samples') {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
        <path d="M6 12.5 14.5 4H19L10.5 12.5 14.5 16.5H10L6 12.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="m11.5 18 2.5-2.5 4.5 4.5H14L11.5 18Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    )
  }

  if (id === 'maternal-ai') {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
        <circle cx="10" cy="12" r="5.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="14.5" cy="12" r="5.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12.25" cy="12" r="1.4" fill="currentColor" />
      </svg>
    )
  }

  if (id === 'fintech-sprint') {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
        <path d="M4 17 9.5 11.5 13.5 14.5 20 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 7h4v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="4" y1="20" x2="20" y2="20" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeOpacity="0.45" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <circle cx="7" cy="7" r="2.2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17" cy="7" r="2.2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="17" r="2.2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 8.2 11 14.8M15 8.2 13 14.8M9.2 7h5.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}
