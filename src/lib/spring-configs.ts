/**
 * Shared Framer Motion spring configs.
 * Tune here; all consumers update automatically.
 */

/** Cursor dot — snappy, nearly instant. */
export const SPRING_CURSOR_FAST = { stiffness: 900, damping: 38, mass: 0.2 };

/** Cursor ring — lags behind the dot for depth. */
export const SPRING_CURSOR_SLOW = { stiffness: 160, damping: 22, mass: 0.5 };

/** FleeElement repulsion return spring. */
export const SPRING_FLEE = { stiffness: 240, damping: 18, mass: 0.45 };

/** Hero section glow follow spring. */
export const SPRING_HERO_GLOW = { stiffness: 110, damping: 22, mass: 0.35 };
