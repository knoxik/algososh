import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import Styles from './list-page.module.css'
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle, CircleProps } from "../ui/circle/circle";
import { nanoid } from "nanoid";
import { ElementStates } from "../../types/element-states";
import { linkedList } from "../../types/linked-list";
import { ChangeEvent } from "react";
import { delay } from "../../utils/delay";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

const MAX_VALUE_LEN = 4;

export const ListPage: React.FC = () => {
  const [inputValue, setInputValue] = React.useState('');
  const [inputIndex, setInputIndex] = React.useState('');
  const [disAddHead, setDisAddHead] = React.useState(true);
  const [disAddTail, setDisAddTail] = React.useState(true);
  const [disDeleteHead, setDisDeleteHead] = React.useState(false);
  const [disDeteleTail, setDisDeleteTail] = React.useState(false);
  const [disDelAt, setDisDelAt] = React.useState(true);
  const [disAddAt, setDisAddAt] = React.useState(true);
  const [loaderAddHead, setLoaderAddHead] = React.useState(false);
  const [loaderAddTail, setLoaderAddTail] = React.useState(false);
  const [loaderDelHead, setLoaderDelHead] = React.useState(false);
  const [loaderDelTail, setLoaderDelTail] = React.useState(false);
  const [loaderAddAt, setLoaderAddAt] = React.useState(false);
  const [loaderDelAt, setLoaderDelAt] = React.useState(false);
  const [circleProps, setCircleProps] = React.useState<CircleProps[]>([])
  

  React.useEffect(() => {
    const arr = [];
    linkedList.clear();
    for (let i = 0; i < 4; i++) {
      linkedList.append(String(i*2))
      if (i === 0) {
        arr.push({head: 'head', tail: '', letter: String(i*2), state: ElementStates.Default})
      } else if (i === 3) {
        arr.push({head: '', tail: 'tail', letter: String(i*2), state: ElementStates.Default})
      } else {
        arr.push({head: '', tail: '', letter: String(i*2), state: ElementStates.Default})
      }
    }
    setCircleProps([...arr])
  }, [])

  const onChangeValue = (evt: ChangeEvent<HTMLInputElement>) => {
    const target = evt.target;
    setInputValue(target.value);
    setDisAddHead(target.value.length <= 0);
    setDisAddTail(target.value.length <= 0);
    setDisAddAt(!(target.value.length > 0 && inputIndex.length > 0 && parseInt(inputIndex) <= linkedList.getSize()))
  }

  const onChangeIndex = (evt: ChangeEvent<HTMLInputElement>) => {
    const target = evt.target;
    setInputIndex(target.value);
    setDisDelAt(!(target.value.length > 0 && parseInt(target.value) <= linkedList.getSize() - 1));
    setDisAddAt(!(target.value.length > 0 && inputValue.length > 0 && parseInt(target.value) <= linkedList.getSize()))
  }

  const enableBtnsAfterHandleAdd = () => {
    setLoaderAddHead(false);
    setLoaderAddTail(false);
    setDisAddHead(true);
    setDisAddTail(true);
    setDisDeleteHead(false);
    setDisDeleteTail(false);
  }

  const handleAdd = async (method: string) => {
    setLoaderAddHead(method === 'head');
    setLoaderAddTail(method === 'tail');
    const value = inputValue;
    setInputValue('');
    setInputIndex('');

    setDisAddHead(method !== 'head')
    setDisAddTail(method !== 'tail')
    setDisDeleteHead(true);
    setDisDeleteTail(true);
    setDisAddAt(true);
    setDisDelAt(true);

    const propsArr = [...circleProps];

    if (linkedList.getSize() === 0) {
      linkedList.append(value);
      propsArr.push({head: 'head', tail: 'tail', letter: value, state: ElementStates.Default});
      setCircleProps([...propsArr]);
      console.log(linkedList);
      enableBtnsAfterHandleAdd();
      return;
    }

    if (method === 'head') {
      propsArr[0].head = <Circle letter={value} state={ElementStates.Changing} isSmall={true} />;
      linkedList.prepend(value);
    } else {
      propsArr[linkedList.getSize() - 1].head = <Circle letter={value} state={ElementStates.Changing} isSmall={true} />;
      linkedList.append(value);
    }
    
    setCircleProps([...propsArr]);

    await delay(SHORT_DELAY_IN_MS);
    let index = null
    if (method === 'head') {
      index = 0;
      propsArr[0].head = '';
      propsArr.unshift({head: 'head', tail: '', letter: value, state: ElementStates.Modified});
    } else {
      const size = linkedList.getSize();
      index = size - 1;
      if (size === 2) {
        propsArr[index - 1].head = 'head';
      } else {
        propsArr[index - 1].head = '';
      }
      propsArr[index - 1].tail = '';
      propsArr.push({head: '', tail: 'tail', letter: value, state: ElementStates.Modified})
    }
    
    setCircleProps([...propsArr]);

    await delay(SHORT_DELAY_IN_MS);
    propsArr[index].state = ElementStates.Default;
    setCircleProps([...propsArr]);
    
    enableBtnsAfterHandleAdd();
  }

  const enableBtnsAfterHandleDelete = () => {
    setLoaderDelHead(false)
    setLoaderDelTail(false)
    if (linkedList.getSize() === 0) {
      setDisDeleteHead(true)
      setDisDeleteTail(true)
    } else {
      setDisDeleteHead(false)
      setDisDeleteTail(false)
    }
  }

  const handleDelete = async (method: string) => {
    setLoaderDelHead(method === 'head')
    setLoaderDelTail(method === 'tail')
    setInputValue('')
    setInputIndex('')
    setDisDeleteHead(method !== 'head')
    setDisDeleteTail(method !== 'tail')
    setDisAddHead(true)
    setDisAddTail(true)
    setDisAddAt(true)
    setDisDelAt(true)

    const propsArr = [...circleProps];
    const head = linkedList.getHead();
    const tail = linkedList.getTail();

    if (method === 'head') {
      propsArr[0].tail = <Circle letter={head?.value} state={ElementStates.Changing} isSmall={true} />;
      propsArr[0].letter = '';
      linkedList.deleteHead();
    } else {
      const lastIndex = linkedList.getSize() - 1;
      propsArr[lastIndex].tail = <Circle letter={tail?.value} state={ElementStates.Changing} isSmall={true} />;
      propsArr[lastIndex].letter = '';
      linkedList.deleteTail();
    }   
    setCircleProps([...propsArr]);
    
    await delay(SHORT_DELAY_IN_MS);

    if (linkedList.getSize() === 0) {
      setCircleProps([]);
      setDisDeleteHead(true);
      setDisDeleteTail(true);
      enableBtnsAfterHandleDelete();
      return;
    }

    if (method === 'head') {
      propsArr.shift();
      propsArr[0].head = 'head';
    } else {
      const lastIndex = linkedList.getSize() - 1;
      propsArr.pop();
      propsArr[lastIndex].tail = 'tail';
    }
    
    setCircleProps([...propsArr]);

    enableBtnsAfterHandleDelete();
  }

  const enableBtnsAfterHandleAt = () => {
    setLoaderAddAt(false);
    setDisAddAt(true);
    setDisDeleteHead(false)
    setDisDeleteTail(false)
  }

  const handleAddAt = async () => {
    if (inputIndex === '0') {
      return handleAdd('head');
    }

    if (parseInt(inputIndex) === linkedList.getSize()) {
      return handleAdd('tail');
    }

    if (!linkedList.insertAt(inputValue, parseInt(inputIndex))) {
      alert('Неверный индекс')
      console.log(linkedList)
      return;
    }

    setLoaderAddAt(true);
    const index = inputIndex
    const value = inputValue
    setInputIndex('')
    setInputValue('')
    setDisAddHead(true)
    setDisAddTail(true)
    setDisDeleteHead(true)
    setDisDeleteTail(true)
    setDisDelAt(true)

    const propsArr = JSON.parse(JSON.stringify(circleProps));
    const smallCircle = <Circle letter={value} state={ElementStates.Changing} isSmall={true} />;
    propsArr[0].head = smallCircle;
    setCircleProps([...propsArr]);
    await delay(SHORT_DELAY_IN_MS);

    propsArr[0].head = 'head'
    

    for (let i = 0; i < propsArr.length - 1; i++) {
      propsArr[i].state = ElementStates.Changing;
      propsArr[i+1].head = smallCircle;
      setCircleProps([...propsArr]);
      await delay(SHORT_DELAY_IN_MS);

      if (parseInt(index) === i + 1) {
        const newProps = {head: '', tail: '', letter: value, state: ElementStates.Modified}
        const newArr = [...circleProps.slice(0, i + 1), newProps, ...circleProps.slice(i + 1)]
        setCircleProps([...newArr]);
        await delay(SHORT_DELAY_IN_MS);
        newArr[i + 1].state = ElementStates.Default;
        setCircleProps([...newArr]);
        
        enableBtnsAfterHandleAt();
        return;
      }

      propsArr[i+1].head = '';
    }
  }

  const enableBtnsAfterHandleDeleteAt = () => {
    setLoaderDelAt(false);
    setDisDelAt(true);
    if (linkedList.getSize() === 0) {
      setDisDeleteHead(true);
      setDisDeleteTail(true);
    } else {
      setDisDeleteHead(false);
      setDisDeleteTail(false);
    }
  }

  const handleDeleteAt = async () => {
    if (inputIndex === '0') {
      return handleDelete('head');
    }

    if (parseInt(inputIndex) + 1 === linkedList.getSize()) {
      return handleDelete('tail');
    }

    if (!linkedList.deleteAt(parseInt(inputIndex))) {
      alert('Неверный индекс')
      return;
    }

    setLoaderDelAt(true);
    const index = inputIndex;
    setInputIndex('');
    setInputValue('');
    setDisAddHead(true);
    setDisAddTail(true);
    setDisDeleteHead(true);
    setDisDeleteTail(true);
    setDisAddAt(true);

    const propsArr = JSON.parse(JSON.stringify(circleProps));

    for (let i = 0; i < propsArr.length; i++) {
      propsArr[i].state = ElementStates.Changing
      setCircleProps([...propsArr]);
      await delay(SHORT_DELAY_IN_MS);

      if (i === parseInt(index)) {
        propsArr[i].tail = <Circle letter={propsArr[i].letter} state={ElementStates.Changing} isSmall={true} />;
        propsArr[i].letter = '';
        propsArr[i].state = ElementStates.Default
        setCircleProps([...propsArr]);
        await delay(SHORT_DELAY_IN_MS);
        const newArr = [...circleProps.slice(0, i), ...circleProps.slice(i + 1)]
        setCircleProps([...newArr]);
        
        enableBtnsAfterHandleDeleteAt();
        return;
      }
    }
  }

  return (
    <SolutionLayout title="Связный список">
      <div className={Styles.wrapper}>
        <Input placeholder='Введите значение' value={inputValue} isLimitText={true} maxLength={MAX_VALUE_LEN} extraClass={Styles.input} onChange={onChangeValue}/>
        <Button text='Добавить в head' disabled={disAddHead} isLoader={loaderAddHead} onClick={() => handleAdd('head')} />
        <Button text='Добавить в tail' disabled={disAddTail} isLoader={loaderAddTail} onClick={() => handleAdd('tail')} />
        <Button text='Удалить из head' disabled={disDeleteHead} isLoader={loaderDelHead} onClick={() => handleDelete('head')} />
        <Button text='Удалить из tail' disabled={disDeteleTail} isLoader={loaderDelTail} onClick={() => handleDelete('tail')} />
      </div>

      <div className={Styles.wrapper}>
        <Input placeholder='Введите индекс' value={inputIndex} extraClass={Styles.input} onChange={onChangeIndex} type='number' />
        <Button text='Добавить по индексу' linkedList='big' disabled={disAddAt} isLoader={loaderAddAt} onClick={handleAddAt} />
        <Button text='Удалить по индексу' linkedList='big' disabled={disDelAt} isLoader={loaderDelAt} onClick={handleDeleteAt} />
      </div>

      <div className={Styles.circles}>
      {      
        circleProps.map((obj, index) => (
          <div className={Styles.circle_wrapper} key={nanoid()}>
            <Circle letter={obj.letter} index={index} head={obj.head} tail={obj.tail} state={obj.state}/>
            {index !== circleProps.length - 1 && (
            <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path className={Styles[obj.state ? obj.state : '']} fillRule="evenodd" clipRule="evenodd" d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L9.41421 8L1.70711 15.7071C1.31658 16.0976 0.683417 16.0976 0.292893 15.7071C-0.0976311 15.3166 -0.0976311 14.6834 0.292893 14.2929L6.58579 8L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z"/>
            </svg>
            )}
          </div>
        ))
      }
      </div>
    </SolutionLayout>
  );
};
