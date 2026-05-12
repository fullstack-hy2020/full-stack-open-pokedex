const { test, describe, expect } = require('@playwright/test')

describe('Pokedex', () => {
  test('front page can be opened', async ({ page }) => {
    await page.goto('/')

    await expect(page.locator('body')).toContainText('ivysaur', {
      timeout: 30000,
    })

    await expect(
      page.getByText(
        'Pokémon and Pokémon character names are trademarks of Nintendo.'
      )
    ).toBeVisible()
  })

  test('pokemon page can be opened', async ({ page }) => {
    await page.goto('/')

    await expect(page.locator('body')).toContainText('ivysaur', {
      timeout: 30000,
    })

    await page.getByText('ivysaur').click()

    await expect(page.locator('body')).toContainText('chlorophyll')
  })
})