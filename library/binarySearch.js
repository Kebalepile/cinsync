class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  // Add a new string name to the tree
  add(media) {
    const node = { media, left: null, right: null };

    if (this.root === null) {
      this.root = node;
    } else {
      let current = this.root;

      while (true) {
        if (media.name < current.media.name) {
          if (current.left === null) {
            current.left = node;
            break;
          } else {
            current = current.left;
          }
        } else if (media.name > current.media.name) {
          if (current.right === null) {
            current.right = node;
            break;
          } else {
            current = current.right;
          }
        } else {
          // If the name is already in the tree, don't add it again
          break;
        }
      }
    }
  }

  // Search for a string name in the tree
  search(name) {
    let current = this.root;

    while (current !== null) {
      if (name === current.media.name) {
        return current;
      } else if (name < current.media.name) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    return null;
  }

  // Remove a string name from the tree
  remove(name) {
    this.root = this._removeNode(this.root, name);
  }

  _removeNode(node, name) {
    if (node === null) {
      return null;
    }

    if (name === node.media.name) {
      if (node.left === null && node.right === null) {
        // If the node has no children, simply remove it
        return null;
      }

      if (node.left === null) {
        // If the node has only a right child, replace it with the right child
        return node.right;
      }

      if (node.right === null) {
        // If the node has only a left child, replace it with the left child
        return node.left;
      }

      // If the node has both left and right children, replace it with the in-order successor
      const inOrderSuccessor = this._findMinNode(node.right);
      node.media.name = inOrderSuccessor.name;
      node.right = this._removeNode(node.right, inOrderSuccessor.name);
      return node;
    }

    if (name < node.media.name) {
      node.left = this._removeNode(node.left, name);
      return node;
    }

    node.right = this._removeNode(node.right, name);
    return node;
  }

  _findMinNode(node) {
    while (node.left !== null) {
      node = node.left;
    }

    return node;
  }

  // Retrieve all string names in the tree
  retrieveAll() {
    const names = [];
    this._traverse(this.root, names);
    return names;
  }

  _traverse(node, names) {
    if (node !== null) {
      this._traverse(node.left, names);
      names.push(node.media.name);
      this._traverse(node.right, names);
    }
  }
}

const Tree = new BinarySearchTree();
export { Tree };
