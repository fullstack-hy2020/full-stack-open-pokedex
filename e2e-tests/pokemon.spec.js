const { test, describe, expect } = require("@playwright/test");

describe("Pokedex", () => {
  test("front page can be opened", async ({ page }) => {
    await page.goto("http://localhost:5000/");
    await expect(page.getByText("ivysaur")).toBeVisible();
    await expect(
      page.getByText(
        "Pokémon and Pokémon character names are trademarks of Nintendo."
      )
    ).toBeVisible();
  });
  test("Pokemon image can be clicked and navigated to", async ({ page }) => {
    await page.goto("http://localhost:5000/");
    await expect(page.getByText("ivysaur")).toBeVisible();
    await expect(
      page.getByText(
        "Pokémon and Pokémon character names are trademarks of Nintendo."
      )
    ).toBeVisible();
    await page.getByText("ivysaur").click();
    await expect(page.getByText("chlorophyll")).toBeVisible();
    expect(page.url()).toBe("http://localhost:5000/pokemon/ivysaur");
  });
});
