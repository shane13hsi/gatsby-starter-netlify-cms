---
templateKey: blog-post
url: a3854b36
title: nx study deeper
date: 2019-08-21 17:09:23
---

# nx study deeper

[workshop-nx-labs](https://github.com/nrwl/workshop-nx-labs)

angular cli 目前已经是非常复杂的项目了。构建使用 bazel。bazel 和目前前端社区通用解决方案相差甚远，社区支持不够，之前尝试花相对大量的时间学习过，性价比低。

先学习 Angular CLI 文档

## 学习步骤

1. 阅读 《Effective React Development with Nx》：期望能够介绍到 Angular CLI 和一些内部实现方案。
2. 

## 前序学习内容

### Nx

目标：

1. 暂时使用 Nx 来开发 IDE assistant。
2. 不清楚 publish 策略
3. 慢慢替换 Nx

相关文章：

> 文中命令 generate 部分已经失效，直接参考 [https://nx.dev](https://nx.dev/)

1. [Building Angular and React Applications Together With Nx](https://blog.nrwl.io/building-angular-and-react-applications-together-with-nx-78b5578de598)
2. [Powering Up React Development With Nx](https://blog.nrwl.io/powering-up-react-development-with-nx-cf0a9385dbec?gi=f5bd9f1ff12a)
3. [Using React with Nx](https://nx.dev/angular/guides/react)
4. [Building Full-Stack Applications](https://nx.dev/angular/fundamentals/build-full-stack-applications)

创建 workspace：

> 由于是多类型 app，暂时 prest=emtpy

```
npx --ignore-existing create-nx-workspace hsi --preset=empty
```

添加 react 能力到 workspace：

```
ng add @nrwl/react
```

生成 react app:

```
ng g @nrwl/react:app frontend
```

生成 react lib：

```
ng g @nrwl/react:lib home
```

添加 nestjs 能力到 workspace：

```
ng add @nrwl/nest 
```

生成 nestjs app

```
ng g @nrwl/nest:application api --frontend-project frontend # sets up the proxy configuration so you can access the API in development
```

sharing code between frontend and backend

```
ng g @nrwl/
:library data # This generates a barebone library with only Typescript setup
```

### Nx Debug

Webstorm

对于JavaScript debug

webstorm 已经集成 Angular CLI，不过最熟悉的是使用 Chrome Develop Tool。所以其实无需特殊处理。

[Running and debugging an Angular application #](https://www.jetbrains.com/help/webstorm/angular.html#angular_running_and_debugging)

对于 Node debug，nx 在运行 nestjs 时候，已经暴露 debug 接口，端口：`7777`。

VSCode

对于 Node debug，[VS Code 的 Atuo detach](https://github.com/nestjs/nest/issues/1109#issuecomment-424005103) 很棒。不需要设置端口。[更多介绍](https://code.visualstudio.com/updates/v1_22#_node-debugging)。

