import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";

const PARTICLE_COUNT = 80;
const COLS = 16;

interface ParticleProps {
  index: number;
  frame: number;
  width: number;
  height: number;
}

const Particle: React.FC<ParticleProps> = ({ index, frame, width, height }) => {
  const col = index % COLS;
  const row = Math.floor(index / COLS);
  const rows = Math.ceil(PARTICLE_COUNT / COLS);

  const spacingX = width / (COLS + 1);
  const spacingY = height / (rows + 1);

  const baseX = spacingX * (col + 1);
  const baseY = spacingY * (row + 1);

  const waveOffset = col * 0.3 + row * 0.2;
  const yDisplacement = Math.sin((frame * 0.05) + waveOffset) * 40;
  const xDisplacement = Math.cos((frame * 0.03) + waveOffset * 0.7) * 20;

  const size = interpolate(
    Math.sin((frame * 0.04) + waveOffset),
    [-1, 1],
    [6, 18]
  );

  const hue = interpolate(
    Math.sin((frame * 0.02) + waveOffset * 0.5),
    [-1, 1],
    [180, 300]
  );

  const opacity = interpolate(frame, [0, 30], [0, 0.9], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: baseX + xDisplacement - size / 2,
        top: baseY + yDisplacement - size / 2,
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: `hsla(${hue}, 80%, 60%, ${opacity})`,
        boxShadow: `0 0 ${size * 2}px hsla(${hue}, 80%, 60%, 0.4)`,
      }}
    />
  );
};

export const ParticleWave: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  return (
    <div
      style={{
        width,
        height,
        position: "relative",
        backgroundColor: "#0a0a1a",
        overflow: "hidden",
      }}
    >
      {Array.from({ length: PARTICLE_COUNT }, (_, i) => (
        <Particle
          key={i}
          index={i}
          frame={frame}
          width={width}
          height={height}
        />
      ))}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 64,
          fontWeight: 700,
          fontFamily: "sans-serif",
          color: "white",
          opacity: interpolate(frame, [30, 60], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          textShadow: "0 0 40px rgba(100, 150, 255, 0.6)",
        }}
      >
        Particle Wave
      </div>
    </div>
  );
};
