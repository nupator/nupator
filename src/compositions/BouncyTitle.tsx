import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

export const BouncyTitle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    config: { stiffness: 80, damping: 8, mass: 1 },
  });

  const rotation = interpolate(frame, [0, 30], [-15, 0], {
    extrapolateRight: "clamp",
  });

  const bgHue = interpolate(frame, [0, 120], [220, 280]);

  return (
    <div
      style={{
        width,
        height,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: `linear-gradient(135deg, hsl(${bgHue}, 70%, 15%), hsl(${bgHue + 40}, 70%, 25%))`,
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          transform: `scale(${scale}) rotate(${rotation}deg)`,
          fontSize: 100,
          fontWeight: 900,
          color: "white",
          textShadow: "0 4px 30px rgba(0,0,0,0.5)",
        }}
      >
        Remotion
      </div>
      <div
        style={{
          opacity: interpolate(frame, [40, 70], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          transform: `translateY(${interpolate(frame, [40, 70], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
          fontSize: 36,
          color: "rgba(255,255,255,0.8)",
          marginTop: 20,
          fontWeight: 300,
        }}
      >
        Programmatic video creation
      </div>
    </div>
  );
};
