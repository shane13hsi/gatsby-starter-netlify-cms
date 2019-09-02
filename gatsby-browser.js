import React from "react";
import NotableWrapper from "./src/components/NotableWrapper";
import "prismjs/themes/prism.css";

export const wrapPageElement = ({ element, props }) => (
  <NotableWrapper {...props}>{element}</NotableWrapper>
);
