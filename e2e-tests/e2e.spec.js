const { test, describe, expect } = require('@playwright/test')

describe('Pokedex', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('front page can be opened', async ({ page }) => {
    await expect(page.getByText('ivysaur')).toBeVisible()
    await expect(page.getByText('Pokémon and Pokémon character names are trademarks of Nintendo.')).toBeVisible()
  })

  test('can navigate to individual pokemon page', async ({ page }) => {
    await page.getByText('ivysaur').click()
    await expect(page.getByText('ivysaur', { exact: true })).toBeVisible()
    await expect(page.getByTestId('stats')).toBeVisible()
  })

  test('navigation between pokemons works', async ({ page }) => {
    await page.getByText('ivysaur').click()
    await page.getByText('Next').click()
    await expect(page.getByText('venusaur', { exact: true })).toBeVisible()
    await page.getByText('Previous').click()
    await expect(page.getByText('ivysaur', { exact: true })).toBeVisible()
    await page.getByText('Home').click()
    await expect(page.getByText('ivysaur')).toBeVisible()
  })

  test('pokemon details are displayed correctly', async ({ page }) => {
    await page.getByText('ivysaur').click()
    await expect(page.locator('.pokemon-image')).toBeVisible()
    const statsTable = page.getByTestId('stats')
    await expect(statsTable).toBeVisible()
    await expect(page.locator('td.pokemon-stats-name', { hasText: 'hp' })).toBeVisible()
    await expect(page.locator('td.pokemon-stats-name', { hasText: 'special attack' })).toBeVisible()
    await expect(page.locator('td.pokemon-stats-name', { hasText: 'special defense' })).toBeVisible()
    await expect(page.locator('.pokemon-abilities')).toBeVisible()
  })

  test('pokemon loading state and data fetching works', async ({ page }) => {
    await page.route('**/api.co/api/v2/pokemon/**', async (route) => {
      await new Promise(resolve => setTimeout(resolve, 1000)) // Add 1s delay
      await route.continue()
    })
    await page.getByText('ivysaur').click()
    await expect(page.locator('.pokemon-info')).toBeVisible()
  })

  test('pokemon type affects the page styling', async ({ page }) => {
    await page.getByText('ivysaur').click()
    await expect(page.locator('.pokemon-page')).toBeVisible()
    const pokemonPage = page.locator('.pokemon-page')
    const typeClass = await pokemonPage.getAttribute('class')
    expect(typeClass).toMatch(/pokemon-type-\w+/)
  })
})