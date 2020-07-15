var isSymmetric = function(root) {
  if (!root) return false
  const result = []
  function getFloor (node, depth) {
    let temp = depth + 1
    if (!result[temp - 1]) result[temp - 1] = []
    result[temp - 1].push(node.val)
    if (!node.left && !node.right) return
    if (node.left) {
      getFloor(node.left, temp)
    } else {
      console.log(node)
      getFloor({val: null}, temp)
    }
    if (node.right) {
      getFloor(node.right, temp)
    } else {
      getFloor({val: null}, temp)
    }
  }

  getFloor(root, 0)
  function isSymmetricArray(arr) {
    console.log(arr)
    let flag = true;
    for (let i = 0; i < arr.length / 2; i++) {
      // console.log(arr[i] , arr[arr.length - i - 1])
      flag = flag && Boolean(arr[i] == arr[arr.length - i - 1])
    }
    return flag
  }
  let flag = true
  // result.map(item => JSON.stringify(item) == JSON.stringify(item.reverse())).forEach(item => flag = flag && item)
  // let arr = result.map(item => JSON.stringify(item) == JSON.stringify(Array.from(item).reverse()))
  let arr = result.map(item => isSymmetricArray(item))
  arr.forEach(item => {
    // console.log(flag, item)
    flag = flag && item
  })
  return flag
};

function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

function createTree (arr) {
  let treeNode1 = new TreeNode(1)
  let treeNode2 = new TreeNode(2)
  let treeNode3 = new TreeNode(2)
  // let treeNode4 = new TreeNode(null)
  let treeNode5 = new TreeNode(3)
  // let treeNode6 = new TreeNode(null)
  let treeNode7 = new TreeNode(3)

  treeNode1.left = treeNode2
  treeNode1.right = treeNode3
  treeNode2.left = null
  treeNode2.right = treeNode5
  treeNode3.left = null
  treeNode3.right = treeNode7
  return treeNode1
}

let root = createTree();
console.log('result: ', isSymmetric(root))