describe('app works correctly with routes', function() {
    before(function() {
        cy.visit('/');
    });
  
    it('should open string page', function() {
        cy.visit('/recursion');
    });

    it('should open fibonacci page', function() {
        cy.visit('/fibonacci');
    });

    it('should open list page', function() {
        cy.visit('/list');
    });

    it('should open queue page', function() {
        cy.visit('/queue');
    });

    it('should open sorting page', function() {
        cy.visit('/sorting');
    });

    it('should open stack page', function() {
        cy.visit('/stack');
    });
});