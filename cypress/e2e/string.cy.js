import { DELAY_IN_MS } from '../../src/constants/delays'


const CIRCLE_CHANGING = 'circle_changing';
const CIRCLE_DEFAULT = 'circle_default';
const CIRCLE_MODIFY = 'circle_modified';

describe('Тестирование алгоритма string', function() {
    beforeEach(function() {
        cy.visit('/recursion');
    });

    it('Кнопка недоступна в пустом инпуте', function() {
        cy.get('[class^=input_input__]').first().as('input');
        cy.get('[data-testid^=button]').first().as('button');  
        cy.get('@input').should('have.value', '');
        cy.get('@button').should('be.disabled');   
    });

    it('Строка разворачивается корректно', function() {
        cy.get('[class^=input_input__]').first().as('input');
        cy.get('[data-testid^=button]').first().as('button');
        cy.get('@input').type('hello');  
        cy.get('@button').click();
        
        cy.get('[class^=circle_circle__]').as('circles')
        const valueArr = ['H', 'E', 'L', 'L', 'O']
        cy.get('@circles').each(($circle, index) => {
            cy.wrap($circle).children().should('have.text', valueArr[index])
            if (index === 0 || index === 4) {
                cy.wrap($circle).invoke('attr', 'class').then((className) => expect(className).contains(CIRCLE_CHANGING));
            } else {
                cy.wrap($circle).invoke('attr', 'class').then((className) => expect(className).contains(CIRCLE_DEFAULT));
            }         
        });

        cy.wait(DELAY_IN_MS);

        const valueArrStep2 = ['O', 'E', 'L', 'L', 'H']
        cy.get('@circles').each(($circle, index) => {
            cy.wrap($circle).children().should('have.text', valueArrStep2[index])
            if (index === 0 || index === 4) {
                cy.wrap($circle).invoke('attr', 'class').then((className) => expect(className).contains(CIRCLE_MODIFY));
            } else if (index === 1 || index === 3) {
                cy.wrap($circle).invoke('attr', 'class').then((className) => expect(className).contains(CIRCLE_CHANGING));
            } else {
                cy.wrap($circle).invoke('attr', 'class').then((className) => expect(className).contains(CIRCLE_DEFAULT));
            }         
        });

        cy.wait(DELAY_IN_MS);

        const valueArrStep3 = ['O', 'L', 'L', 'E', 'H']
        cy.get('@circles').each(($circle, index) => {
            cy.wrap($circle).children().should('have.text', valueArrStep3[index]);
            cy.wrap($circle).invoke('attr', 'class').then((className) => expect(className).contains(CIRCLE_MODIFY));
        });

        cy.get('@input').should('have.text', '');
        cy.get('@button').should('be.disabled'); 
    });
});