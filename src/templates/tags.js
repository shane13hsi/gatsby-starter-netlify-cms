import React from "react";
import Helmet from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import { Button, Typography } from "antd";
import { Box, Flex } from "grid-styled";

const { Title } = Typography;

class TagRoute extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges;
    const postLinks = posts.map(post => (
      <li key={post.node.fields.slug}>
        <Link to={post.node.fields.slug}>
          <div>{post.node.frontmatter.title}</div>
        </Link>
      </li>
    ));
    const tag = this.props.pageContext.tag;
    const title = this.props.data.site.siteMetadata.title;
    const totalCount = this.props.data.allMarkdownRemark.totalCount;
    const tagHeader = `${totalCount} post${
      totalCount === 1 ? "" : "s"
      } tagged with “${tag}”`;

    return (
      <Layout>
        <Flex justifyContent={"center"} style={{ margin: "48px 24px" }}>
          <Box width={8 / 12}>
            <Helmet title={`${tag} | ${title}`}/>
            <Title level={3}>{tagHeader}</Title>
            <ul>{postLinks}</ul>
            <Button>
              <Link to="/tags/">Browse all tags</Link>
            </Button>
          </Box>
        </Flex>
      </Layout>
    );
  }
}

export default TagRoute;

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
