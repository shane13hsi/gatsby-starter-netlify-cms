export class TreeNodeModel {
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
