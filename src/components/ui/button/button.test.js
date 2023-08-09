import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';

import { Button } from './button';


const buttonActiveProps = {
    text: 'кнопка',
    isLoader: false
}

const buttonLoaderProps = {
    text: 'кнопка',
    isLoader: true
}

const buttonDisabledProps = {
    text: 'кнопка',
    isLoader: false,
    disabled: true
}

const buttonWithoutText = {
    isLoader: false,
}

const onClick = () => {
    alert('good')
}

describe('Проверка кнопки', () => {
    it('Кнопка активна', () => {
        const ButtonComponent = renderer.create(<Button {...buttonActiveProps}/>).toJSON();
        expect(ButtonComponent).toMatchSnapshot();
    }) 

    it('Кнопка не активна', () => {
        const ButtonComponent = renderer.create(<Button {...buttonDisabledProps}/>).toJSON();
        expect(ButtonComponent).toMatchSnapshot();
    }) 

    it('Лоадер на кнопке', () => {
        const ButtonComponent = renderer.create(<Button {...buttonLoaderProps}/>).toJSON();
        expect(ButtonComponent).toMatchSnapshot();
    }) 

    it('Кнопка без текста', () => {
        const ButtonComponent = renderer.create(<Button {...buttonWithoutText}/>).toJSON();
        expect(ButtonComponent).toMatchSnapshot();
    }) 

    it('Нажатие на кнопку вызывает корректный alert', () => {
        window.alert = jest.fn();
        render(<Button text='test' onClick={onClick}/>);

        const button = screen.getByText('test');
        fireEvent.click(button);
        expect(window.alert).toHaveBeenCalledWith('good');
    }) 
});