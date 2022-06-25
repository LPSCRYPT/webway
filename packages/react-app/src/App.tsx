import Root from "./Scene/Root";
import marbleScene from './Scene/Config/marbleScene'

const App = ({}:{subgraphUri: string}) => {

return (
    <Root sceneConfig={marbleScene} />
);
}

export default App