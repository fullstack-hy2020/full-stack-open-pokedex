const { test, describe, expect, beforeEach } = require('@playwright/test')

describe('Pokedex', () => {
  beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('front page can be opened', async ({ page }) => {
    await expect(page.getByText('ivysaur')).toBeVisible()
    await expect(page.getByText('Pokémon and Pokémon character names are trademarks of Nintendo.')).toBeVisible()
  })

  test('pokemon page has proper information', async ({ page }) => {
    await page.getByRole('link', { name: 'bulbasaur' }).click()
    await page.getByText('bulbasaur').waitFor()
    await expect(page.getByText('bulbasaur')).toBeVisible()
    await expect(page.getByText('Overgrow')).toBeVisible()
    await expect(page.getByText('chlorophyll')).toBeVisible()
  })
})