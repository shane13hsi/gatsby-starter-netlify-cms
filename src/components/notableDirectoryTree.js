import * as React from "react";
import { Tree } from "antd";
import { graphql, StaticQuery } from "gatsby";
import _ from "lodash";


const { TreeNode } = Tree;

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

const NodeDirectoryTree = (props) => {

  const flatData = _.map(props.data.allMarkdownRemark.edges, item => {
    const path = _.get(item, "node.fileAbsolutePath");
    return path.split("blog")[1].split("/");
  });

  let root = new TreeNodeModel();
  root.id = "root";
  root.node = { title: "root", type: "dir" };
  root.parent = null;
  root.pid = null;
  let nodeMap = new Map();
  nodeMap.set(root.id, root);
  console.log(flatData);

  _.forEach(flatData, (item, idx) => {
    _.forEach(item, (item2, idx2) => {
      if (item2 !== "") { // 非根节点
        let tm = new TreeNodeModel();
        tm.id = `${item2}(${idx}.${idx2})`;
        tm.node = { title: item2 };
        if (item2.indexOf(".md") > -1) {
          tm.node.type = "file";
        }
        if (nodeMap.get(tm.id) == null) {
          nodeMap.set(tm.id, tm);
          let pid = item[idx2 - 1] === "" ? "root" : `${item[idx2 - 1]}(${idx}.${idx2 - 1})`;
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

  const treeJson = TreeNodeModel.serialize(root);
  console.log(treeJson);

  function recurTreeNode(nodeList) {
    return _.map(nodeList, item => {
      if (_.isEmpty(item.children)) {
        return <TreeNode title={item.node.title} key={item.id}/>;
      } else {
        return <TreeNode title={item.node.title} key={item.id}>
          {recurTreeNode(item.children)}
        </TreeNode>;
      }
    });
  }

  return (
    <Tree showLine defaultExpandedKeys={["series"]}>
      {recurTreeNode(treeJson.children)}
    </Tree>
  );
};

export default () => (
  <StaticQuery
    query={graphql`
      query BlogTreeQuery {
        allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}, filter: {frontmatter: {templateKey: {eq: "blog-post"}}}) {
          edges {
            node {
              fileAbsolutePath
            }
          }
        }
      }
    `}
    render={(data) => <NodeDirectoryTree data={data}/>}
  />
)


