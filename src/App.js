import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import Clock from "./Clock";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <div className="Display">
          <Clock />
        </div>
      </div>
    </Provider>
  );
}

export default App;
