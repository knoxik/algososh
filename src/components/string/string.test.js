import renderer from 'react-test-renderer';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { StringComponent } from './string';
import { MemoryRouter } from 'react-router-dom';


const getStringFromCircles = (circles) => {
    let string = '';
    circles.map((circle) => {
        string += circle.textContent;
    }, '')
    return string;
}

const renderString = () => {
    render(
        <MemoryRouter>
            <StringComponent/>
        </MemoryRouter>
    );
}

const typeAndClick = (value) => {
    const button = screen.getByTestId('button');
    const input = screen.getByPlaceholderText('Введите текст');    
    userEvent.type(input, value);
    userEvent.click(button);
}

describe('Тестирование алгоритма разворота строки', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });
    
      afterEach(() => {
        jest.useRealTimers();
    });

    
    

    it('Строка с чётным количеством символов', async () => {  
        renderString()   
        
        typeAndClick('hello')
        act(() => jest.advanceTimersByTime(50000));

        const circles = screen.getAllByTestId('circle-letter')
        const string = getStringFromCircles(circles)

        expect(string).toBe('OLLEH');
    })

    it('Строка с нечётным количеством символов', async () => {    
        renderString()

        typeAndClick('ello') 
        act(() => jest.advanceTimersByTime(50000));

        const circles = screen.getAllByTestId('circle-letter')
        const string = getStringFromCircles(circles)

        expect(string).toBe('OLLE');
    })

    it('Строка с одним символом', async () => {    
        renderString()

        typeAndClick('e') 
        act(() => jest.advanceTimersByTime(50000));

        const circles = screen.getAllByTestId('circle-letter')
        const string = getStringFromCircles(circles)

        expect(string).toBe('E');
    })

    it('Пустая строка', async () => {    
        renderString()

        const button = screen.getByTestId('button');
        expect(button).toBeDisabled();
    })
})