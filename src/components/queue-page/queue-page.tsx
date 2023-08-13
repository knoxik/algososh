import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import Styles from './queue-page.module.css';
import { ChangeEvent } from "react";
import { Circle } from "../ui/circle/circle";
import { queue } from "../../types/queue";
import { delay } from "../../utils/delay";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { v4 as uuidv4 } from 'uuid';

const MAX_VALUE_LEN = 4;

type TRes = {
  value?: string,
  changing?: boolean;
  head?: string;
  tail?: string;
}

export const QueuePage: React.FC = () => {
  const [disabledAdd, setDisabledAdd] = React.useState(true);
  const [disabledDelete, setDisabledDelete] = React.useState(true);
  const [disabledClear, setDisabledClear] = React.useState(true);
  const [loaderAdd, setLoaderAdd] = React.useState(false);
  const [loaderDelete, setLoaderDelete] = React.useState(false);
  const [resArr, setResArr] = React.useState<TRes[]>([])
  const [defaultArr, setDefaultArr] = React.useState<TRes[]>([])
  const [value, setValue] = React.useState('');

  React.useEffect(() => {
    const arr = [];
    for (let i = 0; i < queue.getSize(); i++) {
      arr.push({head: '', tail: '', changing: false, value: ''})
    }
    setResArr([...arr])
    setDefaultArr(JSON.parse(JSON.stringify(arr)))

  }, [])
  
  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const target = evt.target;
    if (queue.isFull()) {
      setDisabledAdd(true);
    } else {
      setDisabledAdd(target.value.length <= 0);
    }
    
    setValue(target.value);
  }

  const setDisabledBtns = (flag: boolean) => {
    setDisabledDelete(flag)
    setDisabledClear(flag)
  }

  const handleAdd = async () => {
    const text = value;
    setValue('');
    setLoaderAdd(true);
    setDisabledBtns(true);
    
    let newArr = [...resArr]

    newArr[queue.getTail()].changing = true;
    setResArr([...newArr]);
    await delay(SHORT_DELAY_IN_MS);

    if (queue.isEmpty()) {    
      newArr[queue.getTail()] = {value: text, changing: true, head: 'head', tail: 'tail'};
      setResArr([...newArr]);
    } else {
      newArr[queue.getTail() - 1].tail = '';
      newArr[queue.getTail()] = {value: text, changing: true, head: '', tail: 'tail'};
      setResArr([...newArr]);
    }
    await delay(SHORT_DELAY_IN_MS);
    newArr[queue.getTail()].changing = false;
    setResArr([...newArr]);
    queue.enqueue(text);

    setLoaderAdd(false);
    setDisabledAdd(true);
    setDisabledBtns(false);
  }

  const handleDelete = async () => {
    setValue('');
    setDisabledAdd(true);
    setDisabledBtns(true);

    let newArr = [...resArr]
    newArr[queue.getHead()].changing = true;
    setResArr([...newArr]);
    await delay(SHORT_DELAY_IN_MS);

    if (queue.isFull() && queue.getLength() === 1) {
      newArr[queue.getHead()] = {value: '', changing: false, head: 'head', tail: ''};
    } else {
      newArr[queue.getHead()] = {value: '', changing: false, head: '', tail: ''};
      newArr[queue.getHead() + 1].head = 'head';
    }
    
    setResArr([...newArr]);
    queue.dequeue();

    setLoaderDelete(false);
    setDisabledDelete(queue.isEmpty());
    setDisabledAdd(true);
    setDisabledClear(false);
  }

  const handleClear = () => {
    queue.clear();
    setDisabledAdd(true);
    setDisabledBtns(true);
    setResArr(JSON.parse(JSON.stringify(defaultArr)));
  }

  return (
    <SolutionLayout title="Очередь">
      <div className={Styles.wrapper}>
        <Input placeholder='Введите значение' value={value} isLimitText={true} maxLength={MAX_VALUE_LEN} extraClass={Styles.input} onChange={onChange}/>
        <Button text='Добавить' disabled={disabledAdd} isLoader={loaderAdd} onClick={handleAdd} />
        <Button text='Удалить' disabled={disabledDelete} isLoader={loaderDelete} onClick={handleDelete} />
        <Button text='Очистить' disabled={disabledClear} isLoader={false} onClick={handleClear} extraClass={Styles.marginBtn}/>
      </div>

      <div className={Styles.circles}>
      {      
        resArr.map((obj, index) => (
          <Circle key={uuidv4()} letter={obj.value} index={index} head={obj.head} tail={obj.tail} state={obj.changing ? ElementStates.Changing : ElementStates.Default}/>
        ))
      }
      </div>
    </SolutionLayout>
  );
};
