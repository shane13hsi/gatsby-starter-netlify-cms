import React from "react";
import PropTypes from "prop-types";
import { graphql, Link, StaticQuery } from "gatsby";
import { Box, Flex } from "grid-styled";
import { Button, Card } from "antd";

class BlogRoll extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;

    return (
      <Flex flexWrap={"wrap"} mx={"-12px"}>
        {posts &&
        posts.map(({ node: post }) => (
          <Box key={post.id} width={1 / 2} px={"12px"} mb={"24px"}>
            <Card style={{ minHeight: 335 }}>
              <article>
                <p>
                  <Link
                    className="title has-text-primary is-size-4"
                    to={post.fields.slug}>
                    {post.frontmatter.title}
                  </Link>
                  <span> &bull; </span>
                  <span className="subtitle is-size-5 is-block">
                    {post.frontmatter.date}
                  </span>
                </p>
                <p>
                  {post.excerpt}
                  <br/>
                  <br/>
                  <Button>
                    <Link to={post.fields.slug}>
                      Keep Reading →
                    </Link>
                  </Button>
                </p>
              </article>
            </Card>
          </Box>
        ))}
      </Flex>
    );
  }
}

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  })
};

export default () => (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                date(formatString: "MMMM DD, YYYY")
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <BlogRoll data={data} count={count}/>}
  />
)
