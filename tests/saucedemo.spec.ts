import { test, expect } from '@playwright/test';

test('Flujo de Compra', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.getByRole('textbox', {name: 'Username'}).fill('standard_user');
    await page.getByRole('textbox', {name: 'Password'}).fill('secret_sauce');
    await page.getByRole('button', {name: 'Login'}).click();

    // Almacenar en un array  los items de la página
    const itemsContainer = await page.locator('#inventory_container .inventory_item').all();
    // Generar un número aleatorio entre 0 y las posiciones del array.
    const randomIndex = Math.floor(Math.random() * itemsContainer.length);
    // Almacenar en una variable un item random
    const randomItem = itemsContainer[randomIndex];
    // Almacenar la descripción, nombre y precio esperados del item random generado.
    const expectedDescription = await randomItem.locator('.inventory_item_desc').innerText();
    const expectedName = await randomItem.locator('.inventory_item_name').innerText();
    const expectedPrice = await randomItem.locator('.inventory_item_price').innerText();

    console.log(`Precio: ${expectedPrice}. Nombre: ${expectedName}. Descripción: ${expectedDescription}`);

    // Añadimos a la cesta de la compra ese item random
    await randomItem.getByRole('button', {name: 'Add to cart'}).click();

    // Vamos a la cesta
    await page.locator('.shopping_cart_link').click();

    //Aserción que se espera
    expect(page.getByRole('button', {name: 'Checkout'}).isVisible());

    // Recuperamos los valores del item de la cesta
    const actualName = await page.locator('.inventory_item_name').innerText();
    const actualDescription = await page.locator('.inventory_item_desc').innerText();
    const actualPrice = await page.locator('.inventory_item_price').innerText();

    //Validaciones
    expect(actualName).toEqual(expectedName);
    expect(actualDescription).toEqual(expectedDescription);
    expect(actualPrice).toEqual(expectedPrice);

    //Confirmamos la compra
    await page.getByRole('button', {name: 'Checkout'}).click();

    //Introducimos información para el envío
    await page.getByRole('textbox', {name: 'First Name'}).fill('Rubén');
    await page.getByRole('textbox', {name: 'Last Name'}).fill('Asenjo Vega');
    await page.getByRole('textbox', {name: 'Zip/Postal Code'}).fill('47005');

    // Botón continuar
    await page.getByRole('button', {name: 'Continue'}).click();

    //Finalizar compra
    await page.getByRole('button', {name: 'Finish'}).click();

    // Validar que aparece el texto esperado en la última pantalla
    expect(page.getByRole('heading', {name: 'Than  you for your order!'}).isVisible());

    // await page.pause();
});