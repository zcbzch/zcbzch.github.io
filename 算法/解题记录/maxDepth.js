// var maxDepth = function(root) {
//   if (!root) return 0
//   let result = 0
//   const node = root
  // function getDepth(node, tempDepth) {
  //     tempDepth++
  //     console.log(tempDepth)
  //     if (tempDepth > 10) return
      // if (node.left == null && node.right == null) result = Math.max(tempDepth, result)
      // if (node.left !== null) getDepth(node.left, tempDepth)
      // if (node.right !== null) getDepth(node.right, tempDepth)
  //     getDepth({}, tempDepth)
  // }(root, 0)
//   return result
// // };

// function getDepth(tempDepth) {
//   let temp = tempDepth + 1
//   console.log(tempDepth,temp)
//   if (typeof(tempDepth) != "number") console.error('typeerror', temp)
//   if (temp > 10) return
//   getDepth(temp)
// }(0)
function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

function createTree (arr) {
  let treeNode1 = new TreeNode(1)
  let treeNode2 = new TreeNode(2)
  let treeNode3 = new TreeNode(2)
  let treeNode4 = new TreeNode(null)
  let treeNode5 = new TreeNode(3)
  let treeNode6 = new TreeNode(null)
  let treeNode7 = new TreeNode(3)

  treeNode1.left = treeNode2
  treeNode1.right = treeNode3
  treeNode2.left = treeNode4
  treeNode2.right = treeNode5
  treeNode3.left = treeNode6
  treeNode3.right = treeNode7
  return treeNode1
}

let root = createTree();

var isSymmetric = function(root) {
  if (!root) return false
  const result = []
  function getFloor (node, depth) {
    let temp = depth + 1
    if (!result[temp - 1]) result[temp - 1] = []
    result[temp - 1].push(node.val)
    if (!node.left && !node.right) return
    if (node.left) getFloor(node.left, temp)
    if (node.right) getFloor(node.right, temp)
  }
  getFloor(root, 0)
  let flag = true
  result.map(item => JSON.stringify(item) == JSON.stringify(item.reverse()))
  .forEach(item => flag = flag && item)
  console.log(result, flag)
  return flag
};

isSymmetric(root)