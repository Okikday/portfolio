import { useEffect, useState } from 'react'

export function useActiveSection(ids: readonly string[]) {
  const [activeId, setActiveId] = useState<string>(ids[0] ?? 'top')

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    const onScroll = () => {
      const marker = window.scrollY + window.innerHeight * 0.35
      let current = elements[0].id
      for (const el of elements) {
        const top = el.getBoundingClientRect().top + window.scrollY
        if (top <= marker) current = el.id
      }
      setActiveId((prev) => (prev === current ? prev : current))
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [ids])

  return activeId
}
