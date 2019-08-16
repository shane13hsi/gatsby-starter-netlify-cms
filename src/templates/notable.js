import * as React from "react";
import SplitPane from "react-split-pane";
import styled from "styled-components";
import { Box } from "grid-styled";
import NodeDirectoryTree from "../components/notableDirectoryTree";

const Notable = (props) => {
  return <Wrapper>
    <SplitPane split="vertical" minSize={300}>
      <Box m={"12px 18px"}>
        <NodeDirectoryTree/>
      </Box>
      <SplitPane split="vertical" minSize={300}>
        <div>2</div>
        <div>3</div>
      </SplitPane>
    </SplitPane>
  </Wrapper>;
};

export default Notable;

const Wrapper = styled.div`// styled
  & {
    .Resizer {
      background: #000;
      opacity: .2;
      z-index: 1;
      box-sizing: border-box;
      background-clip: padding-box;
    }

    .Resizer:hover {
      transition: all 2s ease;
    }

    .Resizer.horizontal {
      height: 11px;
      margin: -5px 0;
      border-top: 5px solid rgba(255, 255, 255, 0);
      border-bottom: 5px solid rgba(255, 255, 255, 0);
      cursor: row-resize;
      width: 100%;
    }

    .Resizer.horizontal:hover {
      border-top: 5px solid rgba(0, 0, 0, 0.5);
      border-bottom: 5px solid rgba(0, 0, 0, 0.5);
    }

    .Resizer.vertical {
      width: 11px;
      margin: 0 -5px;
      border-left: 5px solid rgba(255, 255, 255, 0);
      border-right: 5px solid rgba(255, 255, 255, 0);
      cursor: col-resize;
    }

    .Resizer.vertical:hover {
      border-left: 5px solid rgba(0, 0, 0, 0.5);
      border-right: 5px solid rgba(0, 0, 0, 0.5);
    }

    .Resizer.disabled {
      cursor: not-allowed;
    }

    .Resizer.disabled:hover {
      border-color: transparent;
    }
  }
`;
