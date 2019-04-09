import React from "react";
import PropTypes from "prop-types";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import BlogRoll from "../components/BlogRoll";
import { Button } from "antd";
import { Box, Flex } from "grid-styled";
import styled from "styled-components";

export const IndexPageTemplate = ({
                                    image,
                                    title,
                                    heading,
                                    subheading,
                                    mainpitch,
                                    description,
                                    intro
                                  }) => (
  <Flex justifyContent={"center"} style={{ margin: 48 }}>

    <Box width={2 / 3}>
      <Title>
        Latest stories
      </Title>

      <BlogRoll/>

      <Flex mt={"48px"} justifyContent={"center"}>
        <Button>
          <Link to="/blog">
            Read more
          </Link>
        </Button>
      </Flex>
    </Box>

  </Flex>
);

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  mainpitch: PropTypes.object,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array
  })
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        mainpitch={frontmatter.mainpitch}
        description={frontmatter.description}
        intro={frontmatter.intro}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        subheading
        mainpitch {
          title
          description
        }
        description
        intro {
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            text
          }
          heading
          description
        }
      }
    }
  }
`;

const Title = styled(Box)`// styled
  & {
    box-sizing: border-box;
    margin-bottom: 18px;
    font-size: 32px;
    font-weight: 500;
  }
`;
