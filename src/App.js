import React, { Component } from "react";
import AppContainer from "./components/AppContainer";
import NavBar from "./components/NavBar";
import Journals from "./components/Journals";
import JournalItem from "./components/JournalItem";
import { Route, Switch, Redirect } from "react-router-dom";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/" component={AppContainer} />
          <Route exact path="/journals" component={Journals} />
          <Route path="/journals/:id" component={JournalItem} />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

export default App;
