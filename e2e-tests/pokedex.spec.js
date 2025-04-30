const { test, expect } = require('@playwright/test')

test('front page can be opened', async ({ page }) => {
  await page.goto('http://localhost:5000')
  await expect(page.getByText('ivysaur')).toBeVisible()
  await expect(page.getByText('Pokémon and Pokémon character names are trademarks of Nintendo.')).toBeVisible()
})

test('can navigate to a specific Pokémon page', async ({ page }) => {
  await page.goto('http://localhost:5000')

  // Click on the link to ivysaur
  await page.click('text=ivysaur')

  // Expect a specific ability to be shown
  await expect(page.getByText('chlorophyll')).toBeVisible()
})
