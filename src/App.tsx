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
            <Link to="/clock">Date &amp; Time</Link>
          </li>
          <li>
            <Link to="/what">Whats this then?</Link>
          </li>
        </ul>
        <Switch>
          <Route exact path="/">
            <Generator />
          </Route>
          <Route path="/clock">
            <Clock />
          </Route>
          <Route path="/what">
            <div className="what">
              <h1>Cistercian Numerals</h1>
              <p>See here: <a href="https://en.wikipedia.org/wiki/Cistercian_numerals">https://en.wikipedia.org/wiki/Cistercian_numerals</a></p>
              <p>Inspired by: <a href="https://twitter.com/MathematicsUCL/status/1356558846093914114">https://twitter.com/MathematicsUCL/status/1356558846093914114</a></p>
              <p>Code here: <a href="https://github.com/kouphax/cistercian-numbers">https://github.com/kouphax/cistercian-numbers</a></p>
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
