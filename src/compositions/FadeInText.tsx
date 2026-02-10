import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Sequence,
} from "remotion";

const Word: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  const translateY = interpolate(frame, [0, 20], [30, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <span
      style={{
        display: "inline-block",
        opacity,
        transform: `translateY(${translateY}px)`,
        marginRight: 20,
      }}
    >
      {text}
    </span>
  );
};

export const FadeInText: React.FC = () => {
  const { width, height } = useVideoConfig();
  const words = ["Create", "animations", "with", "Remotion"];

  return (
    <div
      style={{
        width,
        height,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1a1a2e",
        fontFamily: "sans-serif",
        fontSize: 80,
        fontWeight: "bold",
        color: "#e94560",
      }}
    >
      {words.map((word, i) => (
        <Sequence key={word} from={i * 15} durationInFrames={150 - i * 15}>
          <Word text={word} />
        </Sequence>
      ))}
    </div>
  );
};
