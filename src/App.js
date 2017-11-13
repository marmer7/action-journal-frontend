import React, { Component } from "react";
import AppContainer from "./components/AppContainer";
import NavBar from "./components/NavBar";
import Journals from "./components/Journals";
import { Route, Switch, Redirect } from "react-router-dom";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/" component={AppContainer} />
          <Route path="/journals" component={Journals} />
          <Redirect path="/" />
        </Switch>
      </div>
    );
  }
}

export default App;
