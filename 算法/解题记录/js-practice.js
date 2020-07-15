// 思路：将要改变this指向的方法挂到目标this上执行并返回
Function.prototype.myCall = function (context, ...args) {
  if (typeof this !== 'function') {
      throw new TypeError('not function')
  }
  context = context || window
  context.fn = this
  // let _this = this
  let result = context.fn(...args) 
  delete context.fn
  return result
}

Function.prototype.myApply = function (context, [...args]) {
  if (typeof this !== 'function') {
    throw new TypeError('not function')
  }
  context = context || window
  context.fn = this
  let result = context.fn(...args)
  delete context.fn
  return result
}

Function.prototype.myBind = function (context, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('not function')
  }
  context = context || window
  context.fn = this
  _this = this
  return function Fn(...f_args) {
    // console.log(...[...args, ...f_args])
    // 构造函数？
    let result
    // if (this instanceof Fn) {
    //   console.log('new')
    //   result = context.fn.myApply(context, [...args, ...f_args])
    // } else {
    //   result = context.fn.myApply(context, [...args, ...f_args])
    // }
    result = context.fn.myApply(context, [...args, ...f_args])
    delete context.fn
    return result
  }
}

const myInstanceof = function (leftVal, rightVal) {
  let protoRight = rightVal.prototype;
  let protoLeft = leftVal.__proto__;
  function check(left, right) {
    if (!left) return false;
    if (left === right) return true;
    return check(left.__proto__, right)
  };
  return check(protoRight, protoLeft);
}
// Object.create创建一个新对象，使用现有的对象来提供新创建的对象的__proto__
function myObjectCreate(obj) {
  function Fn() {}
  Fn.prototype = obj
  return new Fn()
}

// let a = 1
// let obj = {
//   a: 2,
//   fn(...arg) {
//     console.log(this.a, ...arg)
//   },
// }

// let ntr = {
//   a: 3
// }

// obj.fn()
// obj.fn.myCall(ntr, 'call')
// obj.fn.myApply(ntr, ['apply'])
// let test = obj.fn.myBind(ntr, 'bind')
// test('cc')
// new test('ccc')

function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}
const auto = new Car('Honda', 'Accord', 1998);

console.log(myInstanceof(auto, Car))