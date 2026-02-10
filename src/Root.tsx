import React from "react";
import { Composition } from "remotion";
import { FadeInText } from "./compositions/FadeInText";
import { BouncyTitle } from "./compositions/BouncyTitle";
import { ParticleWave } from "./compositions/ParticleWave";
import { RetatrutideVial } from "./compositions/RetatrutideVial";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="FadeInText"
        component={FadeInText}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="BouncyTitle"
        component={BouncyTitle}
        durationInFrames={120}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="ParticleWave"
        component={ParticleWave}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="RetatrutideVial"
        component={RetatrutideVial}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
