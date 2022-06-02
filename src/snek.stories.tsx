import React from "react";
import { SnekProps, TheSnek } from "./snek";

import "./snek.css";

export default {
  title: "Snek",
  component: TheSnek,
};

const Template = (args: SnekProps) => (
  <div
    className="snek"
    style={{
      gridTemplate: "repeat(5, 1fr) / repeat(5, 1fr)",
      width: "8rem",
      height: "8rem",
    }}
  >
    <TheSnek {...args} />
  </div>
);

const defaultSnekProps: SnekProps = {
  direction: "Right",
  snek: [
    [3, 1],
    [2, 1],
    [1, 1],
    [1, 2],
  ],
};

export const SimpleSnekStory = () => <Template {...defaultSnekProps} />;

export const SnekStoryWithControls = Template.bind({});
SnekStoryWithControls.args = defaultSnekProps;
