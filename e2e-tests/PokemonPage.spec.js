const { test, describe, expect } = require('@playwright/test');

describe('Pokedex', () => {
  test('front page can be opened', async ({ page }) => {
    await page.goto('http://localhost:8080');
    await expect(page.getByText('ivysaur')).toBeVisible();
    await expect(
      page.getByText(
        'Pokémon and Pokémon character names are trademarks of Nintendo.',
      ),
    ).toBeVisible();
  });

  test('Can navigate to Pokemon page', async ({ page }) => {
    await page.goto('http://localhost:8080');
    await page.getByRole('link', { name: 'ivysaur' }).click();
    await expect(page.getByText('ivysaur')).toBeVisible();
  });
});
