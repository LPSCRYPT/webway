import { Canvas } from "@react-three/fiber";
import ErrorBoundary from "../shared/ErrorBoundary";
import { SceneConfiguration } from "./Config/types/scene";
import Environment from "./Elements/Environment";

const Root = ({sceneConfig}:{
  sceneConfig: SceneConfiguration
}) => {
  return <Canvas>
    <ErrorBoundary>
       <Environment environment={sceneConfig.environment}/>
     </ErrorBoundary>
  </Canvas>
}

export default Root;