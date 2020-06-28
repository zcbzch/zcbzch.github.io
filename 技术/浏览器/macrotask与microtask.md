macrotask与microtask

一个浏览器环境，只能有一个事件循环 event loops

而一个事件循环可以多个任务队列 task queue

每个任务都有一个任务源 task source



每个 macro task 结束后，都要清空所有的 micro task



整体代码（script）是一个macrotask

执行过程中，setTimeout是一个macrotask，因此会创建新的macrotask，还会创建microtask，两个任务分别挂起（promise 构造函数因为是同步的）

浏览器执行microtask，将microtask queue所有任务取出

再执行一个macrotask，将microtask queue下一个任务取出

最终所有队列空，执行完毕





Vue中的$nextTick也运用宏任务，微任务进行DOM更新

观察到数据变化时会缓冲所有改变（不重复），通过Promise.then / MessageChannel / setTimeout(0)（不支持采用后者）将watcher事件放入任务队列

在每次查找异步队列并推入执行栈后，执行$nextTick



> 注意 mounted 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以用 vm.$nextTick 替换掉 mounted

https://segmentfault.com/a/1190000012861862





https://www.zhihu.com/question/36972010

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div class="outer">outer
    <div class="inner">inner</div>
  </div>
  <script >
    // Let's get hold of those elements
    var outer = document.querySelector('.outer');
    var inner = document.querySelector('.inner');
    
    // Let's listen for attribute changes on the
    // outer element
    new MutationObserver(function () {
      console.log('mutate');
    }).observe(outer, {
      attributes: true,
    });
    
    // Here's a click listener…
    function onClick() {
      console.log('click');
    
      setTimeout(function () {
        console.log('timeout');
      }, 0);
    
      Promise.resolve().then(function () {
        console.log('promise');
      });
    
      outer.setAttribute('data-random', Math.random());
    }
    
    // …which we'll attach to both elements
    inner.addEventListener('click', onClick);
    outer.addEventListener('click', onClick);
    // 两种情况
    inner.click()
  </script>

  <style>
    .outer {
      width: 100px;
      height: 100px;
      background-color: green;
    }
    .inner {
      width: 50px;
      height: 50px;
      background-color: yellow;
    }
  </style>
</body>
</html>

/*
手动交互：
click
promise
mutate
click
promise
mutate
timeout
timeout

click(): (JS stack中有script，不执行微任务；Microtasks存在Mutation observers等待，不能添加)
click
click
promise
mutate
promise
timeout
timeout
*/
```

参考

https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/