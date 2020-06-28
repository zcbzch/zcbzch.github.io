### node.js

**cluster模块** 

 https://cnodejs.org/topic/56e84480833b7c8a0492e20c 

 JavaScript代码执行在单线程中，非常脆弱，一旦出现了未捕获的异常，那么整个应用就会崩溃。这在许多场景下，尤其是web应用中，是无法忍受的。通常的解决方案，便是使用Node.js中自带的cluster模块，以master-worker模式启动多个应用实例。 

1. 为什么我的应用代码中明明有`app.listen(port);`，但cluter模块在多次`fork`这份代码时，却没有报端口已被占用？
2. Master是如何将接收的请求传递至worker中进行处理然后响应的？