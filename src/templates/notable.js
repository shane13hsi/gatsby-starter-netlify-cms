import * as React from "react";
import SplitPane from "react-split-pane";
import styled from "styled-components";
import { Box } from "grid-styled";
import NotableDirectoryTree from "../components/NotableDirectoryTree";
import { HTMLContent } from "../components/Content";
import Helmet from "react-helmet";
import { BlogPostTemplate } from "./blog-post";
import { graphql } from "gatsby";

const Notable = (props) => {
  const { markdownRemark: post } = props.data;

  return <Wrapper>
    <SplitPane split="vertical" defaultSize={500} minSize={500} maxSize={600}>
      <NotableDirectoryTree {...props}/>
      <Box>
        <BlogPostTemplate
          content={post.html}
          contentComponent={HTMLContent}
          description={post.frontmatter.description}
          helmet={
            <Helmet titleTemplate="%s | Blog">
              <title>{`${post.frontmatter.title}`}</title>
              <meta
                name="description"
                content={`${post.frontmatter.description}`}
              />
            </Helmet>
          }
          tags={post.frontmatter.tags}
          title={post.frontmatter.title}
        />
      </Box>
    </SplitPane>
  </Wrapper>;
};

export default Notable;

export const pageQuery = graphql`
  query NotableByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
      }
    }
  }
`;

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
