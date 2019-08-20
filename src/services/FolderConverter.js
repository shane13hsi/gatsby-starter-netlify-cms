import _ from "lodash";
import { TreeNodeModel } from "./TreeNodeModel";

export class FolderConverter {
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

