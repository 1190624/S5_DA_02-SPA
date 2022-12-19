describe('empty spec', () => {

  beforeEach(() => {
    cy.visit('https://s5-da-02-rejcwmmfc-1190624.vercel.app/dashboard')


    cy.contains('Entregas').click({force: true})
    cy.contains('Criar Entrega').click({force: true})

    cy.url().should('include', '/adicionarEntrega')
  })

  it('criar entrega', () => {
    
//identificador
cy.get('#identificador').should('be.empty')
// IDarmazem
cy.get('#armazemID').should('be.empty')
// dia
cy.get('#dia').should('be.empty')
// mes
cy.get('#mes').should('be.empty')
// ano
cy.get('#ano').should('be.empty')
// tara
cy.get('#massa').should('be.empty')
// tempoColocacao
cy.get('#tempoColocacao').should('be.empty')
// tempoRetirada
cy.get('#tempoRetirada').should('be.empty')

    cy.get('.full-width').as('btn').click({force: true})

  })


})