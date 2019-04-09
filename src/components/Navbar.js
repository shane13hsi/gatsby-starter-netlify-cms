import React from "react";
import { Link } from "gatsby";
import logo from "../img/logo.png";
import { Menu } from "antd";
import { Box, Flex } from "grid-styled";
import styled from "styled-components";

const Navbar = class extends React.Component {

  render() {
    const key = window.location.pathname.split("/")[1];

    return (
      <nav
        role="navigation"
        aria-label="main-navigation"
      >
        <Header justifyContent="space-between">
          <Box>
            <Link to="/" title="Logo">
              <img src={logo} alt="ShaneHsi" style={{ width: "64px" }}/>
            </Link>
          </Box>

          <Box mr="12px">
            <HeaderMenu mode="horizontal" selectedKeys={[key]}>
              <Menu.Item key="about">
                <Link to="/about">About</Link>
              </Menu.Item>
              <Menu.Item key="products">
                <Link to="/products">Products</Link>
              </Menu.Item>
              <Menu.Item key="blog">
                <Link to="/blog">Blog</Link>
              </Menu.Item>
              <Menu.Item key="contact">
                <Link to="/contact">Contact</Link>
              </Menu.Item>
              {/*<Menu.Item key="contact/examples">
              <Link to="/contact/examples">Form Examples</Link>
            </Menu.Item>*/}
            </HeaderMenu>
          </Box>
        </Header>
      </nav>
    );
  }
};

const Header = styled(Flex)`// styled
  & {
    box-shadow: 0 2px 8px #f0f1f2
  }
`;

const HeaderMenu = styled(Menu)`// styled
  & {
    .ant-menu-item > a {
      line-height: 62px;
    }
  }
`;

export default Navbar;
