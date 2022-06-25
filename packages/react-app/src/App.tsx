import Root from "./Scene/Root";
import { Route, Switch } from "react-router-dom";

const App = ({}: { subgraphUri: string }) => {
  return (
    <div className="w-screen h-screen">
      <Switch>
        <Route path="/:tokenId">
          <Root />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
