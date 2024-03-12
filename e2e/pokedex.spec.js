const { test, expect } = require('@playwright/test');

test('front page can be opened', async ({ page }) => {
  await page.goto('http://localhost:8080');

  await expect(page.getByText('ivysaur')).toBeVisible();
  await expect(
    page.getByText(
      'Pokémon and Pokémon character names are trademarks of Nintendo.'
    )
  ).toBeVisible();
});
