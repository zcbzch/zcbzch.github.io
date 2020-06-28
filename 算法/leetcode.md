# leetcode



## 常用算法

### 递归和动态规划

纯粹的函数式编程中没有循环，只有递归。

#### 递归

**递归三要素**

1. 一个问题的解可以分解为几个子问题的解
2. 子问题的求解思路除了规模之外，没有任何区别
3. 有递归终止条件

**时间复杂度**

……



#### 动态规划

> 如果说递归是从问题的结果倒推，直到问题的规模缩小到寻常。 那么动态规划就是从寻常入手， 逐步扩大规模到最优子结构。

**动态规划两要素**

1. 状态转移方程
2. 临界条件

动态规划本质上是将大问题转化为小问题，然后大问题的解是和小问题有关联的，换句话说大问题可以由小问题进行计算得到。

这一点是和递归一样的， 但是动态规划是一种类似查表的方法来缩短时间复杂度和空间复杂度。



## 解题记录

### 深度优先搜索（DFS）

### 广度搜索优先（BFS）

#### 前序遍历

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */

var preorderTraversal = function(root) {
    if (!root) return []
    const stack = [root]
    const result = []
    while(stack.length) {
        const node = stack.pop()
        result.push(node.val) 
        if (node.right) {
            stack.push(node.right)
        }
        if (node.left) {
            stack.push(node.left)
        }
    }
    return result
};
```

#### 中序遍历

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
    let node = root
    const stack = []
    const result = []
    while(stack.length || node != null) {
        while(node) {
            stack.push(node)
            node = node.left
        }
        node = stack.pop()
        result.push(node.val)
        node = node.right
    }
    return result
};
```

#### 后序遍历

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */

// 两个栈的写法
var postorderTraversal = function(root) {
    if (!root) return []
    let node = root
    // 任务执行栈
    const stack1 = [node];
    // 节点栈
    const stack2 = [];
    const result = [];
    while (stack1.length) {
        node = stack1.pop();
        stack2.push(node);
        if (node.left !== null) stack1.push(node.left); 
        if (node.right !== null) stack1.push(node.right); 
    }
    while (stack2.length) {
        node = stack2.pop();
        result.push(node.val)
    }
    return result
};
```

### 

#### 二叉树最大深度

递归

```
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
// 递归
var maxDepth = function(root) {
    if (!root) return 0
    let result = 0
    function getDepth(node, tempDepth) {
        let temp = tempDepth + 1
        if (node.left == null && node.right == null) result = Math.max(temp, result)
        if (node.left !== null) getDepth(node.left, temp)
        if (node.right !== null) getDepth(node.right, temp)
    }
    getDepth(root, 0)
    return result
};
```

#### 对称二叉树


```
// recursion
// var isSymmetric = function(root) {
//   if (!root) return true
//   function isEqual(left, right) {
//     if (!left || !right) {
//       return left == null && right == null
//     }
//     if (left.val == right.val) {
//       return isEqual(left.left, right.right) && isEqual(left.right, right.left) 
//     }
//     return false
//   }
//   return isEqual(root.left, root.right)
// }

// iteration
var isSymmetric = function(root) {
  if (!root) return true
  const queue = []
  queue.push(root)
  queue.push(root)
  while(queue.length) {
    let n1 = queue.shift()
    let n2 = queue.shift()
    if (n1 === null && n2 === null) continue
    if (n1 === null || n2 === null) return false
    if (n1.val !== n2.val) return false
    queue.push(n1.left)
    queue.push(n2.right)
    queue.push(n1.right)
    queue.push(n2.left)
  }
  return true
}
```

#### 路径总和

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {boolean}
 */

// recursion
var hasPathSum = function(root, sum) {
  if (!root) return false
  if (root.left === null && root.right === null) {
    return Boolean(sum - root.val == 0)
  }
  return hasPathSum(root.left, sum - root.val) || hasPathSum(root.right, sum - root.val)
};

// iteration
var hasPathSum = function(root, sum) {
  if (!root) return false
  cosnt stack = [root]
  while (stack.length) {
    if (root.left === null && root.right === null) {
      return Boolean(sum - root.val == 0)
    }
    if (root.right !== null) {
      stack.push(root.right, sum - root.val)
    }
    
    if (root.left !== null) {
      stack.push(root.left, sum - root.val)
    }
  }
  return false
}
```

#### 中序与后序遍历构造二叉树

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */

// recursion
var buildTree = function(inorder, postorder) {
  const helper = (inorder) => {
    if(!inorder.length || !postorder.length) return null
    const value = postorder.pop()
    let index = inorder.indexOf(value)
    let node = new TreeNode(value)
    node.right = helper(inorder.slice(index + 1))
    if (index < 0) {
      node.left = null
    } else {
      node.left = helper(inorder.slice(0, index))
    }
    return node
  }
  return helper(inorder)
};
```

#### 前序与中序遍历构造二叉树

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
// recursion
var buildTree = function(preorder, inorder) {
  const helper = (inorder) => {
    if (!inorder.length || !preorder.length) return null
    const value = preorder.shift()
    const index = inorder.indexOf(value)
    if (index < 0) return null
    let node = new TreeNode(value)
    node.left = helper(inorder.slice(0, index))
    node.right = helper(inorder.slice(index + 1))
    return node
  }
  return helper(inorder)
};
```

#### 填充每个节点的下一个右侧节点指针

```javascript
/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {Node} root
 * @return {Node}
 */
// BFS O(N) O(N)
var connect = function(root) {
  if (!root) return root
  const queue = [root]
  while (queue.length) {
    let pre = null
    let size = queue.length
    for (let i = 0; i < size; i++) {
      let node = queue.shift()
      if (i > 0) pre.next = node
      if (i == size - 1) node.next = null
      pre = node
      if (node.left !== null) queue.push(node.left)
      if (node.right !== null) queue.push(node.right)
    }  
  }
  return root
};

// recursion 递归每个子树写next; 每个根节点的LR -> RL; 右侧节点 -> null
// O(N) O(1)
```

