const { test, expect } = require('@playwright/test')

test.describe('Pokedex', () => {
  test('front page can be opened', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('ivysaur')).toBeVisible()
    await expect(
      page.getByText('Pokémon and Pokémon character names are trademarks of Nintendo.')
    ).toBeVisible()
  })

  test('pokemon page can be navigated to', async ({ page }) => {
    await page.goto('/')
    await page.getByText('ivysaur').click()
    await expect(page.getByTestId('stats')).toBeVisible()
  })

  test('navigation between pokemon pages works', async ({ page }) => {
    await page.goto('/pokemon/ivysaur')
    await page.getByText('Next').click()
    await expect(page.getByTestId('stats')).toBeVisible()
    await expect(page).toHaveURL(/\/pokemon\/venusaur$/)
  })

  test('ivysaur page shows ability chlorophyll', async ({ page }) => {
    await page.goto('/')
    await page.getByText('ivysaur').click()
    await expect(page.getByText('chlorophyll')).toBeVisible()
  })
})
