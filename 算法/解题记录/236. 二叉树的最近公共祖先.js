/*
 * @Author: zch
 * @Date: 2020-07-10 15:26:22
 * @LastEditors: zch
 * @LastEditTime: 2020-07-14 11:18:44
 * @Description: 二叉树的最近公共祖先
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
 * @Description 递归 O(n) O(n)
 */
var lowestCommonAncestor = function(root, p, q) {
  if (!root) return null
  if (root.val == p.val || root.val == q.val) return root

  let left = lowestCommonAncestor(root.left, p, q)
  let right = lowestCommonAncestor(root.right, p, q)

  if (!left) return right
  if (!right) return left
  if (left && right) return root
  return null
}

/*
 * @params {*} Node root, Node p, Node q
 * @returns Node 
 * @Description 递归添加pre指针，并遍历查找（不优）
 */
var lowestCommonAncestor = function(root, p, q) {
  if (!root || !p || !q) return null
  let nodeA = null
  let nodeB = null
  let depthA = null
  let depthB = null

  let flagSearch = true
  function handler(node, depth) {
    if (node.val == p.val || node.val == q.val) {
      if (depthA === null) {
        nodeA = node
        depthA = depth
      } else {
        nodeB = node
        depthB = depth
      }
    }

    if (node.left) {
      node.left.pre = node
      handler(node.left, depth+1)
    }
    if (node.right) {
      node.right.pre = node
      handler(node.right, depth+1)
    }
  }
  function findAncestor() {
    if (depthA > depthB) {
      let tmp = nodeA
      let tmpDep = depthA
      nodeA = nodeB
      nodeB = tmp 
      depthA = depthB
      depthB = tmpDep
    }
    let result = null
    while (flagSearch) {
      if (!nodeB.pre) {
        return nodeB
      }

      if (nodeB.pre == nodeA) {
        flagSearch = null
        result = nodeA
        return result
      }

      if (
        ( nodeB.pre.left == nodeB && nodeB.pre.right == nodeA ) || 
        ( nodeB.pre.right == nodeB && nodeB.pre.left == nodeA )
      ) {
        flagSearch = null
        result = nodeB.pre
        return result
      }

      if (depthA == depthB) {
        nodeA = nodeA.pre
        depthA--
      }
      nodeB = nodeB.pre
      depthB--
    }
    return result
  }
  handler(root, 0)
  return findAncestor()
};


function execute() {
  let $4 = new Node(4, null, null)
  let $3 = new Node(3, null, null)
  let $2 = new Node(2, null, $4)
  let $1 = new Node(1, $2, $3)

  console.log('BEFORE:', $1)
  let result = lowestCommonAncestor($1, $1, $4)
  console.log('AFTER:', result)
  return result
}

execute()