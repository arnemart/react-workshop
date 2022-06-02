import React from "react";
import { TheSnek } from "./snek";

import "./snek.css";

export default {};

export const JustTheSnek = () => (
  <div
    className="snek"
    style={{
      gridTemplate: "repeat(5, 1fr) / repeat(5, 1fr)",
      width: "8rem",
      height: "8rem",
    }}
  >
    <TheSnek
      direction="Right"
      snek={[
        [3, 1],
        [2, 1],
        [1, 1],
        [1, 2],
      ]}
    />
  </div>
);
