import { test, expect } from '@playwright/test';

async function login(page) {
  await page.goto('https://saucedemo.com/');
  await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
  await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
}

test.beforeEach(async ({ page }) => {
  await login(page);
});

test('Harold buy element in page', async ({ page }) => {
  const itemsContainer = page.locator('#inventory_container .inventory_item');
  const itemsCount = await itemsContainer.count();

  if (itemsCount === 0) {
    throw new Error('No items found in the inventory');
  }

  const randomIndex = Math.floor(Math.random() * itemsCount);
  const randomItem = itemsContainer.nth(randomIndex);

  const itemName = await randomItem.locator('.inventory_item_name').innerText();
  const itemDescription = await randomItem.locator('.inventory_item_desc').innerText();
  const itemPrice = await randomItem.locator('.inventory_item_price').innerText();

  console.log(`Name: ${itemName}`);
  console.log(`Description: ${itemDescription}`);
  console.log(`Price: ${itemPrice}`);

  // Add the item to the cart and navigate to the shopping cart
  await randomItem.getByRole('button', { name: 'Add to cart' }).click();
  await page.locator('a.shopping_cart_link').click();

  // Verify that the "Checkout" button is visible.
  await expect(page.getByRole('button', { name: 'Checkout' })).toBeVisible();

  const checkoutName = await page.locator('.inventory_item_name').innerText();
  const checkoutDescription = await page.locator('.inventory_item_desc').innerText();
  const checkoutPrice = await page.locator('.inventory_item_price').innerText();

  // Verify that the item details in the cart match the initial item.
  await expect(checkoutName).toEqual(itemName);
  await expect(checkoutDescription).toEqual(itemDescription);
  await expect(checkoutPrice).toEqual(itemPrice);
});
