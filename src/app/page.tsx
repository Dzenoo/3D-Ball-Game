"use client";

import Experience from "@/components/Experience";
import Interface from "@/components/Interface";
import { KeyboardControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export default function Home() {
  return (
    <>
      <KeyboardControls
        map={[
          {
            name: "forward",
            keys: ["ArrowUp", "KeyW"],
          },
          {
            name: "backward",
            keys: ["ArrowDown", "KeyS"],
          },
          {
            name: "rightward",
            keys: ["ArrowRight", "KeyD"],
          },
          {
            name: "leftward",
            keys: ["ArrowLeft", "KeyA"],
          },
          {
            name: "jump",
            keys: ["Space"],
          },
        ]}
      >
        <Canvas
          shadows
          camera={{
            fov: 45,
            near: 0.1,
            far: 200,
            position: [2.5, 4, 6],
          }}
        >
          <Experience />
        </Canvas>
        <Interface />
      </KeyboardControls>
    </>
  );
}
