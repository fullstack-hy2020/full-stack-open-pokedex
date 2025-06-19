// @ts-check
const { test, describe, expect } = require("@playwright/test");

describe("Pokedex", () => {
  test("front page can be opened", async ({ page }) => {
    await page.goto("http://localhost:8080/");
    await expect(page.getByText("ivysaur")).toBeVisible();
    await expect(
      page.getByText(
        "Pokémon and Pokémon character names are trademarks of Nintendo."
      )
    ).toBeVisible();
  });

  test("navigates to a specific Pokemon page", async ({ page }) => {
    await page.goto("http://localhost:8080/");
    await page.click("text=ivysaur");
    await expect(page.getByText("chlorophyll")).toBeVisible();
  });
});
