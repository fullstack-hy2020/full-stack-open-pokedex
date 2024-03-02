describe('Pokedex', function() {
  beforeEach(function() {
    cy.visit('http://localhost:5000/')
  })

  it('front page can be opened', function() {
    cy.contains('ivysaur')
    cy.contains('Pokémon and Pokémon character names are trademarks of Nintendo.')
  })

  it('can interact with front page', () => {
    cy.contains('ivysaur').click()
    cy.get('*[class^="pokemon-page"]')
    cy.get('*[class^="pokemon-abilities"]')
  })

  it('can go interact with buttons', () => {
    cy.contains('ivysaur').click()
    cy.contains('Next').click()
    cy.contains('Previous').click()
    cy.contains('Home').click()
    cy.contains('Pokémon and Pokémon character names are trademarks of Nintendo.')
  })
})