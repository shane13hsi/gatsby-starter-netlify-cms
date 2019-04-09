import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import Helmet from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import { Tag, Typography } from "antd";
import { Box, Flex } from "grid-styled";

const { Title, Paragraph } = Typography;

export const BlogPostTemplate = ({
                                   content,
                                   contentComponent,
                                   description,
                                   tags,
                                   title,
                                   helmet
                                 }) => {
  const PostContent = contentComponent || Content;

  return (
    <section>
      {helmet || ""}
      <Flex justifyContent={"center"} style={{ margin: "48px 24px" }}>
        <Box width={4 / 5}>
          <Title>
            {title}
          </Title>
          <Paragraph>{description}</Paragraph>

          <PostContent content={content}/>
          {tags && tags.length ? (
            <div style={{ marginTop: `4rem` }}>
              <h4>Tags</h4>
              <Flex>
                {tags.map(tag => (
                  <Box key={tag + `tag`}>
                    <Link to={`/tags/${kebabCase(tag)}/`}>
                      <Tag>
                        {tag}
                      </Tag>
                    </Link>
                  </Box>
                ))}
              </Flex>
            </div>
          ) : null}
        </Box>
      </Flex>
    </section>
  );
};

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object
};

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
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
    </Layout>
  );
};

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object
  })
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
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
