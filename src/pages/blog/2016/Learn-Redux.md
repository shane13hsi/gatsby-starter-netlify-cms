---
templateKey: blog-post
title: 学习 Redux
date: 2016-01-16 13:01:29
tags:
---

通过接口学习：[API](https://github.com/rackt/react-redux/blob/master/docs/api.md)。

## Provider

### 使用示例

```js
<Provider store={store}>
    <Router history={history}>
      <Route component={AppContainer} path='/'/>
    </Router>
  </Provider>
```

然后必须和 connect 结合使用。

```js
function select(state) {
  return {
    counters: state.counters
  };
}

@connect(select)
export class AppContainer extends Component<IAppContainerProps, {}> {
  public render() {
    const { dispatch } = this.props;
    const actions = bindActionCreators(CounterActions, dispatch);
    return (
      <App name="John" actions={actions}/>
    );
  }
}
```

### 源码

仅提取核心部分：

```js
const { Component, Children } = require('react')

class Provider extends Component {
  // 表示 this.store 会被 Provider 的 children 通过 context 获取
  getChildContext() {
    return { store: this.store }
  }

  constructor(props, context) {
    super(props, context)
    this.store = props.store
  }

  render() {
    let { children } = this.props
    // 仅仅是对 children 的无 DOM 包装
    return Children.only(children)
  }
}

module.exports = Provider

```

所以，Provider 的功能仅仅是将 store 注册到 React context 中。

## connect

### 使用场景

使用场景已经介绍过:

```js
function select(state) {
  return {
    counters: state.counters
  };
}

connect(select)(view)
...
```

这里 connect 是 curry 高阶函数。connect 是将被 annotated 的 `React.Component` 和 Redux store 联结起来。

### 源码

```js
function connect(mapStateToProps, mapDispatchToProps, mergeProps, options = {}) {
    return function wrapWithConnect(WrappedComponent) {
        class Connect extends Component {
          constructor(props, context) {
            super(props, context);
            // 注释[2]
            this.store = props.store || context.store;
            const storeState = this.store.getState();
            this.state = { storeState };
          }
        }
        // 注释[1]
        return hoistStatics(Connect, WrappedComponent)
    }
}
module.exports = connect;
```

**注释[1]：**

Copies non-react specific statics from a child component to a parent component. Similar to Object.assign, but with React static keywords blacklisted from being overridden.

地址：https://github.com/mridgway/hoist-non-react-statics

接口：hoistNonReactStatics(targetComponent, sourceComponent)

即将 WrappedComponent 的 component 的 keys，除去 contextTypes，mixins，defaultProps，displayName 等，复制到 Connect 上，并返回 Connect。

**注释[2]：**

使用 Provider 的原因就是给 connect 提供 store。

```js
invariant(this.store,
        `Could not find "store" in either the context or ` +
        `props of "${this.constructor.displayName}". ` +
        `Either wrap the root component in a <Provider>, ` +
        `or explicitly pass "store" as a prop to "${this.constructor.displayName}".`
      );
```


更多参考：

- [Computing Derived Data](http://rackt.org/redux/docs/recipes/ComputingDerivedData.html)


