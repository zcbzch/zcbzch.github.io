/*
 * @Author: your name
 * @Date: 2020-06-30 18:32:47
 * @LastEditTime: 2020-06-30 18:32:47
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /osm-micro-apps/mnt/d/git/mine/zcbzch.github.io/技术/js/Untitled-1.js
 */ 

const deepClone = (target) => {
  // 循环引用

  if (isObject(target)) {
    const cloneTarget = Array.isArray(target) ? []:{}
    for (let prop in target) {
      // 不检查原型链属性
      if (Object.hasOwnProperty(prop)) {
        cloneTarget[prop] = deepClone(target[prop])
      }
    }
    return cloneTarget
  } else {
    return target
  }
}


const isObject = (target) => {
  return (typeof target === 'object' || typeof target === 'function') && typeof target !== null
}