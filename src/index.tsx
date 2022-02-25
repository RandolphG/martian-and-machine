import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";
import { StoreProvider } from "./context";
import Routes from "./routes";
import "./theme/_styles.scss";

ReactDOM.render(
  <StoreProvider>
    <Router>
      <Routes />
    </Router>
  </StoreProvider>,
  document.getElementById("root")
);
