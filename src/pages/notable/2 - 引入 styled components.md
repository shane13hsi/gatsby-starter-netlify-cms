---
tags: [Notebooks/Gatsby.js]
title: 2 - 引入 styled components
created: '2019-07-20T13:02:16.412Z'
modified: '2019-07-20T13:47:00.401Z'
---

# 2 - 引入 styled components

```
npm install --save gatsby-plugin-styled-components styled-components babel-plugin-styled-components
```

需要在 `gatsby-config.js` 加上

```js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        // Add any options here
      },
    },
  ],
}
```


