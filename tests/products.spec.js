import { test, expect } from '@playwright/test';

test.describe('Inventory feature', () => {

 
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test('Inventory page shows 6 products', async ({ page }) => {
    const items = await page.locator('.inventory_item');
    await expect(items).toHaveCount(6);
  });

  test('Product has name, price, and add-to-cart button', async ({ page }) => {
    const firstItem = page.locator('.inventory_item').first();

    
    await expect(firstItem.locator('.inventory_item_name')).toBeVisible();
    
    await expect(firstItem.locator('.inventory_item_price')).toBeVisible();
    
    await expect(firstItem.locator('button')).toHaveText(/Add to cart/);
  });

  test('Sort products by Price: Low to High', async ({ page }) => {
    await page.goto('/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await expect(page).toHaveURL(/.*inventory.html/);
    await page.selectOption('[data-test="product-sort-container"]', 'Price (low to high)');

    // Get all product prices as text
    const prices = await page.locator('.inventory_item_price').allTextContents();

    // Convert ["$7.99", "$9.99", ...] → [7.99, 9.99, ...]
    const numericPrices = prices.map(price => parseFloat(price.replace('$', '')));

    // Check if sorted ascending
    const sorted = [...numericPrices].sort((a, b) => a - b);
    expect(numericPrices).toEqual(sorted);
  });
});