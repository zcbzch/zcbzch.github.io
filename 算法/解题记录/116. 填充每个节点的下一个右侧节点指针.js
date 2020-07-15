/*
 * @Author: zch
 * @Date: 2020-07-06 18:02:57
 * @LastEditors: zch
 * @LastEditTime: 2020-07-07 11:18:05
 * @Description: 填充每个节点的下一个右侧节点指针
 */ 

class Node {
  constructor(val, left, right, next) {
    this.val = val === undefined ? null : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
    this.next = next === undefined ? null : next;
    this.init();
  }
  init() {
    this.next = null
  }
}

/**
 * @param {*} Node
 * @returns 构造测试树
 */
function makeNodeTree(root) {
  if (!root) return 'none'
  let result = {}

  function connectNode(node, res) {
    if (!node.left && !node.right) {
      return 
    }
    res.$id = node.val + ""
    res.val = node.val
    res.left = node.left
    res.right = node.right
    res.next = null
    connectNode(node.left, res.left)
    connectNode(node.right, res.right) 
  }
  connectNode(root, result)
  return result
}

/**
 * @param {*} Node
 * @returns 答案
 */
function connect(root) {
  if (!root) return null
  function handle (node) {
    if (node.left && node.right) {
      node.left.next = node.right
    } else {
      return node
    }
    if (node.left.left && node.left.right && node.right.left && node.right.right) {
      node.left.right.next = node.right.left
      handle(node.left)
      handle(node.right)
    }
    return node
  }
  return handle(root)
};

function execute() {
  let $4 = new Node(4)
  let $5 = new Node(5)
  let $6 = new Node(6)
  let $7 = new Node(7)
  
  let $2 = new Node(2, $4, $5)
  let $3 = new Node(3, $6, $7)
  let $1 = new Node(1, $2, $3)
  // console.log(makeNodeTree($1))
  console.log('BEFORE:', $1)
  let result = connect($1)
  console.log('AFTER:', result)
  return connect($1)
}
execute();
