class Node {
  constructor(data) {
    this.data = data;
    this.L = null; // left child
    this.R = null; // rightt child
    this.P = null; //parent node
  }
}

class BST {
  #Root = null;
  /**
   *
   * @param {number} item
   * @param {function} callBack
   * @description
   * method for traversing an array via next and prev methods.
   * @returns number
   */
  #binarySearch(item, callBack) {
    let arr = this.inOrder(),
      lowIndex = 0,
      hightIndex = arr.length - 1;
    while (lowIndex <= hightIndex) {
      let curIndex = Math.floor((lowIndex + hightIndex) / 2),
        curItem = arr[curIndex];

      let nextItem = callBack(item, curItem, curIndex, arr);

      if (nextItem) return nextItem;
      if (curItem < item) lowIndex = curIndex + 1;
      else if (curItem > item) hightIndex = curIndex - 1;
    }
  }

  insert(data) {
    let node = this.#Root;
    if (!node) {
      this.#Root = new Node(data);

      return;
    }
    return traverseInsert(node, data);
    /**
     *
     * @param {Node} node
     * @param {string} data
     * @description Traverse the Binary Tree inorder to insert
     * given data in proper index, if data already exists alerts end-user
     * that data areleady exsits in BST.
     * @returns undefined || string
     */
    function traverseInsert(node, data) {
      if (data < node.data) {
        if (!node.L) {
          node.L = new Node(data);

          return;
        }
        return traverseInsert(node.L, data);
      } else if (data > node.data) {
        if (!node.R) {
          node.R = new Node(data);

          return;
        }
        return traverseInsert(node.R, data);
      } else {
        return `${data}, already in BST.`;
      }
    }
  }
  has(data) {
    let node = this.#Root;
    while (node.data !== data) {
      if (data < node.data) {
        node = node.L;
      } else if (data > node.data) {
        node = node.R;
      }

      if (!node) {
        return false;
      }

      // if (node.data.includes(data)) {
      //   console.log(`Found possible match for ${data}, ==> ${node.data}`);
      // }
    }
    return true;
  }

  next(item) {
    if (this.has(item)) {
      if (this.max() === item) return item;

      return this.#binarySearch(item, (item, curItem, curIndex, arr) => {
        if (curItem === item) return arr[curIndex + 1];
      });
    }
  }

  prev(item) {
    if (this.has(item)) {
      if (this.min() === item) return item;

      return this.#binarySearch(item, (item, curItem, curIndex, arr) => {
        if (curItem === item) return arr[curIndex - 1];
      });
    }
  }
  rotate() {}
  get(data) {
    let node = this.#Root;
    while (node.data !== data) {
      if (data < node.data) {
        node = node.L;
      } else if (data > node.data) {
        node = node.R;
      }
      if (!node) {
        return `${data} not available !`;
      }
    }

    return node;
  }
  del(data) {
    this.#Root = _delete(this.#Root, data);

    /**
     *
     * @param {Node} node
     * @param {string} data
     * @returns
     */
    function _delete(node, data) {
      if (!node) {
        return null;
      }
      if (data < node.data) {
        node.L = _delete(node.L, data);
        return node;
      } else if (data > node.data) {
        node.R = _delete(node.R, data);
        return node;
      } else {
        /**
         * leaflet node has no children.
         */
        if (node.L === null && node.R === null) {
          node = null;
          return node;
        }
        /**
         * node has one child
         */
        if (!node.R) {
          node = node.L;
          return node;
        }
        if (!node.L) {
          node = node.R;
          return node;
        }
        /**
         * node has both children
         */
        if (node.L && node.R) {
          let tempNode = node.R;
          while (tempNode.L) {
            tempNode = tempNode.L;
          }
          node.data = tempNode.data;
          // delete data from subtree.
          node.R = _delete(node.R, tempNode.data);
          return node;
        }
      }
    }
  }

  min() {
    let node = this.#Root;
    while (node.L) {
      node = node.L;
    }

    return node.data;
  }
  max() {
    let node = this.#Root;
    while (node.R) {
      node = node.R;
    }

    return node.data;
  }
  /**
   *
   * @param {Node} node
   * @description
   * is a traversal method, traverses the BST from
   * Left -> Root -> Right
   */
  inOrder(node = this.#Root) {
    let results = [];
    _traverse(node);
    return results;
    function _traverse(node) {
      if (node.L) {
        _traverse(node.L);
      }
      results.push(node.data);
      if (node.R) {
        _traverse(node.R);
      }
    }
  }
  /**
   *
   * @param {Node} node
   * @description
   * is a traversal method, traverses the BST from
   * Root  -> Left -> Right
   */
  preOrder(node = this.#Root) {
    let results = [];
    _traverse(node);
    return results;
    function _traverse(node) {
      results.push(node.data);
      if (node.L) {
        _traverse(node.L);
      }

      if (node.R) {
        _traverse(node.R);
      }
    }
  }

  /**
   *
   * @param {Node} node
   * @description
   * is a traversal method, traverses the BST from
   * Left  -> Right -> Root
   */
  postOrder(node = this.#Root) {
    let results = [];
    _traverse(node);
    return results;
    function _traverse(node) {
      if (node.L) {
        _traverse(node.L);
      }

      if (node.R) {
        _traverse(node.R);
      }
      results.push(node.data);
    }
  }
  levelOrder() {
    let results = [],
      q = [];
    if (this.#Root) {
      q.push(this.#Root);
      while (q.length) {
        let node = q.shift();
        results.push(node.data);
        if (node.L) {
          q.push(node.L);
        }
        if (node.R) {
          q.push(node.R);
        }
      }
      return results;
    }
    return null;
  }
}

const tree = new BST();

// ================================
tree.insert(9);
tree.insert(4);
tree.insert(17);
tree.insert(12);
tree.insert(3);
tree.insert(6);
tree.insert(22);
tree.insert(5);
tree.insert(7);
tree.insert(20);
tree.insert(10);

console.log("Next number is : ", tree.next(5));
console.log("Previous number is : ", tree.prev(12));

console.log(tree.inOrder());

// next(node = this.#Root) {
//   if (node.R) {
//     return _LeftDescendant(node.R);
//   }
//   _RightAncestor(node);
//   function _LeftDescendant(node) {
//     if (node.L) return node.data;
//     return _LeftDescendant(node?.L);
//   }
//   function _RightAncestor(node) {
//     if (node.data < node.P.data) {
//       return node.P.data;
//     }
//     return _RightAncestor(node.P);
//   }
// }
