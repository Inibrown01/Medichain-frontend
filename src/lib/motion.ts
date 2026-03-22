/** Primary easing — smooth deceleration (short interactions) */
export const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1]

/**
 * Softer ease for longer motions — easier to follow on screen.
 * Does not affect load time: runs after paint via Framer Motion / CSS.
 */
export const easeMotion: [number, number, number, number] = [0.16, 1, 0.32, 1]

/** Scroll-triggered blocks: slow enough to read the movement */
export const scrollRevealDuration = 1.12

/** Route content fade/slide */
export const pageTransitionDuration = 0.78

/** Auth / status cards on mount */
export const authEnterDuration = 0.92

/** Default count-up length when value enters view */
export const counterDuration = 3.45

/**
 * Trigger slightly before elements fully enter view so the full animation
 * plays while the user is looking at it (positive bottom margin expands root).
 */
export const viewportOnce = {
  once: true as boolean,
  amount: 0.08,
  margin: '0px 0px 20% 0px' as const,
}

export const transitionBase = {
  duration: scrollRevealDuration,
  ease: easeMotion,
}
