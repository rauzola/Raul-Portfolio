/** Euclidean distance between two delta components. */
export function calcDist(dx: number, dy: number): number {
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Maps a pointer event to normalized scene coordinates.
 * Returns x/y in the range [-0.5, 0.5], with y-axis flipped
 * so positive y points up (matches Three.js convention).
 */
export function normalizePointer(
  event: { clientX: number; clientY: number },
  rect: DOMRect,
) {
  return {
    x: (event.clientX - rect.left) / rect.width - 0.5,
    y: 0.5 - (event.clientY - rect.top) / rect.height,
  };
}
