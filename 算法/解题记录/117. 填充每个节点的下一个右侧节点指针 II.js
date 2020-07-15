/*
 * @Author: zch
 * @Date: 2020-07-06 18:02:57
 * @LastEditors: zch
 * @LastEditTime: 2020-07-07 18:16:03
 * @Description: 填充每个节点的下一个右侧节点指针II
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
 * @param {*} {Node} root
 * @returns 答案I--层序遍历 O(n) O(n)
 */
function connect(root) {
  if (!root) return root
  let queue = [root]
  while (queue.length) {
    const length = queue.length
    for(let i = 0; i < length; i++) {
      let node = queue.shift()
      if (i != length - 1) {
        node.next = queue.slice(0, 1)[0]
      }
      if (node.left) {
        queue.push(node.left)
      }
      if (node.right) {
        queue.push(node.right)
      }
    }
  }
  return root
};

/**
 * @param {*} {Node} root
 * @returns 答案II--层序遍历 O(n) O(1)
 */
function connectII(root) {
  if (!root) return root
  let cur = root;
  // dummy始终指向表头
  while (cur) {
    let dummy = new Node();
    // ？
    let tail = dummy

    // 遍历当前层
    while (cur) {
      if (cur.left) {
        tail.next = cur.left
        tail = tail.next
      }
      if (cur.right) {
        tail.next = cur.right
        tail = tail.next
      }
      cur = cur.next
    }
    cur = dummy.next
  }
  return root
};

function execute() {
  let $6 = new Node(6)
  let $8 = new Node(8)
  let $5 = new Node(5)
  let $10 = new Node(1)
  
  let $11 = new Node(1, $5, $10)
  let $3 = new Node(3, null, $6)
  let $9 = new Node(-1, null, $8)
  
  let $4 = new Node(4, $3, $9)
  let $2 = new Node(2, $11, null)
  let $1 = new Node(0, $2, $4)

  console.log('BEFORE:', $1)
  // let result = connect($1)
  let result = connectII($1)
  console.log('AFTER:', result)
  return connect($1)
}

execute()