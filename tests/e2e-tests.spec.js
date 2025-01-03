const { test, describe, expect } = require("@playwright/test");

describe("Pokedex", () => {
  test("front page can be opened", async ({ page }) => {
    await page.goto(""); // Provide the correct URL
    await expect(page.getByText("ivysaur")).toBeVisible();
    await expect(
      page.getByText(
        "Pokémon and Pokémon character names are trademarks of Nintendo."
      )
    ).toBeVisible();
  });

  test("navigate to pokedex detail", async ({ page }) => {
    await page.goto(""); // Replace with your actual URL

    await page.click("text=Ivysaur");

    await expect(page.getByText("chlorophyll")).toBeVisible(); //confirm if it navigates and find the text
  });

  test("version route works fine", async ({ page }) => {
    await page.goto("version");

    await expect(page.getByText("7")).toBeVisible();
  });

  test("check the health is ok", async ({ page }) => {
    await page.goto("health");

    await expect(page.getByText("ok")).toBeVisible();
  });
});
