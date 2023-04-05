class Node {
  constructor(data, P = null, L = null, R = null) {
    this.data = data;
    this.L = L; // left child
    this.R = R; // right child
    this.P = P; //parent node
  }
}

class BST {
  #Root = null;
  #cachedInOrder;
  /**
   *
   * @param {number} item
   * @param {function} callBack
   * @description
   * method for traversing an array via next and prev methods.
   * @returns number
   */
  #binarySearch(item, callBack) {
    let arr = this.#cachedInOrder,
      lowIndex = 0,
      hightIndex = arr.length - 1;
    while (lowIndex <= hightIndex) {
      let curIndex = Math.floor((lowIndex + hightIndex) / 2),
        curItem = arr[curIndex];

      let nextItem = callBack(item, curItem, curIndex, arr);

      if (nextItem) return nextItem;
      if (curItem.id < item.id) lowIndex = curIndex + 1;
      else if (curItem.id > item.id) hightIndex = curIndex - 1;
    }
  }

  insert(data) {
    let node = this.#Root;
    if (!node) {
      this.#Root = new Node(data);
      return;
    }
    traverseInsert(node, data);
    if (this.isBalanced() === false) {
      this.balance();
    }
    this.#cachedInOrder = this.inOrder();
    return;
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
      if (data.id < node.data.id) {
        if (!node.L) {
          node.L = new Node(data);
          node.L.P = node;

          return;
        }
        return traverseInsert(node.L, data);
      } else if (data.id > node.data.id) {
        if (!node.R) {
          node.R = new Node(data);
          node.R.P = node;
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
    while (node.data.id !== data.id) {
      if (data.id < node.data.id) {
        node = node.L;
      } else if (data.id > node.data.id) {
        node = node.R;
      }

      if (!node) {
        return false;
      }
    }
    return true;
  }
  hasName(name) {
    let node = this.#Root;
    while (node.data.name !== name) {
      if (name < node.data.name) {
        node = node.L;
      } else if (name > node.data.name) {
        node = node.R;
      }

      if (!node) {
        return false;
      }
    }
    return { bool: true, ...node.data };
  }
  /**
   * 
   * @param {string} name 
   * @param {Node} node 
   * @description method takes 2 arguments `name` to search for and `node` to start the search.
   * The `node` argument should be te root node of the binary search tree.
   * The `name` argument should be a string representing name to search for.
   * 
   * The method first checks if `node` argument is null. if this condition is true, the method returns null.
   * Next, the method creates a regular expersion using `name` argument as pattern to match, The "i" flag
   * is used to make the match case insensitve.
   * 
   * The method then tests if the `node`s `name` property mathes the regular expression. if true, the
   *`node.data` is returned as search result. if not the method rescursively searchs the left and right subtrees,
    passing each subtree as the `node`argument to recursive call to `nameIncludes`. if either recursive calls return a non-null value,
    that value is returned as the search result.

    if the name is node found in the node or it's subtrees, the method returns null.
   * @returns 
   */
  nameIncludes(name, node = this.#Root) {
    if (!node) {
      return null;
    }
    const regex = new RegExp(name, "i");
    if (regex.test(node.data.name)) {
      return node.data;
    }
    // recursively search left & right subtrees.
    const lR = this.nameIncludes(name, node.L);
    if (lR !== null) {
      return lR;
    }
    const rR = this.nameIncludes(name, node.R);
    if (rR !== null) {
      return rR;
    }
    return null;
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
  /**
   *
   * @param {number} id
   * @param {Node} node
   * @description akin to `nameIncludes`. just uses number instead of string
   * @returns
   */
  getById(id) {
    let node = this.#Root;
    while (node.data.id !== id) {
      if (id < node.data.id) {
        node = node.L;
      } else if (id > node.data.id) {
        node = node.R;
      }
      if (!node) {
        return "Not available!";
      }
    }

    return node;
    // if (!node) {
    //   return "not available !";
    // }
    // if (node.data.id == id) {
    
    //   return node;
    // }
    // const lR = this.getById(id, node.L);
    // if (lR !== null) {
    //   return lR;
    // }
    // const rR = this.getById(id, node.R);
    // if (rR !== null) {
    //   return rR;
    // }
    // return null;
  }
  del(data) {
    this.#Root = _delete(this.#Root, data);

    /**
     *
     * @param {Node} node
     * @param {object} data
     * @returns
     */
    function _delete(node, data) {
      if (!node) {
        return null;
      }
      if (data.id < node.data.id) {
        node.L = _delete(node.L, data);
        return node;
      } else if (data.id > node.data.id) {
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
  minHeight(node = this.#Root) {
    if (!node) {
      return -1;
    }

    let left = this.minHeight(node.L),
      right = this.minHeight(node.R);

    if (left < right) {
      return left + 1;
    } else {
      return right + 1;
    }
  }
  maxHeight(node = this.#Root) {
    if (!node) {
      return -1;
    }

    let left = this.maxHeight(node.L),
      right = this.maxHeight(node.R);

    if (left > right) {
      return left + 1;
    } else {
      return right + 1;
    }
  }
  isBalanced() {
    return this.minHeight() >= this.maxHeight() - 1;
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

  balance() {
    // Get an array of all nodes in the BST
    let nodes = this.inOrder();

    // Rebuild the BST by recursively dividing the array in half and inserting the middle element into the BST
    let rebuildBST = (arr, start, end) => {
      if (start > end) {
        return null;
      }
      let mid = Math.floor((start + end) / 2);
      let node = new Node(arr[mid]);
      node.L = rebuildBST(arr, start, mid - 1);
      node.R = rebuildBST(arr, mid + 1, end);
      return node;
    };

    this.#Root = rebuildBST(nodes, 0, nodes.length - 1);
  }
}

export const Tree = new BST();
