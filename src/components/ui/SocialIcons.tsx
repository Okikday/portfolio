export function GithubMark({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 1.2a10.8 10.8 0 0 0-3.4 21.1c.5.1.7-.2.7-.5v-2c-3 .7-3.6-1.3-3.6-1.3-.5-1.2-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 1.6 2.5 1.2 3.1.9.1-.7.4-1.2.7-1.4-2.4-.3-4.9-1.2-4.9-5.3 0-1.2.4-2.1 1.1-2.9-.1-.3-.5-1.4.1-2.8 0 0 .9-.3 2.9 1.1a10.2 10.2 0 0 1 5.4 0c2-1.4 2.9-1.1 2.9-1.1.6 1.4.2 2.5.1 2.8.7.8 1.1 1.7 1.1 2.9 0 4.1-2.5 5-4.9 5.3.4.3.7 1 .7 2v2.9c0 .3.2.6.8.5A10.8 10.8 0 0 0 12 1.2Z" />
    </svg>
  )
}

export function LinkedinMark({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14ZM8.2 10.1H5.5v8.4h2.7v-8.4Zm7.1-.2c-1.3 0-2.2.7-2.6 1.4v-1.2H10v8.4h2.7v-4.2c0-1.1.2-2.2 1.6-2.2s1.4 1.3 1.4 2.3v4.1h2.7v-4.7c0-2.3-.5-3.9-3.1-3.9ZM6.9 5.8a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Z" />
    </svg>
  )
}

export function PubDevMark({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M5.2 7.6 12 3.8l6.8 3.8v8.8L12 20.2l-6.8-3.8V7.6Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="M5.2 7.6 12 11.4l6.8-3.8M12 11.4v8.8"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  )
}
