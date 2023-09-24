import React from "react";
import { createRoot } from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux-toolkit/store";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
//continue from 25min
