const {
  test,
  describe,
  expect,
  // beforeEach
} = require('@playwright/test')

describe('Pokedex', () => {
  test('front page can be opened', async ({ page }) => {
    await page.goto('')
    await expect(page.getByText('ivysaur')).toBeVisible()
    await expect(page.getByText('Pokémon and Pokémon character names are trademarks of Nintendo.')).toBeVisible()
  })

  test('content is visible on navigation', async ({ page }) => {
    await page.goto('/pokemon/venusaur')
    await expect(page.getByText('venusaur')).toBeVisible()
  })
})