import React, { Component } from "react";
import { connect } from "react-redux";
import AppContainer from "./components/AppContainer";
import AppEditor from "./components/AppEditor";
import EditJournal from "./components/EditJournal";
import NavBar from "./components/NavBar";
import Journals from "./components/Journals";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { fetchTasks } from "./actions/task";

import "./App.css";

class App extends Component {
  componentDidMount() {
    this.props.fetchTasks();
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/" component={AppContainer} />
          <Route exact path="/journals" component={Journals} />
          <Route exact path="/journals/:id" component={EditJournal} />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchTasks: () => dispatch(fetchTasks())
});

export default withRouter(connect(null, mapDispatchToProps)(App));
