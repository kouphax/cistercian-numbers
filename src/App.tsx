import React from "react";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import Generator from "./Generator";
import Clock from "./Clock";

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Number</Link>
          </li>
          <li>
            <Link to="/clock">Clock</Link>
          </li>
        </ul>
        <hr />
        <Switch>
          <Route exact path="/">
            <Generator />
          </Route>
          <Route path="/clock">
            <Clock />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
