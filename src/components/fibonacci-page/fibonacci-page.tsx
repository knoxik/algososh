import React, { ReactElement } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import Styles from './fibonacci-page.module.css'
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { ChangeEvent, MouseEvent } from "react";
import { Circle } from "../ui/circle/circle";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../../utils/delay";

export const FibonacciPage: React.FC = () => {
  const [disabled, setDisabled] = React.useState(true);
  const [loader, setLoader] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [fibArray, setFibArray] = React.useState<number[]>([])
  const { v4: uuidv4 } = require('uuid');

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const target = evt.target;
    setDisabled(target.value.length <= 0 || parseInt(target.value) > 19 || parseInt(target.value) < 1);
    setValue(target.value);
  }

  const onClick = async (evt: MouseEvent<HTMLButtonElement>) => {
    setLoader(true);
    const number = parseInt(value);
    setValue('');
    setVisible(true);

    await fibByStep(number);
    setDisabled(true);
    setLoader(false);
  }

  const fibByStep = async (n: number): Promise<void> => {
    let res: number[] = [1, 1];
    setFibArray([1])   
    await delay(SHORT_DELAY_IN_MS); 
    setFibArray([1, 1])
    for (let i = 2; i < n + 1; i ++) {
      res.push(res[i - 2] + res[i - 1])
      await delay(SHORT_DELAY_IN_MS);
      setFibArray([...res])         
    }   
  } 

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={Styles.wrapper}>
        <Input placeholder="Введите число" value={value} isLimitText={true} type='number' min={1} max={19} extraClass={Styles.input} onChange={onChange}/>
        <Button text='Рассчитать' disabled={disabled} isLoader={loader} onClick={onClick} />
      </div>

      {visible && (

        <div className={Styles.circles}>
          {      
            fibArray.map((num, index) => (
              <Circle key={uuidv4()} letter={String(num)} index={index}/>
            ))
          }
        </div>
      )}
    </SolutionLayout>
  );
};
