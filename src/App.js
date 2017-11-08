import React, { Component } from "react";
import NavBar from "./components/NavBar";
import AppContainer from "./components/AppContainer";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <AppContainer />
      </div>
    );
  }
}

export default App;
