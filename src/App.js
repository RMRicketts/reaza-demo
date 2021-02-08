import React from "react";
import { Route, withRouter } from "react-router-dom";
import Lookup from "./components/Lookup";
import Report from "./components/Report";

class App extends React.Component {
  render() {
    return (
      <main>
        <Route exact path="/" component={Lookup} />
        <Route path="/:mid" component={Report} />
      </main>
    );
  }
}

export default withRouter(App);
