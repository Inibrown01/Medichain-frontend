import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { easeMotion, pageTransitionDuration } from '../../lib/motion'

export function PageTransition({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const reduce = useReducedMotion()

  if (reduce) {
    return <>{children}</>
  }

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: pageTransitionDuration, ease: easeMotion }}
    >
      {children}
    </motion.div>
  )
}
