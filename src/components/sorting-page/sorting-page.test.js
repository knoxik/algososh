import { render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SortingPage } from './sorting-page';
import { MemoryRouter } from 'react-router-dom';


const compareASC = (a, b) => {
    return a - b
}

const compareDESC = (a, b) => {
    return b - a
}

const renderSorting = () => {
    render(
        <MemoryRouter>
            <SortingPage/>
        </MemoryRouter>
    );
}

describe('Тестирование алгоритмов сортировки выбором и пузырьком', () => {
    it('массив из нескольких элементов сортировка выбором', async () => {  
        renderSorting()   

        const radioInput = screen.getByLabelText('Выбор')
        const AscButton = screen.getByText('По возрастанию')
        const DescButton = screen.getByText('По убыванию')
        userEvent.click(radioInput)
        userEvent.click(AscButton)

        let valuesArr = []
        screen.getAllByTestId('sort-value').forEach((value) => {
            valuesArr.push(parseInt(value.textContent))
        })
        let expectArr = valuesArr.sort(compareASC)
        expect(valuesArr).toBe(expectArr)

        userEvent.click(DescButton)
        valuesArr = []
        screen.getAllByTestId('sort-value').forEach((value) => {
            valuesArr.push(parseInt(value.textContent))
        })
        expectArr = valuesArr.sort(compareDESC)
        expect(valuesArr).toBe(expectArr)
    })

    it('массив из нескольких элементов сортировка пузырьком', async () => {  
        renderSorting()   

        const radioInput = screen.getByLabelText('Пузырек')
        const AscButton = screen.getByText('По возрастанию')
        const DescButton = screen.getByText('По убыванию')
        userEvent.click(radioInput)
        userEvent.click(AscButton)

        let valuesArr = []
        screen.getAllByTestId('sort-value').forEach((value) => {
            valuesArr.push(parseInt(value.textContent))
        })
        let expectArr = valuesArr.sort(compareASC)
        expect(valuesArr).toBe(expectArr)

        userEvent.click(DescButton)
        valuesArr = []
        screen.getAllByTestId('sort-value').forEach((value) => {
            valuesArr.push(parseInt(value.textContent))
        })
        expectArr = valuesArr.sort(compareDESC)
        expect(valuesArr).toBe(expectArr)
    })
})