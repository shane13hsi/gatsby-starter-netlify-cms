---
templateKey: blog-post
title: Try ndb to debug with chrome devtool
date: 2019-04-15T07:43:41.467Z
description: Simple guide to use ndb
tags:
  - nodejs
  - debug
  - ndb
---
Background：
1. Rarely successful to debug on vscode or webstorm. Even it was successful sometime, it breaks afterwards.
1. Familiar with chrome dev tool. No need to learn new UI

Current Target（2019-02-18 17:26:33）：
1. Using ndb to debug a npm script. This script is sth. about bundle a module using roolup.

Installation：

refer: [https://github.com/GoogleChromeLabs/ndb/issues/20#issuecomment-407882547](https://github.com/GoogleChromeLabs/ndb/issues/20#issuecomment-407882547)<br />`sudo npm install -g ndb --unsafe-perm=true --allow-root` 

Debug npm script:<br />`ndb npm run build:bundle` 

Then the devtool will open automatically.

Place a breakpoint then re-run the npm script.<br />
