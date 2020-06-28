# WebSocket：从入门到入门

## 一、什么是WebSocket

概括：

1、HTML5的应用层协议

2、支持双向通信

WebSocket是一个新的协议，跟HTTP协议基本没有关系，它基于TCP传输协议，并复用HTTP的握手通道实现双向通信（使用HTTP是为了兼容现有浏览器的握手规范）。



## 二、为什么需要 WebSocket

因为 HTTP 协议通信只能由客户端发起，客户端要响应变化只能进行轮询。

轮询：每隔一段时候，就发出一个询问，了解服务器有没有新的信息。

这种方式对服务器资源消耗非常大，因为每次都要经历建立传输层连接的整个握手过程。WebSocket 也就顺势诞生。



## 三、WebSocket API

```javascript
// 创建WebSocket实例，可以使用ws和wss（http和https）。
// 第二个参数可以选填自定义协议，如果多协议用数组
var socket = new WebSocket('ws://localhost:8080/demo')
```

### 3.1 事件

- open
- message
- error
- close

### 方法

- send
- close

#### 3.1.1 客户端

```javascript
// 创建WebSocket实例，可以使用ws和wss（http和https）。
// 第二个参数可以选填自定义协议，如果多协议用数组
var socket = new WebSocket('ws://localhost:8080/demo')
// 连接触发请求
socket.onopen = (event) => {
    // 向服务端发送消息
    socket.send(`Browser: Hello`)
}
// 服务器数据响应触发请求
socket.onmessage = (event) => {
    console.log(`Browser: I get ${e.data} from server`)
    // close有两个参数，code和reason，选填
    socket.close(1000, 'reason')
}
// 出错时触发，并且会关闭连接
socket.onerror = (event) => {
	console.log('error');
}
// 连接关闭时触发（连接失败自动触发），这在两端都可以关闭
// 针对关闭一般我们会做一些异常处理
socket.onclose = (event) => {
	debugger;
}
```

#### 3.1.2 服务端

```javascript
var app = require('express')();
var server = require('http').Server(app);
var WebSocket = require('ws');

var wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
    console.log('Server: receive connection.');
    
    ws.on('message', function incoming(message) {
        console.log('server: received: %s', message);
    });

    ws.send('world');
});

app.get('/demo', function (req, res) {
  res.send('')
});

app.listen(8080);
```



### 常量

| 常量名     | 值   | 描述             |
| ---------- | ---- | ---------------- |
| CONNECTING | 0    | 连接还未开启     |
| OPEN       | 1    | 连接开启可以通信 |
| CLOSING    | 2    | 连接正在关闭中   |
| CLOSED     | 3    | 连接已经关闭     |

### 属性

| 属性名         | 值类型       | 描述                                                         |
| -------------- | ------------ | ------------------------------------------------------------ |
| binaryType     | String       | 表示连接传输的二进制数据类型的字符串。默认为"blob"。         |
| bufferedAmount | Number       | 只读。如果使用send()方法发送的数据过大，虽然send()方法会马上执行，但数据并不是马上传输。浏览器会缓存应用流出的数据，你可以使用bufferedAmount属性检查已经进入队列但还未被传输的数据大小。在一定程度上可以避免网络饱和。 |
| protocol       | String/Array | 在构造函数中，protocol参数让服务端知道客户端使用的WebSocket协议。而在实例socket中就是连接建立前为空，连接建立后为客户端和服务器端确定下来的协议名称。 |
| readyState     | String       | 只读。连接当前状态，这些状态是与常量相对应的。               |
| extensions     | String       | 服务器选择的扩展。目前，这只是一个空字符串或通过连接协商的扩展列表。 |

### 协议

#### 客户端升级协议

首先，客户端发起协议升级请求，采用的是标准的`HTTP`报文格式，且只支持`GET`方法。

```
GET / HTTP/1.1
Host: localhost:8080
Origin: http://127.0.0.1:3000
Connection: Upgrade
Upgrade: websocket
Sec-WebSocket-Version: 13
Sec-WebSocket-Key: w4v7O6xFTi36lq3RNcgctw==
```

> - Connection: Upgrade：表示要升级协议
>
> - Upgrade: websocket：表示要升级到websocket协议。
>
> - Sec-WebSocket-Version: 13：表示websocket的版本。如果服务端不支持该版本，需要返回一个Sec-WebSocket-Version，里面包含服务端支持的版本号。
>
> - Sec-WebSocket-Key：与后面服务端响应首部的
>
>   Sec-WebSocket-Accept是配套的，提供基本的防护，比如恶意的连接，或者无意的连接。

#### 服务端相应协议升级

```
HTTP/1.1 101 Switching Protocols
Connection:Upgrade
Upgrade: websocket
Sec-WebSocket-Accept: Oy4NRAQ13jhfONC7bP8dTKb4PTU=
```

> 备注：每个header都以`\r\n`结尾，并且最后一行加上一个额外的空行`\r\n`。此外，服务端回应的HTTP状态码只能在握手阶段使用。过了握手阶段后，就只能采用特定的错误码。

## 四、连接保持心跳

WebSocket为了保持客户端、服务端的实时双向通信，需要确保客户端、服务端之间的TCP通道保持连接没有断开。然而，对于长时间没有数据往来的连接，如果依旧长时间保持着，可能会浪费包括的连接资源。

但不排除有些场景，客户端、服务端虽然长时间没有数据往来，但仍需要保持连接。这个时候，可以采用心跳来实现。

- 发送方->接收方：ping
- 接收方->发送方：pong



参考资料

http://www.ruanyifeng.com/blog/2017/05/websocket.html

https://juejin.im/post/5a4e6a43f265da3e303c4787#heading-19

https://juejin.im/post/5a1bdf676fb9a045055dd99d

