import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import Growl, { GrowlComponent } from "./module";

ReactDOM.render(
  <div>
    <GrowlComponent />
    <div className="buttons">
      <button onClick={() => Growl("Show")}>Show</button>
    </div>
  </div>,
  document.getElementById("root")
);
