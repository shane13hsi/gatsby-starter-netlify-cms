import * as React from "react";
import { Icon, Tree } from "antd";
import { graphql, Link, StaticQuery } from "gatsby";
import _ from "lodash";
import { navigate } from "@reach/router";
import { parse } from "query-string";
import { Box } from "grid-styled";
import SplitPane from "react-split-pane";
import { FolderConverter } from "../services/FolderConverter";
import { TreeNodeModel } from "../services/TreeNodeModel";
import styled from "styled-components";
import cx from "classnames";

const { TreeNode } = Tree;

const NotableDirectoryTree = (props) => {
  const { data, location } = props;

  const folderConverter = new FolderConverter();
  const flatData = folderConverter.flattenData(data);
  const nodeMap = folderConverter.generateNodeMap(flatData);
  const treeJson = TreeNodeModel.serialize(nodeMap.get("root"));
  folderConverter.recurToRemoveFile(treeJson);

  function recurTreeNodeRender(nodeList) {
    return _.map(nodeList, item => {
      if (_.isEmpty(item.children)) {
        return <TreeNode icon={<Icon type="folder" style={{ color: "#fff" }}/>}
                         title={item.node.title} key={item.id}/>;
      } else {
        return <TreeNode icon={<Icon type="folder" style={{ color: "#fff" }}/>} title={item.node.title} key={item.id}>
          {recurTreeNodeRender(item.children)}
        </TreeNode>;
      }
    });
  }

  const query = parse(location.search);
  let expandedKeys = [];
  if (query.ek != null) {
    expandedKeys = expandedKeys.concat(query.ek.split("-"));
  }

  const slug = decodeURIComponent(location.pathname);
  if (slug !== "/") {
    expandedKeys.push(slug);
  } else {
    //
  }

  let fileList = [];
  if (query.sk != null) {
    folderConverter.recurToGetChildrenFileList(fileList, nodeMap.get(query.sk));
  } else { // 否则全部 list
    folderConverter.recurToGetChildrenFileList(fileList, nodeMap.get("root"));
  }

  return (
    <SplitPane split="vertical"
               defaultSize={250}
               minSize={200}
               maxSize={300}
               pane1Style={{
                 background: "#20262B"
               }}>
      <TreeBoxWrapper m={"12px 18px"}>
        <Tree
          showIcon={true}
          onSelect={(selectedKeys) => {
            const sks = _.filter(selectedKeys, item => !_.includes(item, "blog"));
            const query = new URLSearchParams(location.search);
            if (_.isEmpty(sks)) {
              query.delete("sk");
            } else {
              query.set("sk", sks[0]);
            }
            navigate(location.pathname + "?" + query.toString());
          }}
          onExpand={(expandedKeys) => {
            const eks = _.filter(expandedKeys, item => !_.includes(item, "blog"));
            const query = new URLSearchParams(location.search);
            if (_.isEmpty(eks)) {
              query.delete("ek");
            } else {
              query.set("ek", eks.join("-"));
            }
            navigate(location.pathname + "?" + query.toString());
          }}
          expandedKeys={expandedKeys}
          defaultExpandParent={true}
        >
          {recurTreeNodeRender(treeJson.children)}
        </Tree>
      </TreeBoxWrapper>
      <Box mt={"8px"}>
        {
          _.map(fileList, item => {
            return <Link key={item.id}
                         to={item.node.data.fields.slug + location.search}>
              <FileBox p={"8px 12px"}
                       className={cx({
                         selected: item.node.data.fields.slug === slug
                       })}
              >
                {item.node.data.frontmatter.title}
              </FileBox>
            </Link>;
          })
        }
      </Box>
    </SplitPane>
  );
};

export default (props) => (
  <StaticQuery
    query={graphql`
      query BlogTreeQuery {
        allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}, filter: {frontmatter: {templateKey: {eq: "blog-post"}}}) {
          edges {
            node {
              id
              fileAbsolutePath
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
    `}
    render={(data) => <NotableDirectoryTree {...props} data={data}/>}
  />
)

const TreeBoxWrapper = styled(Box)`// styled
  & {
    .ant-tree-title {
      color: #fff;
    }

    .ant-tree.ant-tree-show-line li span.ant-tree-switcher {
      background: #20262B;
      color: #fff;
    }

    .ant-tree li .ant-tree-node-content-wrapper.ant-tree-node-selected,
    .ant-tree li .ant-tree-node-content-wrapper:hover {
      background: #13171A;
    }

    .ant-tree {
      color: #fff;
    }
  }
`;

const FileBox = styled(Box)`// styled
  & {
    transition: all 0.3s;

    &:hover {
      background: #F5F5F5;
    }

    &.selected {
      background: #EBEBEB;
    }
  }
`;
