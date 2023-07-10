import { ElementStates } from "../types/element-states";

export const createRandomArray = (): {value: number, color:ElementStates}[] => {
  const minLen = 3;
  const maxLen = 17;
  const minNum = 0;
  const maxNum = 100
  const arr = []
  const len = Math.floor(Math.random() * (maxLen - minLen) + minLen);
  for (let i = 0; i <= len; i++) {
    arr.push({value: Math.floor(Math.random() * (maxNum - minNum) + minNum), color: ElementStates.Default})
  }
  return arr;
}