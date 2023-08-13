import { ElementStates } from "../types/element-states";

const MIN_LEN = 3;
const MAX_LEN = 17;
const MIN_NUM = 0;
const MAX_NUM = 100;

export const createRandomArray = (): {value: number, color:ElementStates}[] => {
  const arr = []
  const len = Math.floor(Math.random() * (MAX_LEN - MIN_LEN) + MIN_LEN);
  for (let i = 0; i <= len; i++) {
    arr.push({value: Math.floor(Math.random() * (MAX_NUM - MIN_NUM) + MIN_NUM), color: ElementStates.Default})
  }
  return arr;
}