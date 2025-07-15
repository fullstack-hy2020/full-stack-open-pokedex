import { test, expect } from '@playwright/test'

test.describe('Pokedex', () => {
  test('front page can be opened', async ({ page }) => {
    await page.goto('http://localhost:5000') // ensure prod server runs here
    await expect(page.getByText('ivysaur')).toBeVisible()
    await expect(page.getByText('Pokémon and Pokémon character names are trademarks of Nintendo.')).toBeVisible()
  })

  test('can navigate to ivysaur page', async ({ page }) => {
    await page.goto('http://localhost:5000')
    await page.click('text=ivysaur')
    await expect(page.getByText('chlorophyll')).toBeVisible()
  })
})
