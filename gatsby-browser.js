import React from "react";
import NotableWrapper from "./src/components/NotableWrapper";

export const wrapPageElement = ({ element, props }) => (
  <NotableWrapper {...props}>{element}</NotableWrapper>
);
