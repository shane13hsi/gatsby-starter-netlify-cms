import React from "react";
import { Link } from "gatsby";

import logo from "../img/logo_transparent.png";
import styled from "styled-components";
import { Icon } from "antd";
import { Box, Flex } from "grid-styled";

const Footer = class extends React.Component {
  render() {
    return (
      <FooterWrapper>
        <Flex justifyContent={"center"}>
          <img
            src={logo}
            alt="ShaneHsi"
            style={{ width: "14em", height: "14em" }}
          />
        </Flex>
        <Flex justifyContent={"center"}>
          <FooterMenu>
            <Box width={1 / 3}>
              <section>
                <ul>
                  <li>
                    <Link to="/">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to={"/about"}>
                      About
                    </Link>
                  </li>
                  <li>
                    <a
                      href="/admin/"
                      target="_blank"
                      rel="noopener noreferrer">
                      Admin
                    </a>
                  </li>
                </ul>
              </section>
            </Box>

            <Box width={1 / 3}>
              <section>
                <ul>
                  <li>
                    <Link to={"/blog"}>
                      Latest Stories
                    </Link>
                  </li>
                </ul>
              </section>
            </Box>

            <SocialBox width={1 / 3}>
              <a title="github" href="https://github.com">
                <Icon type="github"/>
              </a>
              <a title="twitter" href="https://twitter.com">
                <Icon type="twitter"/>
              </a>
              <a title="instagram" href="https://instagram.com">
                <Icon type="instagram"/>
              </a>
              <a title="zhihu" href="https://zhihu.com">
                <Icon type="zhihu"/>
              </a>
            </SocialBox>

          </FooterMenu>
        </Flex>
      </FooterWrapper>
    );
  }
};

const FooterWrapper = styled.footer`// styled
  & {
    background: #60acbc !important;
    padding: 3rem 0rem 3rem;
  }
`;

const SocialBox = styled(Box)`// styled
  & {
    padding: 6px;

    a {
      padding: .5em .5em .3em .5em;
      border-radius: 1em;
      background-color: #fff;
      margin: .5em;
      width: 1em;
      height: 1em;
      vertical-align: middle;
      display: inline;
      color: #666;


      .anticon {
        vertical-align: -1px;

      }
    }
  }
`;

const FooterMenu = styled(Flex)`// styled
  & {
    width: 80%;

    ul {
      list-style: none;

      a {
        border-radius: 2px;
        color: #f5f5f5;
        display: block;
        padding: .5em .75em;
        font-size: 16px;
        font-weight: 300;
      }
    }
  }
`;

export default Footer;
