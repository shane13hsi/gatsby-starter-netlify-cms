import * as React from "react";
import { Tree } from "antd";
import { graphql, Link, StaticQuery } from "gatsby";
import _ from "lodash";
import { navigate } from "@reach/router";
import { parse } from "query-string";

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

const NotableDirectoryTree = (props) => {
  const { data, location } = props;

  const flatData = _.map(data.allMarkdownRemark.edges, item => {
    const path = _.get(item, "node.fileAbsolutePath");
    return {
      splitPath: path.split("blog")[1].split("/"),
      fileAbsolutePath: path,
      data: item.node
    };
  });

  let root = new TreeNodeModel();
  root.id = "root";
  root.node = { title: "root", type: "dir" };
  root.parent = null;
  root.pid = null;
  let nodeMap = new Map();
  nodeMap.set(root.id, root);

  _.forEach(flatData, ({ splitPath, fileAbsolutePath, data }, idx) => {
    _.forEach(splitPath, (item2, idx2) => {
      if (item2 !== "") { // 非根节点
        let tm = new TreeNodeModel();
        tm.id = `${idx}.${idx2}`;
        tm.node = { title: item2 };
        if (item2.indexOf(".md") > -1) {
          tm.node.type = "file";
          tm.node.data = data;
        }
        if (nodeMap.get(tm.id) == null) {
          nodeMap.set(tm.id, tm);
          let pid = splitPath[idx2 - 1] === "" ? "root" : `${idx}.${idx2 - 1}`;
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

  function recurTreeNode(nodeList) {
    return _.map(nodeList, item => {
      if (_.isEmpty(item.children)) {
        return <TreeNode title={
          <Link
            to={item.node.data.fields.slug + location.search}>
            {item.node.data.frontmatter.title}
          </Link>
        } key={item.node.data.fields.slug}/>;
      } else {
        return <TreeNode title={item.node.title} key={item.id}>
          {recurTreeNode(item.children)}
        </TreeNode>;
      }
    });
  }

  const slug = decodeURIComponent(location.pathname);
  const query = parse(location.search);
  let expandedKeys = [];
  if (query.sk != null) {
    expandedKeys = expandedKeys.concat(query.sk.split("-"));
  }
  expandedKeys.push(slug);

  return (
    <Tree showLine
          onExpand={(selectedKeys, { expanded: bool, node }) => {
            const sks = _.filter(selectedKeys, item => !_.includes(item, "blog"));
            const query = new URLSearchParams(location.search);
            query.set("sk", sks.join("-"));
            navigate(location.pathname + "?" + query.toString());
          }}
          expandedKeys={expandedKeys}
          autoExpandParent={true}>
      {recurTreeNode(treeJson.children)}
    </Tree>
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


