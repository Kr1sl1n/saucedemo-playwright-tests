import { test, expect } from '@playwright/test';

test.describe('Cart Feature', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
  });

  test('add item to cart', async ({ page }) => {
    await page.click('text=Add to cart');
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    await page.click('.shopping_cart_link');
    await expect(page.locator('.cart_item')).toHaveCount(1);
  });

  test('remove item from cart', async ({ page }) => {
    await page.click('text=Add to cart');
    await page.click('text=Remove');
    await page.click('.shopping_cart_link');
    await expect(page.locator('.cart_item')).toHaveCount(0);
  });

});
