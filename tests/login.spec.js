import { test, expect } from '@playwright/test';

test.describe('Login Feature', () => {

  test('successful login with valid credentials', async ({ page }) => {
    await page.goto('/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await expect(page).toHaveURL(/inventory.html/);
  });

  test('error shown with invalid password', async ({ page }) => {
    await page.goto('/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'wrong_password');
    await page.click('#login-button');
    await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface');
  });

  test('error shown when username is empty', async ({ page }) => {
    await page.goto('/');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await expect(page.locator('[data-test="error"]')).toContainText('Username is required');
  });
test('Locked-out user cannot login', async ({ page }) => {
    
    await page.goto('/');

  
    await page.fill('#user-name', 'locked_out_user');
    await page.fill('#password', 'secret_sauce');

   
    await page.click('#login-button');


    const error = page.locator('[data-test="error"]');
    await expect(error).toBeVisible();
    await expect(error).toHaveText(
      'Epic sadface: Sorry, this user has been locked out.'
    );
  });
});
