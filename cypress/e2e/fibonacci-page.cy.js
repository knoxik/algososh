import { SHORT_DELAY_IN_MS } from '../../src/constants/delays'


describe('Тестирование алгоритма fibonacci', function() {
    beforeEach(function() {
        cy.visit('http://localhost:3000/fibonacci');
    });

    it('Кнопка недоступна в пустом инпуте', function() {
        cy.get('[class^=input_input__]').first().as('input');
        cy.get('[data-testid^=button]').first().as('button');  
        cy.get('@input').should('have.value', '');
        cy.get('@button').should('be.disabled');   
    });

    it('Числа генерируются корректно', function() {
        cy.get('[class^=input_input__]').first().as('input');
        cy.get('[data-testid^=button]').first().as('button');
        cy.get('@input').type('6');  
        cy.get('@button').click();
        
        cy.get('[class^=circle_content__]').as('circles')
        const valueArr = ['1']
        cy.get('@circles').each(($circle_content, index) => {
            cy.wrap($circle_content).children().get('[class^=circle_circle__]').should('have.text', valueArr[index])
        });

        cy.wait(SHORT_DELAY_IN_MS);

        valueArr.push('1')
        cy.get('@circles').each(($circle_content, index) => {
            cy.wrap($circle_content).children().closest('[class^=circle_circle__]').should('have.text', valueArr[index])
        });

        cy.wait(SHORT_DELAY_IN_MS);

        valueArr.push('2')
        cy.get('@circles').each(($circle_content, index) => {
            cy.wrap($circle_content).children().closest('[class^=circle_circle__]').should('have.text', valueArr[index])      
        });

        cy.wait(SHORT_DELAY_IN_MS);

        valueArr.push('3')
        cy.get('@circles').each(($circle_content, index) => {
            cy.wrap($circle_content).children().closest('[class^=circle_circle__]').should('have.text', valueArr[index])      
        });

        cy.wait(SHORT_DELAY_IN_MS);

        valueArr.push('5')
        cy.get('@circles').each(($circle_content, index) => {
            cy.wrap($circle_content).children().closest('[class^=circle_circle__]').should('have.text', valueArr[index])   
        });

        cy.wait(SHORT_DELAY_IN_MS);

        valueArr.push('8')
        cy.get('@circles').each(($circle_content, index) => {
            cy.wrap($circle_content).children().closest('[class^=circle_circle__]').should('have.text', valueArr[index])
        });

        cy.wait(SHORT_DELAY_IN_MS);

        valueArr.push('13')
        cy.get('@circles').each(($circle_content, index) => {
            cy.wrap($circle_content).children().closest('[class^=circle_circle__]').should('have.text', valueArr[index]) 
        });

        cy.get('@input').should('have.text', '');
        cy.get('@button').should('be.disabled'); 
    });
});