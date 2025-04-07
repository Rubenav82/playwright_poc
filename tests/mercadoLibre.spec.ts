import { test, expect } from '@playwright/test';

test('Comprar Iphone', async ({ page }) => {
  await page.goto(process.env.URL_MERCADOLIBRE);
  await page.locator('#CO').click();
  await page.locator('#cb1-edit').fill('Iphone');
  await page.keyboard.press('Enter');
  await page.locator('//ol[contains(@class, \'ui-search-layout\')]//h3').first().click()
  await page.locator('//div[contains(@class, \'ui-pdp-variations__picker-default-container\')]//a').first().click()
  await page.getByRole('button', { name: 'Comprar ahora' }).click();
  await expect(page.getByRole('heading', { name: '¡Hola! Para comprar, ingresa' })).toBeVisible();
});