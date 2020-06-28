# WebSocket疑难问题

websocket路由

websocket ws socket.io性能

安全

socket.io使用问题：

命名空间，rooms



模拟网络不稳定（重连机制，响应机制）

io和socket

io是服务端的socket，connection事件里面给的socket是连接上了的客户端socket，io和socket是一对多的关系

### 鉴权方案（基于token）

问题原因：WebSockets握手信号不信任自定义的请求头，自定义的Header无效

1、socket.handshake.query

2、额外请求头  (仅当建立的是轮询连接时才起作用，使用websocket建立传输时，自定义的请求头将不会被添加)

3、事件：个人不建议，需要越过中间件，并建立连接成功后再通过事件鉴权，不合理

### 返回消息次数递增

推测：因相同的命名空间导致连接被重复创建

推测错误，错误原因：在click事件当中添加了socket.on监听器，每次发送消息都触发了click事件导致socket.on递增。



