import type { ReactNode, RefObject } from 'react'

/** DOM elements positioned every frame by GravityGrid (see placeRider). */
export function Riders({
  count,
  refs,
  render,
}: {
  count: number
  refs: RefObject<(HTMLDivElement | null)[]>
  render: (index: number) => ReactNode
}) {
  return Array.from({ length: count }, (_, index) => (
    <div
      key={index}
      ref={(node) => {
        refs.current[index] = node
      }}
      data-rider=""
      className="absolute top-0 left-0 will-change-transform"
      style={{ opacity: 0, visibility: 'hidden' }}
    >
      {render(index)}
    </div>
  ))
}
