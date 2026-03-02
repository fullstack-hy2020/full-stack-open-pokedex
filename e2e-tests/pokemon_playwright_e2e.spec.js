import { test, describe, expect } from '@playwright/test'

describe('Pokedex', () => {
  test('front page can be opened', async ({ page }) => {
    await page.goto('')
    await expect(page.getByText('ivysaur')).toBeVisible()
    await expect(page.getByText('Pokémon and Pokémon character names are trademarks of Nintendo.')).toBeVisible()
  }),
  test('clicking on pokemon(butterfree) works', async ({ page }) => {
    await page.goto('')
    await page.getByText('butterfree').click()
    await expect(page.getByText('tinted lens')).toBeVisible()
    await expect(page.getByText('compound eyes')).toBeVisible()
  })
})
