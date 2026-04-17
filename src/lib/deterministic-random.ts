export function deterministicRandom(seed: number) {
  const value = Math.sin(seed * 12.9898 + 78.233) * 43758.5453123;

  return value - Math.floor(value);
}

export function deterministicRange(seed: number, min: number, max: number) {
  return min + deterministicRandom(seed) * (max - min);
}
