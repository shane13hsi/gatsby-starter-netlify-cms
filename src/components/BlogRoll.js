import React from "react";
import PropTypes from "prop-types";
import { graphql, Link, StaticQuery } from "gatsby";
import { Box, Flex } from "grid-styled";
import { Button, Card, Typography } from "antd";
import styled from "styled-components";

const { Title, Paragraph, Text } = Typography;

class BlogRoll extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;

    return (
      <BlogRollWrapper>
        {posts &&
        posts.map(({ node: post }) => (
          <Box key={post.id} width={1 / 2} px={"12px"} mb={"24px"}>
            <Card style={{ minHeight: 345 }}>
              <article>
                <p>
                  <Link
                    to={post.fields.slug}>
                    <Title level={4}>
                      {post.frontmatter.title}
                    </Title>
                  </Link>
                  <Text>
                    {post.frontmatter.date}
                  </Text>
                </p>
                <Paragraph>
                  {post.excerpt}
                  <br/>
                  <br/>
                  <Button>
                    <Link to={post.fields.slug}>
                      Keep Reading →
                    </Link>
                  </Button>
                </Paragraph>
              </article>
            </Card>
          </Box>
        ))}
      </BlogRollWrapper>
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

const BlogRollWrapper = styled(Flex)`// styled
  & {
    margin-left: -12px !important;
    margin-right: -12px !important;
    flex-wrap: wrap;
  }
`;
