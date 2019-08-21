---
templateKey: blog-post
url: f31c518f
title: websocket spike
date: 2019-08-21 17:09:23
---

# websocket spike

## 前端技术准备

####  Mobx with RxJS

> #####  MobX 可以和 RxJS 一起使用吗?
>
> 可以，MobX 可以通过 [mobx-utils 中的 toStream 和 fromStream](https://github.com/mobxjs/mobx-utils#tostream) 使用 RxJS 和其它 TC 39 兼容的 observable。
>
> #####  何时使用 RxJS 替代 MobX?
>
> 对于任何涉及明确使用时间的概念，或者当你需要推理一个 observable 历史值/事件(而不仅仅是最新的)时，建议使用 RxJS，因为它提供了更多的低层级的原始类型。 当你想对**状态**作出反应，而不是**事件**时，MobX 提供了一种更容易而且高层级处理方法。 实际上，结合 RxJS 和 MobX 可能会产生真正强大的架构。 <u>例如使用 RxJS 来处理和节流用户事件，并作为更新状态的结果。 如果状态已经被 MobX 转变成 observable ，则它将相应地处理更新 UI 和其它衍生</u>。
>
> ##### When to use RxJS instead of MobX?
>
> For anything that involves explictly working with the concept of time, or when you need to reason about the <u>historical</u> values / events of an observable (and not just the latest), RxJs is recommended as it provides more <u>low-level primitives</u>. Whenever you want to react to *state* instead of *events*, MobX offers an easier and more high-level approach. In practice, combining RxJS and MobX might result in really powerful constructions. Use for example RxJS to <u>process</u> and <u>throttle</u> user <u>events</u> and as a result of that <u>update the state</u>. If the state has been made observable by MobX, it will then take care of updating the UI and other <u>derivations</u> accordingly.

Mobx 对应 *state*，RxJS 对应 *events*。

暂主要考虑 fromStream，这里是 `Rx.Observable.fromEvent(button, 'click')`，可以代替成 websocket。

```js
const debouncedClickDelta = MobxUtils.fromStream(Rx.Observable.fromEvent(button, 'click')
    .throttleTime(1000)
    .map(event => event.clientX)
    .scan((count, clientX) => count + clientX, 0)
)

autorun(() => {
    console.log("distance moved", debouncedClickDelta.current)
})
```

### 第一步：不用 RxJS 实现简单场景

> RxJS 学习门槛较高，暂时场景复杂度不需要用 R小JS 处理。直接使用 socket.io-client 配合 mobx。

**server 示例代码**

> 搭建 mock 环境: nestjs + rxjs，sad，因为至少模拟下定时 push 数据到 client。
>
> server 端示例使用 nodejs 暂时 mock 下，最后使用 Java 代码写的。主要关注 client 端的代码。

```ts
// Multiple responses
@SubscribeMessage('events')
findAll(client: Client, data: any): Observable<WsResponse<any>> {
  return timer(1000, 2000)
    .pipe(map(item => ({
      event: 'events', data: {
        id: item,
        title: faker.name.findName()
      }
    })));
}
```



**client 示例代码**

可以不用 rxjs。未来场景比较复杂的时候，再考虑用 rxjs。

```ts
@observable pageList = [];

connect() {
  const socket = io('ws://localhost:3000');
  socket.on('connect', function() {
    console.log('Connected');
    socket.emit('events', { test: 'test' });
  });
  socket.on('events', (data) => {
    console.log('event', data);
    this.pageList.unshift(data);
  });
}
```



总结下前端连接 ws 的逻辑。

1. 发送 topic 到后端

   1. ```ts
      socket.on('connect', function() {
        console.log('Connected');
        socket.emit('events', { test: 'test' });
      });
      ```

   2. Q: 如果 uploadId 不一样，是否需要 reconnect？应该不需要。那参数怎么指定呢？

      1. A: 直接在 params 指定 uploadId

2. 对于 async response（observable 或者 promise，注：这里要看下后端 Java 的实现），需要 `on` topic

   1. ```ts
      socket.on('events', (data) => {
        console.log('event', data);
        this.pageList.unshift(data);
      });
      ```



## 其他链接

[MobX 4: Better, simpler, faster, smaller](code.linke.alipay.com/dashboard/projects)

[MobX 4, Firebase, Websockets, and You](https://medium.com/@sampsonjoliver/mobx-4-firebase-websockets-and-you-87fa9682e994)

[github search websocket](https://github.com/search?l=JavaScript&o=desc&p=2&q=websocket&s=stars&type=Repositories)

[rxjs-websockets](https://github.com/ohjames/rxjs-websockets#readme)

[angular – 使用WebSocket可观察RxJs](https://codeday.me/bug/20180926/270176.html)

[浅淡 RxJS WebSocket](https://segmentfault.com/a/1190000016494649)

[RxJS WebSocket official doc](https://rxjs-dev.firebaseapp.com/api/webSocket/webSocket)

[React系列——websocket群聊系统在react的实现](https://segmentfault.com/a/1190000012411572)  使用的 socket.io-client，可以看下

[Nestjs Gateway 文档](https://docs.nestjs.com/websockets/gateways) [中文]([https://docs.nestjs.cn/6/websockets?id=%e5%ae%89%e8%a3%85](https://docs.nestjs.cn/6/websockets?id=安装))

