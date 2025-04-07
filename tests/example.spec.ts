import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('testMercadoLibre', async ({ page }) => {
  //Ir a la página de mercadolibre
  await page.goto('https://www.mercadolibre.com.co/');

  //Localizar el elemento del buscador e introducir la palabra Iphone
  await page.locator('input[id=\'cb1-edit\']').fill('Iphone');

  //Pulsar enter
  await page.keyboard.press('Enter');

  //Le decimos que espere a que esté visible la lista de items de la búsqueda.
  await expect(page.locator('//ol[contains(@class, \'ui-search-layout\')]')).toBeVisible();

  //Si quisiera pausar la prueba para comprobar que ha hecho las acciones sin que llegue a cerrarla
  // await page.pause();

  //Localizar los títulos de los items devueltos, una lista, y almacenarlos en variable
  const titleArray = await page.locator('//ol[contains(@class, \'ui-search-layout\')]//li//h3').allInnerTexts();

  //Iteramos el array y los mostramos por pantalla
  console.log('El número total de resultados es de ', titleArray.length, ' ítems.');
  titleArray.forEach((item) => {
    console.log('El título es:', item);
  })
});
