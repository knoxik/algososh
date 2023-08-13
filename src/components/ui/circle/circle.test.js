import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';

import { Circle } from './circle';
import { ElementStates } from '../../../types/element-states';
import { StringComponent } from '../../string/string';

describe('Проверка circle', () => {
    it('Circle без буквы', () => {
        const CircleComponent = renderer.create(<Circle />).toJSON();
        expect(CircleComponent).toMatchSnapshot();
    }) 

    it('Circle с буквой', () => {
        const CircleComponent = renderer.create(<Circle letter='a' />).toJSON();
        expect(CircleComponent).toMatchSnapshot();
    }) 

    it('Circle с head', () => {
        const CircleComponent = renderer.create(<Circle head='1'/>).toJSON();
        expect(CircleComponent).toMatchSnapshot();
    }) 

    it('Circle с react-элементом в head', () => {
        const CircleComponent = renderer.create(<Circle head={<Circle/>}/>).toJSON();
        expect(CircleComponent).toMatchSnapshot();
    }) 

    it('Circle с tail', () => {
        const CircleComponent = renderer.create(<Circle tail='1'/>).toJSON();
        expect(CircleComponent).toMatchSnapshot();
    }) 

    it('Circle с react-элементом в tail', () => {
        const CircleComponent = renderer.create(<Circle tail={<Circle />}/>).toJSON();
        expect(CircleComponent).toMatchSnapshot();
    }) 

    it('Circle с index', () => {
        const CircleComponent = renderer.create(<Circle index={1}/>).toJSON();
        expect(CircleComponent).toMatchSnapshot();
    }) 

    it('Circle с пропом isSmall ===  true', () => {
        const CircleComponent = renderer.create(<Circle isSmall={true}/>).toJSON();
        expect(CircleComponent).toMatchSnapshot();
    }) 

    it('Circle в состоянии default', () => {
        const CircleComponent = renderer.create(<Circle state={ElementStates.Default}/>).toJSON();
        expect(CircleComponent).toMatchSnapshot();
    }) 

    it('Circle в состоянии changing', () => {
        const CircleComponent = renderer.create(<Circle state={ElementStates.Changing}/>).toJSON();
        expect(CircleComponent).toMatchSnapshot();
    }) 

    it('Circle в состоянии modified', () => {
        const CircleComponent = renderer.create(<Circle state={ElementStates.Modified}/>).toJSON();
        expect(CircleComponent).toMatchSnapshot();
    })     
});