import useGame from "@/hooks/useGame";
import { useKeyboardControls } from "@react-three/drei";
import { addEffect } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";

const Interface = () => {
  const time = useRef<any>();

  const restart = useGame((state) => state.restart);
  const phase = useGame((state) => state.phase);

  const forward = useKeyboardControls((state) => state.forward);
  const backward = useKeyboardControls((state) => state.backward);
  const rightward = useKeyboardControls((state) => state.rightward);
  const leftward = useKeyboardControls((state) => state.leftward);
  const jump = useKeyboardControls((state) => state.jump);

  useEffect(() => {
    const unsubscribeEffect = addEffect(() => {
      const state = useGame.getState();

      let elapsedTime: any = 0;

      if (state.phase === "playing") elapsedTime = Date.now() - state.startTime;
      else if (state.phase === "ended")
        elapsedTime = state.endTime - state.startTime;

      elapsedTime /= 1000;
      elapsedTime = elapsedTime.toFixed(2);

      if (time.current) time.current.textContent = elapsedTime;
    });

    return () => {
      unsubscribeEffect();
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full">
      <div
        className="absolute top-[15%] left-0 w-full text-white text-3xl bg-[#00000033] pt-1 text-center"
        ref={time}
      >
        0.00
      </div>
      {phase === "ended" && (
        <div
          className="flex justify-center absolute top-[40%] left-0 w-full text-white text-7xl bg-[#00000033] pt-1 text-center cursor-pointer"
          onClick={restart}
        >
          Restart
        </div>
      )}
      <div className="absolute bottom-[10%] left-0 w-full">
        <div className="flex justify-center">
          <div
            className={`w-10 h-10 m-1 border bg-[#ffffff33] ${
              forward ? "bg-[#ffffff99]" : ""
            }`}
          ></div>
        </div>
        <div className="flex justify-center">
          <div
            className={`w-10 h-10 m-1 border bg-[#ffffff33] ${
              leftward ? "bg-[#ffffff99]" : ""
            }`}
          ></div>
          <div
            className={`w-10 h-10 m-1 border bg-[#ffffff33] ${
              backward ? "bg-[#ffffff99]" : ""
            }`}
          ></div>
          <div
            className={`w-10 h-10 m-1 border bg-[#ffffff33] ${
              rightward ? "bg-[#ffffff99]" : ""
            }`}
          ></div>
        </div>
        <div className="flex justify-center">
          <div
            className={`h-10 m-1 border bg-[#ffffff33] w-[144px]  ${
              jump ? "bg-[#ffffff99]" : ""
            }`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Interface;
