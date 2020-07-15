/*
 * @Author: zch
 * @Date: 2020-07-14 14:40:13
 * @LastEditors: zch
 * @LastEditTime: 2020-07-14 17:54:13
 * @Description: 
 */ 

class Node {
  constructor(val, left, right) {
    this.val = val === undefined ? null : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
    this.init();
  }
  init() {}
}


/*
 * @params {*} Node root, Node p, Node q
 * @returns Node 
 * @Description 序列化 递归 O(n) O(n) DFS 前序遍历
 */
function serialize (root) {
  function handler(root) {
    if (!root) return "null,"
    const left = handler(root.left)
    const right = handler(root.right)
    return `${root.val},${left}${right}`
  }
  return '[' + handler(root).slice(0, -1) + ']'
}

/*
 * @params {*} Node root, Node p, Node q
 * @returns Node 
 * @Description 反序列化 递归 O(n) O(n) DFS 前序遍历
 */
function deserialize(data) {
  function handler (data) {
    let nodeVal = data.shift(data)
    if (nodeVal == 'null') return null
    let node = new Node(nodeVal)
    node.left = handler(data)
    node.right = handler(data)
    return node
  }
  const list = data.slice(1, -1).split(',')
  return handler(list)
}

/*
 * @params {*} Node root, Node p, Node q
 * @returns Node 
 * @Description 序列化  O(n) O(n) BFS 
 */
function serialize2 (root) {
  const queue = [root]
  let res = []
  while(queue.length) {
    let node = queue.shift()
    if (node) {
      res.push(node.val)
      queue.push(node.left)
      queue.push(node.right)
    } else {
      res.push('null')
    }
  }
  return `[${res.join(',')}]`
}

/*
 * @params {*} Node root, Node p, Node q
 * @returns Node 
 * @Description 反序列化 递归 O(n) O(n) BFS 
 */
function deserialize2(data) {
  
}


function execute() {
  let $4 = new Node(4, null, null)
  let $3 = new Node(3, null, null)
  let $2 = new Node(2, null, $4)
  let $1 = new Node(1, $2, $3)
  
  let result = serialize2($1)
  console.log(result)
  let result2 = deserialize(result)
  console.log(result2)

  return result
}

execute()