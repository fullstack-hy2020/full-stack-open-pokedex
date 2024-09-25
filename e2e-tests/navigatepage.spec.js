import { test, describe, expect } from '@playwright/test'

describe('Pokedex', () => {
  test('front page can be opened', async ({ page }) => {
    await page.goto('')
    await page.goto('/pokemon/ivysaur')
    await expect(page.getByText('chlorophyll')).toBeVisible()
  })
})