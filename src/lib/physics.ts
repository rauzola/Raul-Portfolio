export function calcDist(dx: number, dy: number): number {
  return Math.sqrt(dx * dx + dy * dy);
}

export function normalizePointer(
  event: { clientX: number; clientY: number },
  rect: DOMRect,
) {
  return {
    x: (event.clientX - rect.left) / rect.width - 0.5,
    y: 0.5 - (event.clientY - rect.top) / rect.height,
  };
}
