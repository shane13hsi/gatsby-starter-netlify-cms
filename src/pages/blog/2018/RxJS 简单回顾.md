---
templateKey: blog-post
url: 9d5b57f2
title: RxJS Simple Brush Up
date: 2019-08-20 23:07:45
---

# RxJS Simple Brush Up

## 操作符

### timer

`timer(dueTime, periodOrScheudler)` ex. 1s 发出第一个值，每隔 2s 继续发送。从 0 开始，1+。

```ts
@SubscribeMessage('events')
findAll(client: Client, data: any): Observable<WsResponse<any>> {
  return timer(1000, 2000)
    .pipe(map(item => ({
      event: 'events', data: {
        id: item
      }
    })));
}
```



## 参考资料

[RxJS-CN/learn-rxjs-operators](https://github.com/RxJS-CN/learn-rxjs-operators)
