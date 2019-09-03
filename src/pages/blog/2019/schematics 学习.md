---
templateKey: blog-post
url: efc06700
title: Learn schematics
date: 2019-08-23 14:24:58
---



# Learn Schematics

`ng generate component` 实际上是 `ng generate @schematics/angular:component` 的简写。

> 关于 generate component，可以用 console 在 design systems 里去选。不过更进一步是，要能直接搭建出页面。但是 layout  <-> component 边界，代表了是 schema 还是 code。所以，可能要改变下开发习惯，即先 g component 来写组件，然后搭建布局，然后组件请求数据、组件间通信等等。

## 一个 schematic package

`ng g ng-zorro-antd:schematic2` Angular 如何找到对应的 schematic。

![image-20190823143913768](../assets/image-20190823143913768.png)

其实就是 Angular CLI 帮我们调用了一下 Schematics，**Schematics 自身也有 CLI 工具**，换句话说你在非 Angular 项目中也可以使用，只要你愿意你可以生成任何类似的东西。

`collection.json` 中包含了我们提供的每个 schematic 位置。

```json
{
  "$schema": "../node_modules/@angular-devkit/schematics/collection-schema.json",
  "schematics": {
    "my-component": {
      "description": "Create a  component",
      "factory": "./my-component/index",
      "schema": "./my-component/schema.json",
      "aliases": ["mc"]
    }
  }
}
```

- `factory` 字段指向需要执行的方法 (一般来说是 `index.js` 中默认导出的方法)
- `schema` 字段指向一个 [JSON Schema](https://link.zhihu.com/?target=http%3A//json-schema.org/) 格式的 JSON 文件
- `aliases` 这条命令的缩写，比如`ng g c [name]`

`schema.json` 该文件用于定义输入项 (比如 `--name`)，以及一些参数的默认值。

```json
{
  "$schema": "http://json-schema.org/schema",
  "id": "MyComponent",
  "title": "My Component Options Schema",
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "description": "The name of the component.",
    },
    "prefix": {
      "type": "string",
      "format": "html-selector",
      "description": "The prefix to apply to generated selectors.",
      "alias": "p"
    },
    "styleext": {
      "description": "The file extension to be used for style files.",
      "type": "string",
      "default": "css"
    },
    "spec": {
      "type": "boolean",
      "description": "Specifies if a spec file is generated.",
      "default": true
    },
    "flat": {
      "type": "boolean",
      "description": "Flag to indicate if a dir is created.",
      "default": false
    },
    "selector": {
      "type": "string",
      "format": "html-selector",
      "description": "The selector to use for the component."
    }
  },
  "required": [
    "name"
  ]
}

```

其他 `index.ts` ，`schema.ts` 。

## 模版文件

被 `template<T>(options: T)` 解析，将参数应用到模版**内容**及**路径**

## Schematics的一些基本概念

1. Schematics: 是对代码文件一系列操作的合集
2. Collection: 数个Schematics合集
3. Tree: Tree将真实文件目录（项目中的代码文件）数据拷贝进一个树状结构里，你对代码文件的所有操作都会被缓存在Tree中，而不会对文件进行实时操作。你可以将它理解成一个沙盒。Tree有两个部分，一个是base（真实文件目录），一个是staging area（沙盒），你的变动都会发生在staging area，除非你写入了base部分。
4. Rule: 一个Rule是一个方法。它获取一个Tree，并返回经过改变的一个新的Tree。可以说，一个Schematic就是一个Rule。
5. Source: 用来从真实文件目录创建Tree。
6. Action: 对Tree的具体操作。

由此看来，一个Schematics工程由Collection组成，一个Collection中有若干个Schematics，每一个Schematics又会有若干个Rules去处理一个或多个Tree（如果需要的话）

[原文档](https://www.npmjs.com/package/@angular-devkit/schematics)：

| Term           | Description                                                  |
| :------------- | :----------------------------------------------------------- |
| **Schematics** | A generator that executes descriptive code without side effects on an existing file system. |
| **Collection** | A list of schematics metadata. Schematics can be referred by name inside a collection. |
| **Tool**       | The code using the Schematics library.                       |
| **Tree**       | A staging area for changes, containing the original file system, and a list of changes to apply to it. |
| **Rule**       | A function that ==applies actions== to a `Tree`. It returns a new `Tree` that will contain all transformations to be applied. |
| **Source**     | A function that creates an entirely new `Tree` from an empty filesystem. For example, a file source could read files from disk and create a Create Action for each of those. |
| **Action**     | An ==atomic== operation to be validated and committed to a filesystem or a `Tree`. Actions are created by schematics. |
| **Sink**       | The final destination of all `Action`s.                      |

## 执行原理

[原文](https://segmentfault.com/a/1190000015836618)

Schematics 执行核心的本质就是在维护一个非常大的 Observable 数据流，这里的数据就是文件树。

==核心的主轴是执行一个 Schematics 时会在开始时构建一个虚拟文件系统 [virtual-fs](https://github.com/angular/angular-cli/blob/master/packages/angular_devkit/core/src/virtual-fs) 就像 Rxjs 的 `Observable`，后续的操作符都是对文件系统的变更动作，最后将虚拟文件系统的内容影射至物理文件中。==

一个 Schematics 可以包含多个不同的指令，例如默认 [Angular Schematics](https://github.com/angular/angular-cli/blob/master/packages/schematics/angular/) 有非常多我们熟悉的 `module`、`component`等，而管理这些指令是通过 [collection.json](https://github.com/angular/angular-cli/blob/master/packages/schematics/angular/collection.json) 配置项。

Schematics 创建完虚拟文件系统环境后，紧跟着依 collection.json 构建 Collection 对象，再根据指令中的名称创建 Schematic 对象；并且调用并运行 Schematic Name 所对应目录名下 `index.ts` 文件，例如一个 Schematic 完整的代码结构：

```ts
function rule1() {
  return (host: Tree, context: SchematicContext) => {
      // doing
  };
}
export default function(options: ApplicationOptions): Rule {
  return (host: Tree, context: SchematicContext) => {
    return chain([ rule1(), rule1() ]);
  }
}
```

最终返回一个 `Rule` 类型，其本质是：

```ts
(tree: Tree, context: SchematicContext) => Tree | Observable<Tree> | Rule | void
```

若返回的是一个 `Observable` 类型时意味者这里的空间变得无限大：

```ts
function rule1() {
  return (host: Tree, context: SchematicContext) => {
      return of(host);
  };
}
```

比如构建自己的远程代码片断库。

## 总结

以上是一些简单总结，Schematics 可玩性非常强，它是运行在一个 Node 容器内，因此可以使用当下所有 Node 类库。

而 Schematics 的操作除了文件以外，也会对==文件内容进行修改==，这一些也很有意思。像 ts 文件可以利用 [typescript](https://www.npmjs.com/package/typescript) 类库来获取或调整 ts 文件内容某个变量名或值。而 html 文件可以利用 [parse5](https://www.npmjs.com/package/parse5) 来解析并修改，绝大多数文件类型都可以找到相对应的现有类库来支持。

Schematics 只是 `@angular-devkit` 中的一小部分而已，还包括：[Architect](https://angular.io/guide/cli-builder) 用于改变 Angular cli 的运行机制，虽然本质上是在改变 Webpack 配置文件，但谁叫 Webpack 有着无限可能呢。

## 更多参考文章

https://github.com/manfredsteyer/schematics-book

[Schematics — An Introduction](https://blog.angular.io/schematics-an-introduction-dc1dfbc2a2b2) 官方博客介绍

[Schematics for Libraries](https://angular.io/guide/schematics-for-libraries) 官方文档



