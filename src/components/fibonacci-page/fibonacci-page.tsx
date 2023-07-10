import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import Styles from './fibonacci-page.module.css'
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { ChangeEvent } from "react";
import { Circle } from "../ui/circle/circle";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../../utils/delay";
import { getFibonacciNumbers } from "./utils";
import { v4 as uuidv4 } from 'uuid';

const MIN_NUMBER = 1;
const MAX_NUMBER = 19;

export const FibonacciPage: React.FC = () => {
  const [disabled, setDisabled] = React.useState(true);
  const [loader, setLoader] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [fibArray, setFibArray] = React.useState<number[]>([])

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const target = evt.target;
    setDisabled(target.value.length <= 0 || parseInt(target.value) > 19 || parseInt(target.value) < 1);
    setValue(target.value);
  }

  const onClick = async () => {
    setFibArray([]);
    setLoader(true);
    const number = parseInt(value);
    setValue('');
  
    const numbers = getFibonacciNumbers(number);
    const arr = []
    for (let i = 0; i < numbers.length; i++) {
      arr.push(numbers[i])
      setFibArray([...arr])
      await delay(SHORT_DELAY_IN_MS)
    }

    setDisabled(true);
    setLoader(false);
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={Styles.wrapper}>
        <Input placeholder="Введите число" value={value} isLimitText={true} type='number' min={MIN_NUMBER} max={MAX_NUMBER} extraClass={Styles.input} onChange={onChange}/>
        <Button text='Рассчитать' disabled={disabled} isLoader={loader} onClick={onClick} />
      </div>

      <div className={Styles.circles}>
        {      
          fibArray.map((num, index) => (
            <Circle key={uuidv4()} letter={String(num)} index={index}/>
          ))
        }
      </div>
    </SolutionLayout>
  );
};
