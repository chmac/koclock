import React from "react";
import { Provider } from "react-redux";
// import SevenSegmentDisplay from "react-seven-segment-display";
import Display from "seven-segment-display";
import store from "./store";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <div className="Display">
          {/* <SevenSegmentDisplay value={3} /> */}
          <Display value="1204" digitCount={4} />
        </div>
      </div>
    </Provider>
  );
}

export default App;
