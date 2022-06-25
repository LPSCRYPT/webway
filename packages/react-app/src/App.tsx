import Root from "./Scene/Root";
import marbleScene from './Scene/Config/marbleScene'

const App = ({}:{subgraphUri: string}) => {

return (
    <div className="w-screen h-screen">
    <Root sceneConfig={marbleScene} />
</div>
);
}

export default App