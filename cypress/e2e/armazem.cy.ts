describe('empty spec', () => {

  beforeEach(() => {
    cy.visit('https://s5-da-02-spa.vercel.app/dashboard')


    cy.contains('Armazéns').click({ force: true })
    cy.contains('Criar Armazém').click({ force: true })

    cy.url().should('include', '/adicionarArmazem')
  })

  it('criar armazém', () => {


    cy.get('#identificador').should('be.empty')
    cy.get('#designacao').should('be.empty')
    cy.get('#codigoPostal').should('be.empty')
    cy.get('#numeroPorta').should('be.empty')
    cy.get('#nomeRua').should('be.empty')
    cy.get('#Localidade').should('be.empty')
    cy.get('#pais').should('be.empty')
    cy.get('#municipio').should('be.empty')
    cy.get('#latitude').should('be.empty')
    cy.get('#longitude').should('be.empty')
    cy.get('#altitude').should('be.empty')

    cy.get('.full-width').as('btn').click({ force: true })

  })


})