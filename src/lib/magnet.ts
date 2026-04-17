import type { PointerEvent as ReactPointerEvent } from "react";

/**
 * Subtle magnetic pull towards the pointer on hover.
 * Apply via onPointerMove on any interactive element.
 * No-op on touch to avoid sticky transforms on mobile.
 */
export function handleMagnetMove(event: ReactPointerEvent<HTMLElement>) {
  if (event.pointerType === "touch") return;
  const rect = event.currentTarget.getBoundingClientRect();
  const offsetX = (event.clientX - rect.left - rect.width / 2) / rect.width;
  const offsetY = (event.clientY - rect.top - rect.height / 2) / rect.height;
  event.currentTarget.style.transform = `translate3d(${(offsetX * 18).toFixed(2)}px, ${(offsetY * 16).toFixed(2)}px, 0)`;
}

/** Resets the magnetic transform when the pointer leaves. */
export function handleMagnetLeave(event: ReactPointerEvent<HTMLElement>) {
  event.currentTarget.style.transform = "translate3d(0px, 0px, 0px)";
}
