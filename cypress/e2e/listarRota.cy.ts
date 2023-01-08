describe('Pagination', () => {

  beforeEach(() => {
    //cy.visit('https://s5-da-02-rejcwmmfc-1190624.vercel.app/dashboard')
    cy.visit('https://s5-da-02-spa.vercel.app/listarRota')

    cy.contains('Rotas').click({force: true})
    cy.contains('Listar Rotas').click({force: true})

    cy.url().should('include', '/listarRota')
  })
  
/*
  it('apresenta elementos por pagina', () => {
    cy.get('tamanhoLista').then(($tamanhoLista) => {
      const tamanhoLista = $tamanhoLista.text();

      cy.get('.item').then(($items) => {
        expect($items.length).to.equal(tamanhoLista);
      })

    })
  })
*/

 // it('passar a pagina seguinte', () => {
 // })

/*
  it('voltar a pagina anterior', () => {
    
  })
*/

})
