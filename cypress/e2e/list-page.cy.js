import { SHORT_DELAY_IN_MS } from '../../src/constants/delays'


const CIRCLE_CHANGING = 'circle_changing';
const CIRCLE_DEFAULT = 'circle_default';
const CIRCLE_MODIFY = 'circle_modified';

describe('Тестирование stack', function() {
    beforeEach(function() {
        cy.visit('/list');
    });

    it('Кнопка добавления, добавления по индексу, удаления недоступны в пустом инпуте', function() {
        cy.get('[class^=input_input__]').first().as('input');
        cy.contains('Добавить в head').as('head_button');  
        cy.contains('Добавить в tail').as('tail_button');  
        cy.contains('Удалить по индексу').as('delete_button');  
        cy.contains('Добавить по индексу').as('add_button');  
        cy.get('@input').should('have.value', '');
        cy.get('@head_button').should('be.disabled'); 
        cy.get('@tail_button').should('be.disabled'); 
        cy.get('@delete_button').should('be.disabled'); 
        cy.get('@add_button').should('be.disabled');   
    });

    it('Первоначальная отрисовка корректна', function() {
        const initialValues = ['0', '2', '4', '6'];
        cy.get('[class^=circle_content__]').as('circles')
        cy.get('@circles').should('have.length', 4)
        cy.get('@circles').each(($circle_content, index) => {
            cy.wrap($circle_content).children().closest('[class^=circle_circle__]').invoke('attr', 'class').then((className) => expect(className).contains(CIRCLE_DEFAULT));
            cy.wrap($circle_content).children().closest('[class^=circle_circle__]').should('have.text', initialValues[index])

            if (index === 0) {
                cy.wrap($circle_content).children().closest('[class*=circle_head__]').should('have.text', 'head')
            }

            if (index === 3) {
                cy.wrap($circle_content).children().closest('[class*=circle_tail60__]').should('have.text', 'tail')
            }
        })
    });

    it('Добавление в head работает корректно', function() {
        cy.get('input[placeholder="Введите значение"]').as('input');
        cy.contains('Добавить в head').as('button');
        cy.get('[class^=circle_content__]').as('circles');
        cy.get('@circles').should('have.length', 4);

        const add_value = '1';
        cy.get('@input').type(add_value);  
        cy.get('@button').click();

        cy.get('@circles').then(($circle) => {
            cy.get($circle[0]).find('[class*=circle_small__]').as('small_circle');
            cy.get('@small_circle').invoke('attr', 'class').then((className) => expect(className).contains(CIRCLE_CHANGING));
            cy.get('@small_circle').children().should('have.text', add_value);
        })

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get('@circles').should('have.length', 5);
        cy.get('@circles').then(($circle) => {
            cy.get($circle[0]).children().closest('[class^=circle_circle__]').invoke('attr', 'class').then((className) => expect(className).contains(CIRCLE_MODIFY));
            cy.get($circle[0]).children().closest('[class^=circle_circle__]').should('have.text', add_value);
            cy.get($circle[0]).children().closest('[class*=circle_head__]').should('have.text', 'head');
            cy.get($circle[1]).children().closest('[class*=circle_head__]').should('have.text', '');
        })

        cy.wait(SHORT_DELAY_IN_MS);
        cy.get('@circles').should('have.length', 5);
        cy.get('@circles').then(($circle) => {
            cy.get($circle[0]).children().closest('[class^=circle_circle__]').invoke('attr', 'class').then((className) => expect(className).contains(CIRCLE_DEFAULT));
            cy.get($circle[0]).children().closest('[class^=circle_circle__]').should('have.text', add_value);
            cy.get($circle[0]).children().closest('[class*=circle_head__]').should('have.text', 'head');
            cy.get($circle[1]).children().closest('[class*=circle_head__]').should('have.text', '');
        })
    });

    it('Удаление из head работает корректно', function() {
        cy.get('input[placeholder="Введите значение"]').as('input');
        cy.contains('Удалить из head').as('button');
        cy.get('[class^=circle_content__]').as('circles');
        cy.get('@circles').should('have.length', 4);

        const delete_value = '0';
        cy.get('@button').click();

        cy.get('@circles').then(($circle) => {
            cy.get($circle[0]).children().closest('[class^=circle_circle__]').should('have.text', '');
            cy.get($circle[0]).find('[class*=circle_small__]').as('small_circle');
            cy.get('@small_circle').invoke('attr', 'class').then((className) => expect(className).contains(CIRCLE_CHANGING));
            cy.get('@small_circle').children().should('have.text', delete_value);
        })

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get('@circles').should('have.length', 3);
        cy.get('@circles').then(($circle) => {
            cy.get($circle[0]).children().closest('[class^=circle_circle__]').invoke('attr', 'class').then((className) => expect(className).contains(CIRCLE_DEFAULT));
            cy.get($circle[0]).children().closest('[class^=circle_circle__]').should('have.text', 2);
            cy.get($circle[0]).children().closest('[class*=circle_head__]').should('have.text', 'head');
        })
    });

    it('Добавление в tail работает корректно', function() {
        cy.get('input[placeholder="Введите значение"]').as('input');
        cy.contains('Добавить в tail').as('button');
        cy.get('[class^=circle_content__]').as('circles');
        cy.get('@circles').should('have.length', 4);

        const add_value = '1';
        cy.get('@input').type(add_value);  
        cy.get('@button').click();

        cy.get('@circles').then(($circle) => {
            cy.get($circle[4]).find('[class*=circle_small__]').as('small_circle');
            cy.get('@small_circle').invoke('attr', 'class').then((className) => expect(className).contains(CIRCLE_CHANGING));
            cy.get('@small_circle').children().should('have.text', add_value);
        })

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get('@circles').should('have.length', 5);
        cy.get('@circles').then(($circle) => {
            cy.get($circle[4]).children().closest('[class^=circle_circle__]').invoke('attr', 'class').then((className) => expect(className).contains(CIRCLE_MODIFY));
            cy.get($circle[4]).children().closest('[class^=circle_circle__]').should('have.text', add_value);
            cy.get($circle[4]).children().closest('[class*=circle_tail60__]').should('have.text', 'tail');
            cy.get($circle[3]).children().closest('[class*=circle_tail60__]').should('have.text', '');
        })

        cy.wait(SHORT_DELAY_IN_MS);
        cy.get('@circles').should('have.length', 5);
        cy.get('@circles').then(($circle) => {
            cy.get($circle[4]).children().closest('[class^=circle_circle__]').invoke('attr', 'class').then((className) => expect(className).contains(CIRCLE_DEFAULT));
            cy.get($circle[4]).children().closest('[class^=circle_circle__]').should('have.text', add_value);
            cy.get($circle[4]).children().closest('[class*=circle_tail60__]').should('have.text', 'tail');
            cy.get($circle[3]).children().closest('[class*=circle_tail60__]').should('have.text', '');
        })
    });

    it('Удаление из tail работает корректно', function() {
        cy.get('input[placeholder="Введите значение"]').as('input');
        cy.contains('Удалить из tail').as('button');
        cy.get('[class^=circle_content__]').as('circles');
        cy.get('@circles').should('have.length', 4);

        const delete_value = '6';
        cy.get('@button').click();

        cy.get('@circles').then(($circle) => {
            cy.get($circle[3]).children().closest('[class^=circle_circle__]').should('have.text', '');
            cy.get($circle[3]).find('[class*=circle_small__]').as('small_circle');
            cy.get('@small_circle').invoke('attr', 'class').then((className) => expect(className).contains(CIRCLE_CHANGING));
            cy.get('@small_circle').children().should('have.text', delete_value);
        })

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get('@circles').should('have.length', 3);
        cy.get('@circles').then(($circle) => {
            cy.get($circle[2]).children().closest('[class^=circle_circle__]').invoke('attr', 'class').then((className) => expect(className).contains(CIRCLE_DEFAULT));
            cy.get($circle[2]).children().closest('[class^=circle_circle__]').should('have.text', 4);
            cy.get($circle[2]).children().closest('[class*=circle_tail60__]').should('have.text', 'tail');
        })
    });

    it('Добавление по индексу работает корректно', function() {
        cy.get('input[placeholder="Введите значение"]').as('input');
        cy.get('input[placeholder="Введите индекс"]').as('input_index');
        cy.contains('Добавить по индексу').as('button');
        cy.get('[class^=circle_content__]').as('circles');
        cy.get('@circles').should('have.length', 4);

        const add_value = '1';
        const add_index = '1';
        cy.get('@input').type(add_value);  
        cy.get('@input_index').type(add_index);  
        cy.get('@button').click();

        cy.get('@circles').then(($circle) => {
            cy.get($circle[0]).find('[class*=circle_small__]').as('small_circle');
            cy.get('@small_circle').invoke('attr', 'class').then((className) => expect(className).contains(CIRCLE_CHANGING));
            cy.get('@small_circle').children().should('have.text', add_value);
        })

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get('@circles').should('have.length', 5);
        cy.get('@circles').then(($circle) => {
            cy.get($circle[0]).children().closest('[class^=circle_circle__]').invoke('attr', 'class').then((className) => expect(className).contains(CIRCLE_CHANGING));
            cy.get($circle[0]).children().closest('[class^=circle_circle__]').should('have.text', 0);
            cy.get($circle[0]).children().closest('[class*=circle_head__]').should('have.text', 'head');
            cy.get($circle[1]).find('[class*=circle_small__]').as('small_circle');
            cy.get('@small_circle').invoke('attr', 'class').then((className) => expect(className).contains(CIRCLE_CHANGING));
            cy.get('@small_circle').children().should('have.text', add_value);
        })

        cy.wait(SHORT_DELAY_IN_MS);
        cy.get('@circles').should('have.length', 5);
        cy.get('@circles').then(($circle) => {
            cy.get($circle[0]).children().closest('[class^=circle_circle__]').invoke('attr', 'class').then((className) => expect(className).contains(CIRCLE_DEFAULT));
            cy.get($circle[0]).children().closest('[class^=circle_circle__]').should('have.text', 0);
            cy.get($circle[0]).children().closest('[class*=circle_head__]').should('have.text', 'head');
            cy.get($circle[1]).children().closest('[class*=circle_head__]').should('have.text', '');
            cy.get($circle[1]).children().closest('[class^=circle_circle__]').invoke('attr', 'class').then((className) => expect(className).contains(CIRCLE_MODIFY));
            cy.get($circle[1]).children().closest('[class*=circle_circle__]').should('have.text', add_value);
            cy.get($circle[1]).children().closest('[class*=circle_index__]').should('have.text', add_index);
            cy.get($circle[2]).children().closest('[class*=circle_index__]').should('have.text', 2);
            cy.get($circle[2]).children().closest('[class*=circle_circle__]').should('have.text', 2);
        })

        cy.wait(SHORT_DELAY_IN_MS);
        cy.get('@circles').should('have.length', 5);
        cy.get('@circles').then(($circle) => {
            cy.get($circle[0]).children().closest('[class^=circle_circle__]').invoke('attr', 'class').then((className) => expect(className).contains(CIRCLE_DEFAULT));
            cy.get($circle[0]).children().closest('[class^=circle_circle__]').should('have.text', 0);
            cy.get($circle[0]).children().closest('[class*=circle_head__]').should('have.text', 'head');
            cy.get($circle[1]).children().closest('[class*=circle_head__]').should('have.text', '');
            cy.get($circle[1]).children().closest('[class^=circle_circle__]').invoke('attr', 'class').then((className) => expect(className).contains(CIRCLE_DEFAULT));
            cy.get($circle[1]).children().closest('[class*=circle_circle__]').should('have.text', add_value);
            cy.get($circle[1]).children().closest('[class*=circle_index__]').should('have.text', add_index);
            cy.get($circle[2]).children().closest('[class*=circle_index__]').should('have.text', 2);
            cy.get($circle[2]).children().closest('[class*=circle_circle__]').should('have.text', 2);
        })
    });

    it('Удаление по индексу работает корректно', function() {
        cy.get('input[placeholder="Введите индекс"]').as('input_index');
        cy.contains('Удалить по индексу').as('button');
        cy.get('[class^=circle_content__]').as('circles');
        cy.get('@circles').should('have.length', 4);

        const delete_index = '1';  
        cy.get('@input_index').type(delete_index);  
        cy.get('@button').click();

        cy.get('@circles').then(($circle) => {
            cy.get($circle[0]).children().closest('[class^=circle_circle__]').invoke('attr', 'class').then((className) => expect(className).contains(CIRCLE_CHANGING));
        })

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get('@circles').then(($circle) => {
            cy.get($circle[0]).children().closest('[class^=circle_circle__]').invoke('attr', 'class').then((className) => expect(className).contains(CIRCLE_CHANGING));
            cy.get($circle[1]).children().closest('[class^=circle_circle__]').invoke('attr', 'class').then((className) => expect(className).contains(CIRCLE_CHANGING));
        })

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get('@circles').then(($circle) => {
            cy.get($circle[1]).find('[class*=circle_small__]').as('small_circle');
            cy.get('@small_circle').invoke('attr', 'class').then((className) => expect(className).contains(CIRCLE_CHANGING));
            cy.get('@small_circle').children().should('have.text', 2);
            cy.get($circle[1]).children().closest('[class^=circle_circle__]').should('have.text', '');            
        })

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get('@circles').should('have.length', 3);
        cy.get('@circles').then(($circle) => {
            cy.get($circle[0]).children().closest('[class^=circle_circle__]').invoke('attr', 'class').then((className) => expect(className).contains(CIRCLE_DEFAULT));
            cy.get($circle[0]).children().closest('[class^=circle_circle__]').should('have.text', 0);
            cy.get($circle[0]).children().closest('[class*=circle_head__]').should('have.text', 'head');
            cy.get($circle[1]).children().closest('[class*=circle_head__]').should('have.text', '');
            cy.get($circle[1]).children().closest('[class^=circle_circle__]').invoke('attr', 'class').then((className) => expect(className).contains(CIRCLE_DEFAULT));
            cy.get($circle[1]).children().closest('[class*=circle_circle__]').should('have.text', 4);
            cy.get($circle[1]).children().closest('[class*=circle_index__]').should('have.text', 1);
        })
    });
});