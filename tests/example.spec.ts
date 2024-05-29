import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.ebay.com/');
});

test('Initial Test Harold', async ({ page }) => {
  await page.locator('input[class=\'gh-tb ui-autocomplete-input\']').fill('sodom')
  await page.keyboard.press('Enter')
  await expect(page.locator('//ul[contains(@class, \'srp-results srp-list clearfix\')]')).toBeVisible()
  const titles = await page.locator('//ul[contains(@class, \'srp-results srp-list clearfix\')]//li//div[2]//a//span').allInnerTexts()
  console.log('The total of number of result is', titles.length)
  for (let title of titles) {
    console.log ('The titles of each item are:', title)
  }
});

test('Test search element by Selectors', async ({ page }) => {
  await page.locator('input[type="text"]').fill('metallica')
});

test('Test search element by Placeholder', async ({ page }) => {
  await page.getByPlaceholder('Buscar artículos').fill('Obituary LP')
  await page.keyboard.press('Enter')
});

test('Test search by Role - recommended by playwright', async ({ page }) => {
  await page.getByRole('link', {name: 'Vehículos', exact: true}).click()
});
