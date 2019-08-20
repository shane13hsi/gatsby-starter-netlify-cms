import * as React from "react";
import { Tree } from "antd";
import { graphql, Link, StaticQuery } from "gatsby";
import _ from "lodash";
import { navigate } from "@reach/router";
import { parse } from "query-string";
import { Box } from "grid-styled";
import SplitPane from "react-split-pane";

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
        return <TreeNode title={item.node.title} key={item.id}/>;
      } else {
        return <TreeNode title={item.node.title} key={item.id}>
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
    <SplitPane split="vertical" minSize={250}>
      <Box m={"12px 18px"}>
        <Tree showLine
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
      </Box>
      <Box>
        {
          _.map(fileList, item => {
            return <Box key={item.id}>
              <Link
                to={item.node.data.fields.slug + location.search}>
                {item.node.data.frontmatter.title}
              </Link>
            </Box>;
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

class TreeNodeModel {
  id;
  node;
  children;
  pid;
  parent;

  static serialize(o) {
    if (o == null) return null;
    const jsonString = JSON.stringify(o, function(key, value) {
      if (key === "parent") {
        return undefined;
      } else if (key === "pid") {
        return undefined;
      } else {
        return value;
      }
    });
    return JSON.parse(jsonString);
  }
}

class FolderConverter {
  flattenData(data) {
    const flatData = _.map(data.allMarkdownRemark.edges, item => {
      const path = _.get(item, "node.fileAbsolutePath");
      return {
        splitPath: path.split("blog")[1].split("/"),
        fileAbsolutePath: path,
        data: item.node
      };
    });
    return flatData;
  }

  generateNodeMap(flatData) {
    let root = new TreeNodeModel();
    root.id = "root";
    root.node = { title: "root", type: "dir" };
    root.parent = null;
    root.pid = null;
    let nodeMap = new Map();
    // nodeMap
    nodeMap.set(root.id, root);

    _.forEach(_.reverse(flatData), ({ splitPath, fileAbsolutePath, data }, idx) => {
      _.forEach(splitPath, (item2, idx2) => {
        if (item2 !== "") { // 非根节点
          let tm = new TreeNodeModel();
          tm.id = `${item2}.${idx2}`;
          tm.node = { title: item2 };
          if (item2.indexOf(".md") > -1) {
            tm.node.type = "file";
            tm.node.data = data;
          }
          if (nodeMap.get(tm.id) == null) {
            nodeMap.set(tm.id, tm);
            let pid = splitPath[idx2 - 1] === "" ? "root" : `${splitPath[idx2 - 1]}.${idx2 - 1}`;
            tm.pid = pid;
            tm.parent = nodeMap.get(pid);
            if (tm.parent.children == null) {
              tm.parent.children = [];
            }
            tm.parent.children.push(tm);
          }
        }
      });
    });

    return nodeMap;
  }

  recurToRemoveFile(node) {
    if (Array.isArray(node.children)) {
      node.children = node.children.filter(
        (child) => {
          if (child.node.type === "file") {
            return false;
          } else {
            this.recurToRemoveFile(child);
            return true;
          }
        }
      );
    }
  }

  recurToGetChildrenFileList(fileList, node) {
    if (node == null) {
      return;
    }
    _.forEach(node.children, item => {
      if (item.node.type === "file") {
        fileList.push(item);
      }
      this.recurToGetChildrenFileList(fileList, item);
    });

  }
}

