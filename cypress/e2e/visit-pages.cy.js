describe('app works correctly with routes', function() {
    before(function() {
        cy.visit('http://localhost:3000');
    });
  
    it('should open string page', function() {
        cy.visit('http://localhost:3000/recursion');
    });

    it('should open fibonacci page', function() {
        cy.visit('http://localhost:3000/fibonacci');
    });

    it('should open list page', function() {
        cy.visit('http://localhost:3000/list');
    });

    it('should open queue page', function() {
        cy.visit('http://localhost:3000/queue');
    });

    it('should open sorting page', function() {
        cy.visit('http://localhost:3000/sorting');
    });

    it('should open stack page', function() {
        cy.visit('http://localhost:3000/stack');
    });
});