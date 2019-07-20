---
tags: [Notebooks/Gatsby.js]
title: 3 - 引入 Typescript
created: '2019-07-20T13:04:26.527Z'
modified: '2019-07-20T13:47:04.193Z'
---

# 3 - 引入 Typescript

```
npm install gatsby-plugin-typescript
```

Options 具体查看 [babel-preset-typescript](https://babeljs.io/docs/en/babel-preset-typescript#options)
```js
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true, // defaults to false
        jsxPragma: `jsx`, // defaults to "React"
        allExtensions: true, // defaults to false
      },
    },
  ],
}
```


