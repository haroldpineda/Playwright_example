import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.ebay.com/'); 
  await page.getByPlaceholder('Buscar artículos').fill('dark funeral vinyl');
  await page.keyboard.press('Enter')
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Dark Funeral - Where shadows forever reign, Vinyl, 1st Press, 2016, New, sealed Se abre en una ventana nueva', exact: true }).click();
  const page1 = await page1Promise;
  await page1.getByRole('link', { name: '¡Cómpralo ahora!' }).click();
  await page1.getByRole('link', { name: 'Completar la compra como' }).click();
});