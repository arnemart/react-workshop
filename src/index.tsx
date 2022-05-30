import React from "react";
import ReactDOM from "react-dom/client";

import SnekGame from "./snek";

if (module.hot) {
  module.hot.accept();
}

ReactDOM.createRoot(document.getElementById("app")).render(<SnekGame />);
