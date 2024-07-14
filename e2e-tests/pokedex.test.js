// eslint-disable-next-line no-unused-vars
const { test, describe, expect, beforeEach } = require('@playwright/test')

describe('Pokedex', () => {
  test('front page can be opened', async ({ page }) => {
    await page.goto('')
    await expect(page.getByText('ivysaur')).toBeVisible()
    await expect(page.getByText('Pokémon and Pokémon character names are trademarks of Nintendo.')).toBeVisible()
  }),

  test('can navigate to pokemon page', async ({ page }) => {
    await page.goto('')
    await page.getByRole('link', { name: 'ivysaur' }).click()
    await expect(page.getByText('chlorophyll')).toBeVisible()
  })
})