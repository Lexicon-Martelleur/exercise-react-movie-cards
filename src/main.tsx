import React from "react";
import ReactDOM from "react-dom/client";

import { App } from "./app";
import {loadCSSVaribalesDynamically} from "./styles";

const htmlRootElement = document.documentElement;
loadCSSVaribalesDynamically(htmlRootElement);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
