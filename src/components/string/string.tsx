import React, { ReactElement } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import Styles from './string.module.css'
import { ChangeEvent, MouseEvent } from 'react';
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";
import { CircleProps } from "../ui/circle/circle";


export const StringComponent: React.FC = () => {
  const [disabled, setDisabled] = React.useState(true);
  const [loader, setLoader] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [text, setText] = React.useState('');
  const [circleOptions, setCircleOptions] = React.useState<CircleProps[]>([{}])
  const { v4: uuidv4 } = require('uuid');

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const target = evt.target;
    setDisabled(target.value.length <= 0);
    setText(target.value);
  }

  const onClick = (evt: MouseEvent<HTMLButtonElement>) => {
    let str = text;
    setLoader(true);
    setText('');

    let circleOptions: CircleProps[] = [];

    str.split('').forEach((char, index) => {
      circleOptions.push({
        letter: char.toUpperCase(),
        state: index===str.length-1 || index===0  ? ElementStates.Changing : ElementStates.Default,
      })
    })
    setCircleOptions([...circleOptions]);
    setVisible(true);

    reverseArrByStep([...circleOptions], 0, circleOptions.length - 1);
  }

  const reverseArrByStep = (arr: CircleProps[], head: number, tail: number) => {
    if (tail > head) {
      setTimeout(function(){
        let temp = arr[head];
        arr[head] = arr[tail];
        arr[tail] = temp;

        arr[head].state = ElementStates.Modified
        arr[tail].state = ElementStates.Modified

        head++;
        tail--;

        arr[head].state = ElementStates.Changing
        arr[tail].state = ElementStates.Changing

        setCircleOptions([...arr]);
        reverseArrByStep(arr, head, tail);
      }, DELAY_IN_MS);

    } else {
        if (tail <= head) {
          arr[head].state = ElementStates.Modified
          arr[tail].state = ElementStates.Modified
          setCircleOptions([...arr]);
        }
        setDisabled(true);
        setLoader(false);
        
    } 
  }

  return (
    <SolutionLayout title="Строка">
      <div className={Styles.wrapper}>
        <Input value={text} isLimitText={true} maxLength={11} extraClass={Styles.input} onChange={onChange}/>
        <Button text='Развернуть' disabled={disabled} isLoader={loader} onClick={onClick} />
      </div>

      {visible && (
        <div className={Styles.circles}>
          {
            circleOptions.map((option) => (
              <Circle key={uuidv4()} letter={option.letter} state={option.state}/>
            ))
          }
        </div>
      )}
      
    </SolutionLayout>
  );
};
