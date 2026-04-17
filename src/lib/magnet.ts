import type { PointerEvent as ReactPointerEvent } from "react";

export function handleMagnetMove(event: ReactPointerEvent<HTMLElement>) {
  if (event.pointerType === "touch") return;
  const rect = event.currentTarget.getBoundingClientRect();
  const offsetX = (event.clientX - rect.left - rect.width / 2) / rect.width;
  const offsetY = (event.clientY - rect.top - rect.height / 2) / rect.height;
  event.currentTarget.style.transform = `translate3d(${(offsetX * 18).toFixed(2)}px, ${(offsetY * 16).toFixed(2)}px, 0)`;
}

export function handleMagnetLeave(event: ReactPointerEvent<HTMLElement>) {
  event.currentTarget.style.transform = "translate3d(0px, 0px, 0px)";
}
