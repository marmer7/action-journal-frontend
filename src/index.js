import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import editorReducer from "./reducers/editorReducer";
import taskReducer from "./reducers/taskReducer";
// import usersReducer from "./reducers/usersReducer";
// import registerServiceWorker from "./registerServiceWorker";

const rootReducer = combineReducers({ editorReducer, taskReducer });

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

console.log("Redux store state: ", store.get);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
// registerServiceWorker();
