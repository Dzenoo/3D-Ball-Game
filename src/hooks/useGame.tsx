import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

type State = {
  blocksSeed: number;
  blocksCount: number;
  startTime: number;
  endTime: number;
  phase: "ready" | "playing" | "ended";
};

type Actions = {
  start: () => void;
  restart: () => void;
  end: () => void;
};

type Store = State & Actions;

export default create(
  subscribeWithSelector<Store>((set) => {
    return {
      blocksSeed: 0,
      blocksCount: 10,
      startTime: 0,
      endTime: 0,
      phase: "ready",
      start: () => {
        set((state: any) => {
          if (state.phase === "ready") {
            return { phase: "playing", startTime: Date.now() };
          }

          return {};
        });
      },
      restart: () => {
        set((state: any) => {
          if (state.phase === "playing" || state.phase === "ended") {
            return { phase: "ready", blocksSeed: Math.random() };
          }

          return {};
        });
      },
      end: () => {
        set((state: any) => {
          if (state.phase === "playing") {
            return { phase: "ended", endTime: Date.now() };
          }

          return {};
        });
      },
    };
  })
);
