---
tags: [Notebooks/Gatsby.js]
title: 1 - Gatsby.js 开发快速回顾
created: '2019-07-20T13:09:29.211Z'
modified: '2019-07-20T13:59:18.072Z'
---

# 1 - Gatsby.js 开发快速回顾


## Gatsby 生命周期 API

bootstrap -> build -> client runtime operations

### 概览

#### Boostrap sequences 

1. 读取 gatsby-config.js
2. 初始化 `./cache`
3. 拉去和预处理数据（"source & transform nodes"）到 GraphQL schema
4. 在内存中创建 pages
    - 从 `/pages` 目录
    - 从 `gatsby-node.js` 如果你实现了 `createPages/createPagesStatefully`(eg. templates)
    - 从其他 plugins，实现了 `createPages/createPagesStatefully`
5. 在 pages 上抽取，运行，替换 graphql querys
6. 将 pages 写到 cache


## Gatsby Node APIs

> 重点看下 `createPages` 和 `onCreateNode`。在 netlify-cms 有使用到。

### `createPages`

告诉 plugin 来添加 pages，

`gatsby-node.js`

```js
exports.createPages = ({actions, graphql}) => {
    const { createPage } = actions;
    // ...
    createPage({
      path: edge.node.fields.slug, // 页面的 url
      tags: edge.node.frontmatter.tags, // 在 gatsby doc 未体现
      component: path.resolve( // 模板
        `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
      ),
      // additional data can be passed via context
      context: { // this.props.pageContext 传送额外数据
        id,
      },
    });
}
```

### `onCreateNode` 

新 node 创建后会调用。

`createNodeField` 用来扩展 node 新的 field

```js
exports.onCreateNode = ({ node, actions }) => {
  const { createNode, createNodeField } = actions
  // Transform the new node here and create a new node or
  // create a new node field.
}
```

## 页面间跳转

```html
<Link to={`/tags/${kebabCase(tag)}/`}>
  <Tag>
    {tag}
  </Tag>
</Link>
```

## 查询数据

### 使用 `PageQuery`

具体 graphql 的语法和 gatsby.js schema 文档还需要熟悉。

## 创建 Layout

和 React 开发一致。





