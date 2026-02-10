import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
  Easing,
} from "remotion";

/* ─── Lens Flare ─── */
const LensFlare: React.FC<{
  x: number;
  y: number;
  size: number;
  opacity: number;
  color?: string;
}> = ({ x, y, size, opacity, color = "rgba(200, 180, 255, 0.6)" }) => (
  <div
    style={{
      position: "absolute",
      left: x - size / 2,
      top: y - size / 2,
      width: size,
      height: size,
      borderRadius: "50%",
      background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      opacity,
      pointerEvents: "none",
    }}
  />
);

/* ─── Spotlight Cone ─── */
const Spotlight: React.FC<{ opacity: number }> = ({ opacity }) => (
  <div
    style={{
      position: "absolute",
      top: -200,
      left: 540 - 250,
      width: 500,
      height: 1200,
      background:
        "linear-gradient(180deg, rgba(180,160,255,0.18) 0%, rgba(180,160,255,0.04) 60%, transparent 100%)",
      clipPath: "polygon(35% 0%, 65% 0%, 90% 100%, 10% 100%)",
      opacity,
      filter: "blur(30px)",
    }}
  />
);

/* ─── Vial Component ─── */
const Vial: React.FC<{
  rotateY: number;
  glowIntensity: number;
  rimOpacity: number;
  liquidShimmer: number;
}> = ({ rotateY, glowIntensity, rimOpacity, liquidShimmer }) => {
  const vialWidth = 120;
  const vialHeight = 340;
  const capHeight = 60;

  return (
    <div
      style={{
        position: "relative",
        width: vialWidth,
        height: vialHeight + capHeight,
        transform: `perspective(800px) rotateY(${rotateY}deg)`,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Outer glow */}
      <div
        style={{
          position: "absolute",
          inset: -40,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(140,100,220,0.3) 0%, transparent 70%)",
          opacity: glowIntensity,
          filter: "blur(20px)",
        }}
      />

      {/* Cap */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: vialWidth / 2 - 28,
          width: 56,
          height: capHeight,
          borderRadius: "6px 6px 2px 2px",
          background:
            "linear-gradient(135deg, #6b3fa0 0%, #4a2870 40%, #8b5fbf 70%, #5a3590 100%)",
          boxShadow: `inset -4px 0 8px rgba(0,0,0,0.4), inset 4px 0 8px rgba(180,150,255,0.2)`,
        }}
      >
        {/* Cap highlight */}
        <div
          style={{
            position: "absolute",
            top: 4,
            left: 8,
            width: 12,
            height: capHeight - 12,
            borderRadius: 3,
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.25) 0%, transparent 100%)",
          }}
        />
        {/* Cap ring */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: -4,
            right: -4,
            height: 8,
            borderRadius: 2,
            background:
              "linear-gradient(135deg, #9b7fd0 0%, #5a3590 50%, #b89ee0 100%)",
          }}
        />
      </div>

      {/* Vial neck */}
      <div
        style={{
          position: "absolute",
          top: capHeight - 2,
          left: vialWidth / 2 - 20,
          width: 40,
          height: 30,
          background:
            "linear-gradient(135deg, rgba(220,210,240,0.15) 0%, rgba(180,170,210,0.08) 100%)",
          borderLeft: "1px solid rgba(200,180,255,0.15)",
          borderRight: "1px solid rgba(200,180,255,0.1)",
        }}
      />

      {/* Main vial body */}
      <div
        style={{
          position: "absolute",
          top: capHeight + 24,
          left: vialWidth / 2 - 48,
          width: 96,
          height: vialHeight - 50,
          borderRadius: "8px 8px 20px 20px",
          background:
            "linear-gradient(135deg, rgba(200,190,230,0.08) 0%, rgba(160,150,200,0.04) 30%, rgba(220,210,240,0.1) 60%, rgba(180,170,210,0.06) 100%)",
          border: "1px solid rgba(200,180,255,0.12)",
          overflow: "hidden",
          boxShadow: `
            inset -8px 0 20px rgba(0,0,0,0.15),
            inset 8px 0 15px rgba(200,180,255,0.08),
            0 0 40px rgba(140,100,220,${glowIntensity * 0.3})
          `,
        }}
      >
        {/* Liquid fill */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 4,
            right: 4,
            height: "75%",
            borderRadius: "0 0 16px 16px",
            background: `linear-gradient(
              180deg,
              rgba(200,190,240,0.06) 0%,
              rgba(180,170,230,0.1) 30%,
              rgba(160,150,220,0.08) 100%
            )`,
          }}
        >
          {/* Liquid shimmer line */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 2,
              background: `linear-gradient(90deg,
                transparent 0%,
                rgba(200,180,255,${0.3 + liquidShimmer * 0.3}) 30%,
                rgba(255,255,255,${0.15 + liquidShimmer * 0.2}) 50%,
                rgba(200,180,255,${0.3 + liquidShimmer * 0.3}) 70%,
                transparent 100%
              )`,
            }}
          />
          {/* Internal caustic effect */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(
                ellipse at ${50 + liquidShimmer * 20}% 40%,
                rgba(200,180,255,0.08) 0%,
                transparent 60%
              )`,
            }}
          />
        </div>

        {/* Glass reflection — left edge */}
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 6,
            width: 14,
            height: "80%",
            borderRadius: 10,
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 100%)",
          }}
        />

        {/* Glass reflection — right highlight */}
        <div
          style={{
            position: "absolute",
            top: 20,
            right: 12,
            width: 6,
            height: "60%",
            borderRadius: 6,
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* Rim light — left */}
      <div
        style={{
          position: "absolute",
          top: capHeight + 30,
          left: vialWidth / 2 - 52,
          width: 3,
          height: vialHeight - 60,
          background:
            "linear-gradient(180deg, rgba(180,150,255,0.5) 0%, rgba(140,100,220,0.2) 50%, transparent 100%)",
          opacity: rimOpacity,
          filter: "blur(1px)",
          borderRadius: 2,
        }}
      />

      {/* Rim light — right */}
      <div
        style={{
          position: "absolute",
          top: capHeight + 40,
          right: vialWidth / 2 - 50,
          width: 2,
          height: vialHeight - 80,
          background:
            "linear-gradient(180deg, rgba(200,180,255,0.35) 0%, rgba(160,130,240,0.15) 50%, transparent 100%)",
          opacity: rimOpacity,
          filter: "blur(1px)",
          borderRadius: 2,
        }}
      />

      {/* Label area */}
      <div
        style={{
          position: "absolute",
          top: capHeight + 100,
          left: vialWidth / 2 - 34,
          width: 68,
          height: 80,
          borderRadius: 4,
          border: "1px solid rgba(200,180,255,0.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(180deg, rgba(200,180,255,0.04) 0%, rgba(200,180,255,0.02) 100%)",
        }}
      >
        <div
          style={{
            fontSize: 7,
            fontFamily: "'Arial', sans-serif",
            fontWeight: 700,
            color: "rgba(200,180,255,0.6)",
            letterSpacing: 1.5,
            textTransform: "uppercase",
          }}
        >
          Retatrutide
        </div>
        <div
          style={{
            fontSize: 5,
            fontFamily: "'Arial', sans-serif",
            color: "rgba(200,180,255,0.35)",
            marginTop: 4,
            letterSpacing: 0.8,
          }}
        >
          10mg/mL
        </div>
      </div>
    </div>
  );
};

/* ─── Title Reveal ─── */
const TitleReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateRight: "clamp",
  });

  const titleY = interpolate(frame, [0, 25], [30, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const letterSpacing = interpolate(frame, [0, 30], [30, 16], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const lineScale = spring({
    frame: frame - 10,
    fps,
    config: { stiffness: 60, damping: 20 },
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        opacity: titleOpacity,
        transform: `translateY(${titleY}px)`,
      }}
    >
      {/* Decorative line above */}
      <div
        style={{
          width: 200 * Math.max(0, lineScale),
          height: 1,
          background:
            "linear-gradient(90deg, transparent, rgba(180,150,255,0.6), transparent)",
          marginBottom: 20,
        }}
      />
      <div
        style={{
          fontSize: 58,
          fontFamily: "'Arial', sans-serif",
          fontWeight: 100,
          color: "white",
          letterSpacing,
          textTransform: "uppercase",
          textShadow:
            "0 0 40px rgba(140,100,220,0.5), 0 0 80px rgba(140,100,220,0.2)",
        }}
      >
        RETATRUTIDE
      </div>
      {/* Decorative line below */}
      <div
        style={{
          width: 200 * Math.max(0, lineScale),
          height: 1,
          background:
            "linear-gradient(90deg, transparent, rgba(180,150,255,0.6), transparent)",
          marginTop: 20,
        }}
      />
    </div>
  );
};

/* ─── Tagline ─── */
const Tagline: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  const y = interpolate(frame, [0, 20], [15, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${y}px)`,
        fontSize: 22,
        fontFamily: "'Arial', sans-serif",
        fontWeight: 300,
        color: "rgba(180,160,220,0.8)",
        letterSpacing: 8,
        textTransform: "uppercase",
      }}
    >
      NuroCore Labs
    </div>
  );
};

/* ─── Floating Particles ─── */
const FloatingParticles: React.FC<{ frame: number; opacity: number }> = ({
  frame,
  opacity,
}) => {
  const particles = [
    { x: 150, y: 600, size: 3, speed: 0.8, drift: 15 },
    { x: 900, y: 800, size: 2, speed: 1.2, drift: 10 },
    { x: 300, y: 1200, size: 2.5, speed: 0.6, drift: 20 },
    { x: 800, y: 1400, size: 1.5, speed: 1.0, drift: 12 },
    { x: 500, y: 500, size: 2, speed: 0.9, drift: 18 },
    { x: 700, y: 1000, size: 3, speed: 0.7, drift: 14 },
    { x: 200, y: 1600, size: 1.5, speed: 1.1, drift: 16 },
    { x: 950, y: 400, size: 2, speed: 0.5, drift: 22 },
  ];

  return (
    <>
      {particles.map((p, i) => {
        const yOff = Math.sin(frame * 0.03 * p.speed + i) * p.drift;
        const xOff = Math.cos(frame * 0.02 * p.speed + i * 2) * p.drift * 0.5;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: p.x + xOff,
              top: p.y + yOff,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              backgroundColor: `rgba(180,160,255,${opacity * 0.4})`,
              boxShadow: `0 0 ${p.size * 3}px rgba(160,140,240,${opacity * 0.3})`,
            }}
          />
        );
      })}
    </>
  );
};

/* ═══════════════════════════════════════════
   MAIN COMPOSITION
   ═══════════════════════════════════════════ */
export const RetatrutideVial: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  /* ── Global fade from black (0–30 frames / 0–1s) ── */
  const fadeIn = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  /* ── Spotlight intensity ── */
  const spotlightOpacity = interpolate(frame, [5, 35], [0, 1], {
    extrapolateRight: "clamp",
  });

  /* ── Vial entrance ── */
  const vialScale = spring({
    frame: Math.max(0, frame - 5),
    fps,
    config: { stiffness: 40, damping: 14 },
  });

  const vialY = interpolate(frame, [5, 40], [60, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  /* ── Vial rotation (frames 30–90 / 1–3s) ── */
  const rotateY = interpolate(frame, [30, 90], [-8, 8], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.sin),
  });

  /* ── Light reflection shimmer ── */
  const shimmer = Math.sin(frame * 0.08) * 0.5 + 0.5;

  /* ── Rim light pulse ── */
  const rimOpacity = interpolate(
    Math.sin(frame * 0.06),
    [-1, 1],
    [0.4, 1.0]
  );

  /* ── Glow intensity ── */
  const glowIntensity = interpolate(
    Math.sin(frame * 0.05),
    [-1, 1],
    [0.5, 1.0]
  );

  /* ── Lens flare positions (track with rotation) ── */
  const flareX = interpolate(rotateY, [-8, 8], [480, 600]);
  const flareOpacity = interpolate(
    Math.sin(frame * 0.07),
    [-1, 1],
    [0.0, 0.4]
  );

  /* ── Vial shifts up when text appears ── */
  const vialLift = interpolate(frame, [85, 100], [0, -80], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  return (
    <div
      style={{
        width,
        height,
        backgroundColor: "#050508",
        position: "relative",
        overflow: "hidden",
        opacity: fadeIn,
      }}
    >
      {/* Subtle background gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(60,40,100,0.15) 0%, transparent 60%)",
        }}
      />

      {/* Floating particles */}
      <FloatingParticles frame={frame} opacity={fadeIn} />

      {/* Spotlight */}
      <Spotlight opacity={spotlightOpacity} />

      {/* Vial container */}
      <div
        style={{
          position: "absolute",
          top: height / 2 - 220 + vialLift,
          left: width / 2 - 60,
          transform: `scale(${vialScale}) translateY(${vialY}px)`,
        }}
      >
        <Vial
          rotateY={rotateY}
          glowIntensity={glowIntensity}
          rimOpacity={rimOpacity}
          liquidShimmer={shimmer}
        />
      </div>

      {/* Floor reflection */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 400,
          background:
            "linear-gradient(0deg, rgba(60,40,100,0.06) 0%, transparent 100%)",
          opacity: spotlightOpacity,
        }}
      />

      {/* Lens flares */}
      <LensFlare
        x={flareX}
        y={height / 2 - 140 + vialLift}
        size={120}
        opacity={flareOpacity * fadeIn}
        color="rgba(180,150,255,0.4)"
      />
      <LensFlare
        x={flareX + 60}
        y={height / 2 - 180 + vialLift}
        size={60}
        opacity={flareOpacity * 0.6 * fadeIn}
        color="rgba(220,200,255,0.3)"
      />
      <LensFlare
        x={flareX - 80}
        y={height / 2 - 100 + vialLift}
        size={40}
        opacity={flareOpacity * 0.4 * fadeIn}
        color="rgba(160,130,255,0.5)"
      />

      {/* Title: appears at frame 90 (3s) */}
      <div
        style={{
          position: "absolute",
          top: height / 2 + 200,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 30,
        }}
      >
        <Sequence from={90} durationInFrames={60}>
          <TitleReveal />
        </Sequence>

        {/* Tagline: appears at frame 120 (4s) */}
        <Sequence from={120} durationInFrames={30}>
          <Tagline />
        </Sequence>
      </div>

      {/* Top vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.5) 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};
