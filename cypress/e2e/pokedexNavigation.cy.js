describe("pokedexNavigation", function () {
  beforeEach(function () {
    cy.visit("http://localhost:5000");
  });
  it("can open pokemon page", function () {
    cy.contains("ivysaur").click();
    cy.contains("Hidden ability");
  });
  it("can go back to homepage", function () {
    cy.contains("ivysaur").click();
    cy.contains("Home").click();
    cy.contains("ivysaur");
  });
  it("can go to the next pokemon", function () {
    cy.contains("ivysaur").click();
    cy.contains("Next").click();
    cy.contains("venusaur");
  });
  it("can go to the previous pokemon", function () {
    cy.contains("ivysaur").click();
    cy.contains("Previous").click();
    cy.contains("bulbasaur");
  });
});
