---
templateKey: blog-post
title: Thoughts on My Skill on Front-end Development
date: 2016-06-20 16:39:10
tags:
---

纯粹没有任何 data flow，可以写出很好的前端吗？

毕竟前端还是以 UI 实现为主。组件化做好了之后，其实就完成了很多功能。

像 Form 这种，纠缠了很多逻辑又很通用的组件，完全也可以抛开数据吗？用 local state 来维护。

最好写一个试试看效果。

hdk 可以直接 load 一个组件。启动一个页面。
现在有点不爽写法啊。config 的配置方式。但是怎么办呢？能力有限，软件设计还是欠缺的。
不过还好 cli 的入口还是可以的。

如果用了 graphql，可以独立用代码开发模块，然后放到页面的某块里。算是可视化编辑的一种吧。

Java 服务端渲染引擎。可以用模板来做。

虽然 ReactJS 也可以做服务端渲染。

其实我下一步要做的就是，找到如何对 config.json 在做一层封装。

我还是用 javascript 开发（后台）比较好。这样比较方便。

现在的策略是，憋个大招？每天4个小时，能不能做成功呢？

或者平时做 incremental 的优化。

EMCSS。

目前的母版得使用母版引擎。

使用 observable 来代替 setState。


# 附

## 如何封装 webpack

还是那句话，不断的拆分。拆干净了，自然就漂亮了。

因为是 config，暴露的接口很少，而且很干净，比如

commandline

如果是带 prompt 的，看起来也可以做。

还有一种就是读配置文件。这三种东西可以做到统一模块化。

##

