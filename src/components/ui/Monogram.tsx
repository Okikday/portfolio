export function Monogram({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" className={className}>
      <circle cx="15.5" cy="20" r="8.5" stroke="currentColor" strokeWidth="1.9" />
      <path
        d="M31.2 13.7A8.5 8.5 0 1 0 33 20H25.5"
        stroke="currentColor"
        strokeOpacity="0.58"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="15.5" cy="20" r="1.7" fill="currentColor" />
    </svg>
  )
}
