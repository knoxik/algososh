export interface IStack<T> {
    push: (item: T) => void;
    pop: () => void;
    peak: () => T | null;
    getSize: () => number;
}

export class Stack<T> implements IStack<T> {
    private container: T[] = [];
  
    push = (item: T): void => {
      this.container.push(item)
    };
  
    pop = (): void => {
      this.container.pop()
    };
  
    peak = (): T | null => {
      const len = this.getSize();
      if (len === 0) {
        return null;
      }
      return this.container[len - 1];
    };

    getAll = (): T[] => {
        return this.container;
    }

    clear = (): void => {
        this.container = [];
    }
  
    getSize = () => this.container.length;
  }

export const stack = new Stack<string>()