import React from "react";
import { Link } from "gatsby";

import logo from "../img/logo_transparent.png";
import styled from "styled-components";
import { Icon } from "antd";
import { Box } from "grid-styled";

const Footer = class extends React.Component {
  render() {
    return (
      <FooterWrapper className="footer has-text-white-ter">
        <div className="content has-text-centered">
          <img
            src={logo}
            alt="ShaneHsi"
            style={{ width: "14em", height: "14em" }}
          />
        </div>
        <div className="content has-text-centered has-text-white-ter">
          <div className="container has-text-white-ter">
            <div className="columns">
              <Box width={1 / 3}>
                <section className="menu">
                  <ul className="menu-list">
                    <li>
                      <Link to="/" className="navbar-item">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item" to="/about">
                        About
                      </Link>
                    </li>
                    <li>
                      <a
                        className="navbar-item"
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
                  <ul className="menu-list">
                    <li>
                      <Link className="navbar-item" to="/blog">
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

            </div>
          </div>
        </div>
      </FooterWrapper>
    );
  }
};

const FooterWrapper = styled.footer`// styled
  & {
    background: RGBA(96, 172, 188, 1.00) !important;

    padding: 3rem 0rem 3rem;
  }
`;

const SocialBox = styled(Box)`// styled
  & {
    padding: 22px;

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

export default Footer;
