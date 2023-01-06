describe('rota spec', () => {

  beforeEach(() => {
    cy.visit('https://s5-da-02-rejcwmmfc-1190624.vercel.app/dashboard')


    cy.contains('Rotas').click({force: true})
    cy.contains('Criar Rota').click({force: true})

    cy.url().should('include', '/criarRota')
  })

  it('criar Rota', () => {
cy.get('#identificador').should('be.empty')
// caracteristica
cy.get('#origem').should('be.empty')
// autonomia
cy.get('#destino').should('be.empty')
// capacidadeTransporte
cy.get('#distancia').should('be.empty')
// capacidadeBateria
cy.get('#tempo').should('be.empty')
// tara
cy.get('#gastoEnergetico').should('be.empty')
// tempoCarregamento
cy.get('#tempoCargaExtra').should('be.empty')

//TODO Criar testes para funcionalidades 

    cy.get('.full-width').as('btn').click({force: true})

  })


})