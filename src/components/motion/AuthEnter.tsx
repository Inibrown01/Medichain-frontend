import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { authEnterDuration, easeMotion } from '../../lib/motion'

/** Centered auth / status cards: mount fade + rise (also works on mobile). */
export function AuthEnter({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion()
  if (reduce) return <>{children}</>

  return (
    <motion.div
      className="flex w-full flex-col items-center"
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: authEnterDuration, ease: easeMotion }}
    >
      {children}
    </motion.div>
  )
}
