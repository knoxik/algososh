import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import Styles from './stack-page.module.css';
import { ChangeEvent } from "react";
import { Circle } from "../ui/circle/circle";
import { stack } from "../../types/stack";
import { delay } from "../../utils/delay";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { v4 as uuidv4 } from 'uuid';

const MAX_VALUE_LEN = 4;

type TRes = {
  value?: string,
  changing?: boolean;
}

export const StackPage: React.FC = () => {
  const [disabledAdd, setDisabledAdd] = React.useState(true);
  const [disabledDelete, setDisabledDelete] = React.useState(true);
  const [disabledClear, setDisabledClear] = React.useState(true);
  const [loaderAdd, setLoaderAdd] = React.useState(false);
  const [loaderDelete, setLoaderDelete] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [resArr, setResArr] = React.useState<TRes[]>([])
  const [value, setValue] = React.useState('');
  
  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const target = evt.target;
    setDisabledAdd(target.value.length <= 0);
    setValue(target.value);
  }

  const setBtns = () => {
    setDisabledDelete(stack.getSize() <= 0)
    setDisabledClear(stack.getSize() <= 0)
  }

  const handleAdd = async () => {
    const text = value;
    setValue('');
    setLoaderAdd(true);
    setDisabledDelete(true);
    setDisabledClear(true);
    
    const prevResArr = [...resArr]
    setResArr([...resArr, {value: text, changing: true}]);
    stack.push(text);
    setVisible(true); 

    await delay(SHORT_DELAY_IN_MS);

    setResArr([...prevResArr, {value: text, changing: false}]);
    setLoaderAdd(false);
    setDisabledAdd(true);
    setBtns();
  }

  const handleDelete = async () => {
    setValue('');
    setLoaderDelete(true);
    setDisabledAdd(true);
    setDisabledClear(true);

    const lastElement = resArr[stack.getSize() - 1];
    lastElement.changing = true;
    stack.pop();

    await delay(SHORT_DELAY_IN_MS);
    resArr.pop();

    setLoaderDelete(false);
    setBtns();
  }

  const handleClear = () => {
    stack.clear();
    setBtns();
    setResArr([]);
  }

  return (
    <SolutionLayout title="Стек">
      <div className={Styles.wrapper}>
        <Input placeholder='Введите значение' value={value} isLimitText={true} maxLength={MAX_VALUE_LEN} extraClass={Styles.input} onChange={onChange}/>
        <Button text='Добавить' disabled={disabledAdd} isLoader={loaderAdd} onClick={handleAdd} />
        <Button text='Удалить' disabled={disabledDelete} isLoader={loaderDelete} onClick={handleDelete} />
        <Button text='Очистить' disabled={disabledClear} isLoader={false} onClick={handleClear} extraClass={Styles.marginBtn}/>
      </div>

      {visible && (

        <div className={Styles.circles}>
        {      
          resArr.map((obj, index) => (
            <Circle key={uuidv4()} letter={obj.value} index={index} head={index === resArr.length-1 ? 'top' : null} state={obj.changing ? ElementStates.Changing : ElementStates.Default}/>
          ))
        }
      </div>
      )}

    </SolutionLayout>
  );
};
