import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import { animate } from 'framer-motion'
import { counterDuration, easeMotion } from '../../lib/motion'

export type AnimatedCounterProps = {
  /** Target integer (e.g. 12482) */
  value: number
  /** Suffix after number e.g. "+" or "%" */
  suffix?: string
  /** Format with thousands separators */
  formatThousands?: boolean
  className?: string
  duration?: number
}

function formatNum(n: number, thousands: boolean) {
  if (!thousands) return String(Math.round(n))
  return Math.round(n).toLocaleString('en-US')
}

export function AnimatedCounter({
  value,
  suffix = '',
  formatThousands = true,
  className,
  duration = counterDuration,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '0px 0px 15% 0px' })
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(reduce ? value : 0)

  useEffect(() => {
    if (reduce) {
      setDisplay(value)
      return
    }
    if (!isInView) return

    const controls = animate(0, value, {
      duration,
      ease: easeMotion,
      onUpdate: (v) => setDisplay(v),
    })

    return () => controls.stop()
  }, [isInView, value, duration, reduce])

  return (
    <span ref={ref} className={className}>
      {formatNum(display, formatThousands)}
      {suffix}
    </span>
  )
}
