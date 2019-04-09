import React from "react";

import Layout from "../../components/Layout";
import BlogRoll from "../../components/BlogRoll";
import { Box, Flex } from "grid-styled";

export default class BlogIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <Flex justifyContent={"center"} style={{ margin: "48px 24px" }}>
          <Box width={10 / 12}>
            <BlogRoll/>
          </Box>
        </Flex>
      </Layout>
    );
  }
}
