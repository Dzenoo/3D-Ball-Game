import Lights from "./Lights";
import Level from "./Level";
import { Physics } from "@react-three/rapier";
import Player from "./Player";
import useGame from "@/hooks/useGame";

export default function Experience() {
  const blocksCount = useGame((state) => state.blocksCount);
  const blocksSeed = useGame((state) => state.blocksSeed);

  return (
    <>
      <color args={["#bdedfc"]} attach="background" />
      <Physics>
        <Lights />
        <Level count={blocksCount} seed={blocksSeed} />
        <Player />
      </Physics>
    </>
  );
}
