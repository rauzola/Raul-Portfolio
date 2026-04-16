"use client";

const nodes = [
  { x: "7%", size: 10, delay: "0s", duration: "3.4s" },
  { x: "20%", size: 7, delay: "0.5s", duration: "4.0s" },
  { x: "35%", size: 13, delay: "1.0s", duration: "3.7s" },
  { x: "50%", size: 9, delay: "0.25s", duration: "4.2s" },
  { x: "63%", size: 11, delay: "1.4s", duration: "3.5s" },
  { x: "77%", size: 7, delay: "0.75s", duration: "4.1s" },
  { x: "90%", size: 10, delay: "1.8s", duration: "3.8s" },
];

function FloatingDivider({ variant = "cyan" }: { variant?: "cyan" | "green" }) {
  const accent = variant === "cyan" ? "#00cfea" : "#0aeeb5";
  const glow =
    variant === "cyan"
      ? "rgba(0,207,234,0.07)"
      : "rgba(10,238,181,0.06)";

  return (
    <div className="relative h-[90px] w-full overflow-hidden" aria-hidden="true">
      {/* Gradient line */}
      <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      {/* Central glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-28 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ backgroundColor: glow }}
      />

      {/* Floating diamonds */}
      {nodes.map((node, index) => (
        <div
          key={index}
          className="animate-float-gentle absolute top-1/2 -translate-y-1/2"
          style={{
            left: node.x,
            animationDelay: node.delay,
            animationDuration: node.duration,
          }}
        >
          <div
            style={{
              width: node.size,
              height: node.size,
              border: `1px solid ${accent}`,
              opacity: 0.28 + (index % 3) * 0.06,
              transform: "rotate(45deg)",
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default FloatingDivider;
