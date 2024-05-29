import { test, expect } from '@playwright/test';

test('test harold', async ({ page }) => {
  await page.goto('https://www.ebay.com/')
  await page.locator('input[class=\'gh-tb ui-autocomplete-input\']').fill('sodom')
  await page.keyboard.press('Enter')
  await expect(page.locator('//ul[contains(@class, \'srp-results srp-list clearfix\')]')).toBeVisible()

  const titles = await page.locator('//ul[contains(@class, \'srp-results srp-list clearfix\')]//li//div[2]//a//span').allInnerTexts()
  console.log('The total of number of result is', titles.length)

  for (let title of titles) {
    console.log ('the title of items sodom is: ', title)
  }
});
