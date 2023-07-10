export class Node<T> {
    value: T
    next: Node<T> | null
    constructor(value: T, next?: Node<T> | null) {
      this.value = value;
      this.next = (next === undefined ? null : next);
    }
}

interface ILinkedList<T> {
    append: (element: T) => void;
    prepend: (element: T) => void;
    insertAt: (element: T, position: number) => void;
    getSize: () => number;
}

class LinkedList<T> implements ILinkedList<T> {
    private head: Node<T> | null;
    private tail: Node<T> | null;
    private size: number;
    constructor() {
      this.head = null;
      this.tail = null;
      this.size = 0;
    }

    clear() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    getHead() {
        return this.head
    }

    getTail() {
        return this.tail
    }
  
    insertAt(element: T, index: number) {
      if (index < 0 || index > this.size) {
        return false;
      } else {
        const node = new Node(element);
  
        if (index === 0) {
          this.prepend(element);
          return true;
        } else {
          this.size++;
          let curr = this.head;
          let currIndex = 0;
          
          while(curr) {
            if (currIndex === index - 1) {
              if (curr.next !== null) {
                node.next = curr.next
                curr.next = node;
                return true;
              } else {
                curr.next = node;
                return true;
              }
            } else {
              curr = curr.next;
              currIndex++;
              
            }
          }
        }
      }
    }

    deleteAt(index: number) {
        if (index < 0 || index > this.size - 1) {
            return false;
        }
        
        if (this.size === 2) {
            if (index === 0) {
              return this.deleteHead()
            }
            if (index > 0) {
              return this.deleteTail()
            }
        }

        let removalType
        if (index === 0) {
            removalType = 'head'
        } else if (index >= this.size) {
            removalType = 'tail'
        } else {
            removalType = 'middle'
        }

        if (removalType === 'head') {
            return this.deleteHead()
        }

        if (removalType === 'tail') {
            return this.deleteTail()
        }

        if (removalType === 'middle') {
            const preIdx = this.traverseToIndex(index - 1)
            if (preIdx) {
                const targetIdx = preIdx.next
                if (targetIdx) {
                    preIdx.next = targetIdx.next
                    this.size--
                } 
            }
            
            return true;
        }
    }

    traverseToIndex(index: number) {
        let counter = 0;
        let currentNode = this.head;
        
        while (counter !== index) {
          if (currentNode) {
            currentNode = currentNode.next
            counter++
          }
        }
    
        return currentNode
      }
  
    append(element: T) {
      const node = new Node(element);
  
      if (this.head === null) {
        this.head = node;
        this.tail = node;
      } else {
        if (this.tail) {
            this.tail.next = node;
            this.tail = node;
        }       
      }
      this.size++;
    }

    prepend(element: T) {
        const node = new Node(element);
        node.next = this.head;
        this.head = node;
        this.size++;
    }

    deleteTail() {
        if (!this.tail || !this.head) return false;

        if (this.head === this.tail) {
            this.head = null
            this.tail = null
            this.size--
            return true
        }

        let currentNode = this.head
        while (currentNode.next) {
            if (!currentNode.next.next) {
                currentNode.next = null
            } else {
                currentNode = currentNode.next
            }
        }

        this.tail = currentNode
        this.size--
        return true;
    }

    deleteHead() {
        if (!this.head || !this.tail) return false;

        if (this.head === this.tail) {
            this.head = null
            this.tail = null
            this.size--
            return true;
        }

        const newHead = this.head.next
        this.head = newHead
        this.size--
        return true
    }

  
    getSize() {
      return this.size;
    }
}

export const linkedList = new LinkedList<string>();