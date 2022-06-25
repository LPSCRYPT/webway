import { Canvas } from "@react-three/fiber";
import ErrorBoundary from "../shared/ErrorBoundary";
import { SceneConfiguration } from "./Config/types/scene";
import Controls from "./Controls";
import ElementsTree from "./Elements/ElementsTree";
import Environment from "./Elements/Environment";

const Root = ({ sceneConfig }: { sceneConfig: SceneConfiguration }) => {
  return (
    <Canvas>
      <ErrorBoundary>
        <Environment environment={sceneConfig.environment} />
        <ElementsTree elements={sceneConfig.elements} />
        <Controls />
      </ErrorBoundary>
    </Canvas>
  );
};

export default Root;
