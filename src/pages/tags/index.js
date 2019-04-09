import React from "react";
import { kebabCase } from "lodash";
import Helmet from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../../components/Layout";
import { Badge, Tag, Typography } from "antd";
import { Box, Flex } from "grid-styled";

const { Title } = Typography;

const TagsPage = ({
                    data: {
                      allMarkdownRemark: { group },
                      site: {
                        siteMetadata: { title }
                      }
                    }
                  }) => (
  <Layout>
    <Flex justifyContent={"center"} style={{ margin: "48px 24px" }}>
      <Box width={8 / 12}>
        <Helmet title={`Tags | ${title}`}/>
        <Title level={2}>Tags</Title>
        <Flex>
          {group.map(tag => (
            <Box key={tag.fieldValue} mr={"22px"} mb={"12px"}>
              <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                <Badge count={tag.totalCount}>
                  <Tag>{tag.fieldValue}</Tag>
                </Badge>
              </Link>
            </Box>
          ))}
        </Flex>
      </Box>
    </Flex>
  </Layout>
);

export default TagsPage;

export const tagPageQuery = graphql`
  query TagsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 1000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
