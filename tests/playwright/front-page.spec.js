const { test, describe, expect } = require('@playwright/test')

describe('Pokedex', () => {
  test('front page can be opened', async ({ page }) => {
    await page.goto('')
    await expect(page.getByText('ivysaur')).toBeVisible()
    await expect(
      page.getByText(
        'Pokémon and Pokémon character names are trademarks of Nintendo.'
      )
    ).toBeVisible()
  })

  test('transition from the main page to the ivysaur page and then to the Next page', async ({
    page
  }) => {
    await page.goto('')
    await page.getByRole('link', { name: 'ivysaur' }).click()
    await expect(page.getByText('ivysaur')).toBeVisible()
    await page.getByRole('link', { name: 'Next' }).click()
    await expect(page.getByText('venusaur')).toBeVisible()
  })
})
