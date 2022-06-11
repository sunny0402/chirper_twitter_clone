import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import { createStore } from "redux";

// The Provider component (which comes from the react-redux package)
// makes it possible for all components to access the store via the connect() function.

import { Provider } from "react-redux";
import reducer from "./reducers";
import middleware from "./middleware";

// ReactDOM.render(<App />, document.getElementById("root"));

// const store = createStore(reducer);

const store = createStore(reducer, middleware);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
