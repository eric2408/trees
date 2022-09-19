/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if(!this.root) return 0;
    
    function findDepth(node){
      if(!node.left && !node.right) return 1;
      if(node.left === null) return findDepth(node.right) +1;
      if(node.right === null) return findDepth(node.left) +1;
      return Math.min(findDepth(node.left), findDepth(node.right)) +1;
    }

    return findDepth(this.root);
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    if(!this.root) return 0;

    function findMaxDepth(node){
      if(!node.left && !node.right) return 1;
      if(!node.left) return findMaxDepth(node.right) +1;
      if(!node.right) return findMaxDepth(node.left) +1;
      return Math.max(findMaxDepth(node.left), findMaxDepth(node.right)) +1;
    }

    return findMaxDepth(this.root);
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    let result = 0;

    function findMax(node){
      if(!node) return 0;
      const leftVal = findMax(node.left);
      const rightVal = findMax(node.right);

      result = Math.max(result, node.val + leftVal + rightVal);
      return Math.max(0, node.val + leftVal, node.val + rightVal);
    }

    findMax(this.root)
    return result;


  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    if(!this.root) return null;

    let queue = [this.root];
    let closest = null;

    while(queue.length){
      let current = queue.shift();
      let lower = current.val > lowerBound;
      let isClosest = current.val < closest || closest === null;

      if(lower && isClosest){
        closest = current.val;
      }

      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }

    return closest;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

   areCousins(node1, node2) {
    if (node1 === this.root || node2 === this.root) return false;

    function findLevelAndParent(
      nodeToFind,
      currentNode,
      level = 0,
      data = { level: 0, parent: null }
    ) {
      if (data.parent) return data;
      if (currentNode.left === nodeToFind || currentNode.right === nodeToFind) {
        data.level = level + 1;
        data.parent = currentNode;
      }
      if (currentNode.left) {
        findLevelAndParent(nodeToFind, currentNode.left, level + 1, data);
      }
      if (currentNode.right) {
        findLevelAndParent(nodeToFind, currentNode.right, level + 1, data);
      }
      return data;
    }

    let node1Info = findLevelAndParent(node1, this.root);
    let node2Info = findLevelAndParent(node2, this.root);

    let sameLevel =
      node1Info && node2Info && node1Info.level === node2Info.level;
    let differentParents =
      node1Info && node2Info && node1Info.parent !== node2Info.parent;
    return sameLevel && differentParents;
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize(tree) {
    const result = [];

    function traverse(node){
      if(node){
        result.push(node.val);
        traverse(node.left);
        traverse(node.right);
      } else {
        result.push('#')
      }
    }

    traverse(tree.root);
    return result.join(' ');
  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize(string) {
    if(!string) return null;

    const value = string.split(' ');

    function buildTree(){
      if(value.length){
        const current = value.shift();

        if(current === '#') return null;

        let currentNode = new BinaryTreeNode(+current);
        currentNode.left = buildTree();
        currentNode.right = buildTree();

        return currentNode;
      }
    }

    const root = buildTree();
    return new BinaryTree(root)
  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {
    
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
