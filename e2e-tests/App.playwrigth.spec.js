// eslint-disable-next-line no-unused-vars, no-undef
const { test, describe, expect, beforeEach } = require('@playwright/test')

describe('Pokedex', () => {
  test('front page can be opened', async ({ page }) => {
    await page.goto('')
    await expect(page.getByText('ivysaur')).toBeVisible()
    await expect(page.getByText('Pokémon and Pokémon character names are trademarks of Nintendo.')).toBeVisible()
  })

  test('pokemon page can be navigated to', async ({ page }) => {
    await page.goto('')
    const ivysaurLink = await page.locator('a', { hasText: 'ivysaur' })
    await ivysaurLink.click()
    await expect(page.getByText('chlorophyll')).toBeVisible()
  })
})