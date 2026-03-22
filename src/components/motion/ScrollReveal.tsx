import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '../../lib/cn'
import { easeMotion, scrollRevealDuration, viewportOnce } from '../../lib/motion'

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

/** Slightly larger travel so motion reads clearly at slower durations */
const offset: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 48 },
  down: { x: 0, y: -48 },
  left: { x: 44, y: 0 },
  right: { x: -44, y: 0 },
  none: { x: 0, y: 0 },
}

export type ScrollRevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: Direction
  /** Slight scale on enter */
  scale?: boolean
  as?: 'div' | 'section' | 'article' | 'aside'
}

const motionMap = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
} as const

export function ScrollReveal({
  children,
  className,
  delay = 0,
  duration = scrollRevealDuration,
  direction = 'up',
  scale = false,
  as: tag = 'div',
}: ScrollRevealProps) {
  const reduce = useReducedMotion()
  const { x, y } = offset[direction]

  if (reduce) {
    const Static = tag
    return <Static className={className}>{children}</Static>
  }

  const Motion = tag === 'aside' ? motion.aside : motionMap[tag]

  return (
    <Motion
      className={cn(className)}
      initial={{ opacity: 0, x, y, scale: scale ? 0.97 : 1 }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={viewportOnce}
      transition={{
        duration,
        delay,
        ease: easeMotion,
      }}
    >
      {children}
    </Motion>
  )
}
