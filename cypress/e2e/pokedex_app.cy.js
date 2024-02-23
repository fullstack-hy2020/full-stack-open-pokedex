describe('Pokedex', function () {
  it('front page can be opened', function () {
    cy.visit('http://localhost:5000')
    cy.contains('ivysaur')
    cy.contains('Pokémon and Pokémon character names are trademarks of Nintendo.')
  })
})

describe('Pokemon Navigation', () => {
  it('navigates to a specific Pokemon page and checks content', () => {
    // Visit the main page
    cy.visit('http://localhost:5000')

    // Click on the link for Ivysaur
    cy.contains('ivysaur').click()

    // Check that the Ivysaur page has loaded and contains the word 'chlorophyll'
    cy.url().should('include', '/pokemon/ivysaur')
    cy.contains('chlorophyll').should('exist')
  })
})
