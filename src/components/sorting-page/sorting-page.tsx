import React, { ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import Styles from './sorting-page.module.css'
import { Direction } from "../../types/direction";
import { createRandomArray } from "../../utils/createRandomArray";
import { nanoid } from "nanoid";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../../utils/delay";
import { swap } from "../../utils/swapInArray";
import { SortNames } from "../../types/sort-names";

export const SortingPage: React.FC = () => {
  const [radioValue, setRadioValue] = React.useState(SortNames.Selection)
  const [randomArr, setRandomArr] = React.useState<{value: number, color:ElementStates}[]>(createRandomArray());
  const [disableDescBtn, setDisableDescBtn] = React.useState(false);
  const [disableAscBtn, setDisableAscBtn] = React.useState(false);
  const [disableArrBtn, setDisableArrBtn] = React.useState(false);
  const [loaderDesc, setLoaderDesc] = React.useState(false);
  const [loaderAsc, setLoaderAsc] = React.useState(false);


  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setRadioValue(evt.target.defaultValue === SortNames.Bubble ? SortNames.Bubble : SortNames.Selection) 
  }

  const handleRandom = () => {
    setRandomArr(createRandomArray());
  }

  const calcMinHeight = (number: number): string => {
    if (number === 0) return '2px';
    return `${(340 * number) / 100}px`;
  }

  const handleSort = async (sorting: Direction) => {
    setDisableArrBtn(true);
    if (sorting === Direction.Ascending) {
      setLoaderAsc(true);
      setDisableDescBtn(true);
    } else {
      setLoaderDesc(true)
      setDisableAscBtn(true);
    }

    const arr = resetToDefaultColor(randomArr);

    if (radioValue === SortNames.Selection) {
      await selectionSortByStep(arr, sorting)
    } else {
      await bubbleSortByStep(arr, sorting)
    }
    setLoaderAsc(false);
    setLoaderDesc(false);
    setDisableAscBtn(false);
    setDisableDescBtn(false);
    setDisableArrBtn(false);
  }

  const resetToDefaultColor = (arr: {value: number, color:ElementStates}[]) => {
    arr.forEach(obj => {
      obj.color = ElementStates.Default
    })
    return arr
  }

  const selectionSortByStep = async (arr: {value: number, color:ElementStates}[], sorting: Direction) => {
    const { length } = arr;
    for (let i = 0; i < length - 1; i++) {
      let maxOrMinInd = i;
      arr[i].color = ElementStates.Changing
      for (let j = i + 1; j < length; j++) {
        arr[j].color = ElementStates.Changing
        
        setRandomArr([...arr])
        await delay(SHORT_DELAY_IN_MS);
        
        if (arr[j].value > arr[maxOrMinInd].value && sorting === Direction.Descending) {
          maxOrMinInd = j;
        }

        if (arr[j].value < arr[maxOrMinInd].value && sorting === Direction.Ascending) {
          maxOrMinInd = j;
        }

        arr[j].color = ElementStates.Default
        setRandomArr([...arr])
      }
      arr[i].color = ElementStates.Default
      arr[maxOrMinInd].color = ElementStates.Modified

      swap(arr, i, maxOrMinInd)
      
      setRandomArr([...arr])
    }
    arr[length-1].color = ElementStates.Modified
    setRandomArr([...arr])
  }

  const bubbleSortByStep = async (arr: {value: number, color:ElementStates}[], sorting: Direction) => {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
          if (arr[j].value < arr[j + 1].value && sorting === Direction.Ascending) {
            swap(arr, j, j + 1);
          }

          if (arr[j].value > arr[j + 1].value && sorting === Direction.Descending) {
            swap(arr, j, j + 1);
          }
          arr[j].color = ElementStates.Changing
          arr[j + 1].color = ElementStates.Changing
          setRandomArr([...arr])
          await delay(SHORT_DELAY_IN_MS)

          arr[j].color = ElementStates.Default
          setRandomArr([...arr])
      }
      arr[arr.length - i - 1].color = ElementStates.Modified
    }
    setRandomArr([...arr])
  }

  return (
    <SolutionLayout title="Сортировка массива" extraClass={Styles.extra}>
      <div className={Styles.control}>

        <div className={Styles.radio}>
          <RadioInput label='Выбор' name='sort' value={SortNames.Selection} defaultChecked={true} onChange={onChange}/>
          <RadioInput label='Пузырек' name='sort' value={SortNames.Bubble} onChange={onChange}/>
        </div>
        <div className={Styles.buttons}>
          <Button sorting={Direction.Ascending} text='По возрастанию' onClick={() => handleSort(Direction.Ascending)} disabled={disableAscBtn} isLoader={loaderAsc}/>
          <Button sorting={Direction.Descending} text='По убыванию' onClick={() => handleSort(Direction.Descending)} disabled={disableDescBtn} isLoader={loaderDesc}/>
        </div>
        <div className={Styles.button}>
          <Button text='Новый массив' onClick={handleRandom} disabled={disableArrBtn}/>
        </div>
      </div>

      <div className={Styles.content}>
        {
          randomArr.map(({value, color}) => (
            <div className={Styles.wrapper} key={nanoid()}>
              <div className={`${Styles.rectangle} ${Styles[color]}`} style={{minHeight: calcMinHeight(value)}}></div>
              <p className={Styles.number}>{value}</p>
            </div>
          ))
        }
      </div>
    </SolutionLayout>
  );
};
