import { SHORT_DELAY_IN_MS } from '../../src/constants/delays'


const CIRCLE_CHANGING = 'circle_changing';
const CIRCLE_DEFAULT = 'circle_default';
const CIRCLE_MODIFY = 'circle_modified';

describe('Тестирование stack', function() {
    beforeEach(function() {
        cy.visit('/stack');
    });

    it('Кнопка добавления недоступна в пустом инпуте', function() {
        cy.get('[class^=input_input__]').first().as('input');
        cy.contains('Добавить').as('button');  
        cy.get('@input').should('have.value', '');
        cy.get('@button').should('be.disabled');   
    });

    it('Элементы правильно добавляются в стек', function() {
        cy.get('[class^=input_input__]').first().as('input');
        cy.contains('Добавить').as('button');
        cy.get('@input').type('6');  
        cy.get('@button').click();
        
        cy.get('[class^=circle_content__]').as('circles')
        const valueArr = ['6']
        cy.get('@circles').each(($circle_content, index) => {
            cy.wrap($circle_content).children().get('[class^=circle_circle__]').should('have.text', valueArr[index])
            cy.wrap($circle_content).children().get('[class^=circle_circle__]').invoke('attr', 'class').then((className) => expect(className).contains(CIRCLE_CHANGING));
            cy.wrap($circle_content).children().get('[class*=circle_index__]').should('have.text', index)

            if (index === 0) {
                cy.wrap($circle_content).children().get('[class*=circle_head__]').should('have.text', 'top')
            }
        });

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get('@circles').each(($circle_content, index) => {
            cy.wrap($circle_content).children().get('[class^=circle_circle__]').should('have.text', valueArr[index])
            cy.wrap($circle_content).children().get('[class^=circle_circle__]').invoke('attr', 'class').then((className) => expect(className).contains(CIRCLE_DEFAULT));
            cy.wrap($circle_content).children().get('[class*=circle_index__]').should('have.text', index)

            if (index === 0) {
                cy.wrap($circle_content).children().get('[class*=circle_head__]').should('have.text', 'top')
            }
        });

        cy.wait(SHORT_DELAY_IN_MS);

        valueArr.push('3')
        cy.get('@input').type('3');  
        cy.get('@button').click();
        cy.get('@circles').each(($circle_content, index) => {
            cy.wrap($circle_content).children().closest('[class^=circle_circle__]').should('have.text', valueArr[index])
            cy.wrap($circle_content).children().closest('[class*=circle_index__]').should('have.text', index)
            if (index === 1) {
                cy.wrap($circle_content).children().closest('[class*=circle_head__]').should('have.text', 'top')
                cy.wrap($circle_content).children().closest('[class^=circle_circle__]').invoke('attr', 'class').then((className) => expect(className).contains(CIRCLE_CHANGING));
            } else { 
                cy.wrap($circle_content).children().closest('[class^=circle_circle__]').invoke('attr', 'class').then((className) => expect(className).contains(CIRCLE_DEFAULT));     
            }        
        });

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get('@circles').each(($circle_content, index) => {
            cy.wrap($circle_content).children().closest('[class^=circle_circle__]').should('have.text', valueArr[index])
            cy.wrap($circle_content).children().closest('[class*=circle_index__]').should('have.text', index)
            if (index === 1) {
                cy.wrap($circle_content).children().closest('[class*=circle_head__]').should('have.text', 'top')
            } else { 
                cy.wrap($circle_content).children().closest('[class^=circle_circle__]').invoke('attr', 'class').then((className) => expect(className).contains(CIRCLE_DEFAULT));     
            }        
        });

        cy.wait(SHORT_DELAY_IN_MS);

        valueArr.push('2')
        cy.get('@input').type('2');  
        cy.get('@button').click();
        cy.get('@circles').each(($circle_content, index) => {
            cy.wrap($circle_content).children().closest('[class^=circle_circle__]').should('have.text', valueArr[index])
            cy.wrap($circle_content).children().closest('[class*=circle_index__]').should('have.text', index)
            if (index === 2) {
                cy.wrap($circle_content).children().closest('[class*=circle_head__]').should('have.text', 'top')
                cy.wrap($circle_content).children().closest('[class^=circle_circle__]').invoke('attr', 'class').then((className) => expect(className).contains(CIRCLE_CHANGING));
            } else { 
                cy.wrap($circle_content).children().closest('[class^=circle_circle__]').invoke('attr', 'class').then((className) => expect(className).contains(CIRCLE_DEFAULT));     
            }        
        });

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get('@circles').each(($circle_content, index) => {
            cy.wrap($circle_content).children().closest('[class^=circle_circle__]').should('have.text', valueArr[index])
            cy.wrap($circle_content).children().closest('[class*=circle_index__]').should('have.text', index)
            if (index === 2) {
                cy.wrap($circle_content).children().closest('[class*=circle_head__]').should('have.text', 'top')
            } else { 
                cy.wrap($circle_content).children().closest('[class^=circle_circle__]').invoke('attr', 'class').then((className) => expect(className).contains(CIRCLE_DEFAULT));     
            }        
        });

        cy.get('@input').should('have.text', '');
        cy.get('@button').should('be.disabled'); 
    });

    it('Элементы правильно удаляются из стека', function() {
        cy.get('[class^=input_input__]').first().as('input');
        cy.contains('Добавить').as('add_button');
        cy.contains('Удалить').as('delete_button');

        cy.get('@input').type('6');  
        cy.get('@add_button').click();

        cy.wait(SHORT_DELAY_IN_MS);
        cy.wait(SHORT_DELAY_IN_MS);

        cy.get('@input').type('3');  
        cy.get('@add_button').click();

        cy.wait(SHORT_DELAY_IN_MS);
        cy.wait(SHORT_DELAY_IN_MS);
        

        cy.get('@delete_button').click();

        cy.get('[class^=circle_content__]').as('circles')
        
        cy.get('@circles').should('have.length', 2)
        const valueArr = ['6', '3']
        cy.get('@circles').each(($circle_content, index) => {
            cy.wrap($circle_content).children().closest('[class^=circle_circle__]').should('have.text', valueArr[index])
            cy.wrap($circle_content).children().closest('[class*=circle_index__]').should('have.text', index)

            if (index === 1) {
                cy.wrap($circle_content).children().closest('[class*=circle_head__]').should('have.text', 'top');
                cy.wrap($circle_content).children().closest('[class^=circle_circle__]').invoke('attr', 'class').then((className) => expect(className).contains(CIRCLE_CHANGING));
            } else {  
                cy.wrap($circle_content).children().closest('[class^=circle_circle__]').invoke('attr', 'class').then((className) => expect(className).contains(CIRCLE_DEFAULT));         
            }        
        });
        

        cy.wait(SHORT_DELAY_IN_MS);
        const valueArrStep2 = ['6']

        cy.get('@circles').should('have.length', 1)
        cy.get('@circles').each(($circle_content, index) => {
            cy.wrap($circle_content).children().closest('[class^=circle_circle__]').should('have.text', valueArrStep2[index])
            cy.wrap($circle_content).children().closest('[class*=circle_index__]').should('have.text', index)
            cy.wrap($circle_content).children().closest('[class^=circle_circle__]').invoke('attr', 'class').then((className) => expect(className).contains(CIRCLE_DEFAULT)); 
            cy.wrap($circle_content).children().closest('[class*=circle_head__]').should('have.text', 'top');      
        });

        cy.wait(SHORT_DELAY_IN_MS);
 
        cy.get('@delete_button').click();
        cy.get('@circles').each(($circle_content, index) => {
            cy.wrap($circle_content).children().closest('[class^=circle_circle__]').should('have.text', valueArrStep2[index])
            cy.wrap($circle_content).children().closest('[class^=circle_circle__]').invoke('attr', 'class').then((className) => expect(className).contains(CIRCLE_CHANGING));
            cy.wrap($circle_content).children().closest('[class*=circle_index__]').should('have.text', index);
            cy.wrap($circle_content).children().closest('[class*=circle_head__]').should('have.text', 'top');
        });
        

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get('@circles').should('have.length', 0)
    })

    it('Очистка стека работает правильно', function() {
        cy.get('[class^=input_input__]').first().as('input');
        cy.contains('Добавить').as('button');   
        cy.contains('Очистить').as('clear_button');   
        cy.get('@input').type('6');  
        cy.get('@button').click();
        cy.wait(SHORT_DELAY_IN_MS);
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get('[class^=circle_content__]').as('circles');
        cy.get('@circles').should('have.length', 1);
        cy.get('@clear_button').click();
        cy.get('@circles').should('have.length', 0);
    });
});