describe('empty spec', () => {

  beforeEach(() => {
    cy.visit('https://s5-da-02-rejcwmmfc-1190624.vercel.app/dashboard')


    cy.contains('Camiões').click({force: true})
    cy.contains('Criar Camião').click({force: true})

    cy.url().should('include', '/adicionarCamiao')
  })

  it('criar camião', () => {
    // Get an input, type into it
    // matricula
    /*
    cy.get('#matricula').type('DD-00-EE', {force: true})
    cy.get('#matricula').should('have.value', 'DD-00-EE')

    // caracteristica

    cy.get('#caracteristica').type('Caracteristica', {force: true})

    cy.get('#caracteristica').should('have.value', 'Caracteristica')

    // autonomia

    cy.get('#autonomia').type('100', {force: true})

    cy.get('#autonomia').should('have.value', '100')

    // capacidadeTransporte

    cy.get('#capacidadeTransporte').type('801', {force: true})

    cy.get('#capacidadeTransporte').should('have.value', '801')


    // capacidadeBateria

    cy.get('#capacidadeBateria').type('60', {force: true})

    cy.get('#capacidadeBateria').should('have.value', '60')


    // tara

    cy.get('#tara').type('1001', {force: true})

    cy.get('#tara').should('have.value', '1001')

    // tempoCarregamento

    cy.get('#tempoCarregamento').type('67', {force: true})

    cy.get('#tempoCarregamento').should('have.value', '67')
*/

cy.get('#matricula').should('be.empty')
// caracteristica
cy.get('#caracteristica').should('be.empty')
// autonomia
cy.get('#autonomia').should('be.empty')
// capacidadeTransporte
cy.get('#capacidadeTransporte').should('be.empty')
// capacidadeBateria
cy.get('#capacidadeBateria').should('be.empty')
// tara
cy.get('#tara').should('be.empty')
// tempoCarregamento
cy.get('#tempoCarregamento').should('be.empty')


    cy.get('.full-width').as('btn').click({force: true})

  })


})