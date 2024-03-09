describe('Pokedex', function() {
  it('front page can be opened', function() {
    cy.visit('http://localhost:5000')
    cy.contains('ivysaur')
    cy.contains('Pokémon and Pokémon character names are trademarks of Nintendo.')
  }),
  it('can be navigated to a specific pokemon', function() {
    cy.visit('http://localhost:5000')
    cy.get('div').contains('ivysaur').click()
    cy.contains('chlorophyll')
  })
})