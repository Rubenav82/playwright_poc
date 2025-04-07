import { test, expect } from '@playwright/test';
import { LoginPage } from './page-objects/LoginPage';
import { ItemsPage } from './page-objects/ItemsPage';
import { CartsPage } from './page-objects/CartsPage';
import { InformationPage } from './page-objects/InformationPage';
import { ConfirmationPage } from './page-objects/ConfirmationPage';
import { ThanksPage } from './page-objects/ThanksPage';

test('Flujo de Compra', async ({ page }, testInfo) => {
    await page.goto(process.env.URL_SAUCEDEMO);
    // // Realizar captura y guardar en directorio. No se adjunta al reporte html.
    // await page.screenshot({ path: 'screenshots/loginPage.png', fullPage: true })

    // // Para adjuntar cada imagen al reporte habría que añadir un segundo parámetro al test, por ejemplo ({page}, testInfo), e incorporar esta función en cada captura de pantalla que se quiera realizar. NO admite fullPage:
    // await testInfo.attach('login',{
    //     body: await page.screenshot(),
    //     contentType: 'image/png'
    // });

    // Creamos un objeto de la clase LoginPage y llamamos al método para hacer login pasando las credenciales como parámetro.
    const loginPage = new LoginPage(page);
    await loginPage.loginWithCredentials('standard_user', 'secret_sauce');
    await loginPage.checkSuccessfulLogin();
    // await page.screenshot({ path: 'screenshots/itemsPage.png', fullPage: true });
    // await testInfo.attach('itemsPage',{
    //     body: await page.screenshot(),
    //     contentType: 'image/png'
    // });

    const itemsPage = new ItemsPage(page);
    // Generar un número aleatorio entre 0 y las posiciones del array.
    const randomIndex = Math.floor(Math.random() * 6);
    const expectedInformation = await itemsPage.getInformationGoToShoppingCart(randomIndex);
    await itemsPage.checkSuccessfulAdToCart();
    // await page.screenshot({ path: 'screenshots/cartsPage.png', fullPage: true });
    // await testInfo.attach('cartsPage',{
    //     body: await page.screenshot(),
    //     contentType: 'image/png'
    // });

    const cartsPage = new CartsPage(page);
    await cartsPage.checkSuccessfulCartPage(expectedInformation);
    await cartsPage.clickCheckOutButton();
    await cartsPage.checkSuccessfulCheckOut();
    // await page.screenshot({ path: 'screenshots/informationPage.png', fullPage: true });
    // await testInfo.attach('infPage',{
    //     body: await page.screenshot(),
    //     contentType: 'image/png'
    // });

    const informationPage = new InformationPage(page);
    await informationPage.fillInformationContinue('Rubén', 'Asenjo Vega', '47005');
    await informationPage.checkSuccessfulInformationContinue();
    // await page.screenshot({ path: 'screenshots/confirmationPage.png', fullPage: true });
    // await testInfo.attach('confPage',{
    //     body: await page.screenshot(),
    //     contentType: 'image/png'
    // });

    const confirmationPage = new ConfirmationPage(page);
    await confirmationPage.checkSuccessfulConfirmationPage(expectedInformation);
    await confirmationPage.clickFinishButton();
    // await page.screenshot({ path: 'screenshots/thanksPage.png', fullPage: true });
    // await testInfo.attach('thanksPage',{
    //     body: await page.screenshot(),
    //     contentType: 'image/png'
    // });

    const thanksPage = new ThanksPage(page);
    thanksPage.checkSuccessfulOrder();
});