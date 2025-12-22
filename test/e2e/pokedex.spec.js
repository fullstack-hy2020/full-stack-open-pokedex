const { test, describe, expect } = require('@playwright/test')

describe('Pokedex', () => {
  test('front page can be opened', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('ivysaur')).toBeVisible()
    await expect(page.getByText('Pokémon and Pokémon character names are trademarks of Nintendo.')).toBeVisible()
  })

  test('click on pokemon', async ({ page} ) => {
    await page.goto('/')
    const ivysaurLink =  page.getByRole('link', { name: 'ivysaur' })
    await expect(ivysaurLink).toBeVisible()
    await ivysaurLink.click()

    await expect(page).toHaveURL(/\/pokemon\/ivysaur$/)
    await expect(page.getByText('chlorophyll')).toBeVisible()
  })
})