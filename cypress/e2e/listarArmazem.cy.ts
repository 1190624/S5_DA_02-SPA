require('cypress-get-table')

describe('empty spec', () => {

  beforeEach(() => {
    cy.visit('https://s5-da-02-spa.vercel.app/dashboard')


    cy.contains('Armazéns').click({ force: true })
    cy.contains('Listar Armazéns').click({ force: true })

    cy.url().should('include', '/listarArmazem')
  })

  it('listar armazéns', () => {
    /**
        cy.get('table').contains('input', 'identificador').should('be.visible');
        cy.get('table').contains('td', 'designacao').should('be.visible');
        cy.get('table').contains('td', 'codigoPostal').should('be.visible');
        cy.get('table').contains('td', 'numeroPorta').should('be.visible');
        cy.get('table').contains('td', 'nomeRua').should('be.visible');
        cy.get('table').contains('td', 'localidade').should('be.visible');
        cy.get('table').contains('td', 'pais').should('be.visible');
        cy.get('table').contains('td', 'municipio').should('be.visible');
        cy.get('table').contains('td', 'latitude').should('be.visible');
        cy.get('table').contains('td', 'longitude').should('be.visible');
        cy.get('table').contains('td', 'altitude').should('be.visible');
         */
  })


})