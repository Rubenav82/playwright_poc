import { test, expect } from '@playwright/test';


test('Trabajar con tablas', async ({ page }) => {
    await page.goto(process.env.URL_TABLAS);

    const tableContainer = await page.locator("xpath=//table[@id='countries']");
    const rows = await tableContainer.locator("xpath=.//tr").all();

    // Creamos una lista de países a partir de la interface de abajo, y la inicializamos vacía
    const countries: Country[] = [];

    console.log(rows.length);

    for(let row of rows){
        // Por cada fila creamos una variable Country con la interface y la información de ese país
        let country: Country = {
            name: await row.locator('xpath=.//td[2]').innerText(),
            capital: await row.locator('xpath=.//td[3]').innerText(),
            currency: await row.locator('xpath=.//td[4]').innerText(),
            primaryLanguage: await row.locator('xpath=.//td[5]').innerText()
        }
        // Lo insertamos en el array de countries que hemos creado
        countries.push(country);
    }

    // // Recorremos el array de countries creado e imprimimos su información
    // for(let country of countries){
    //     console.log(country);
    // }

    const countryWherePeopleSpeakSpanish = countries.filter(country => country.primaryLanguage.includes('Spanish'));
    console.log('Países en los que el idioma principal es Español: ', countryWherePeopleSpeakSpanish);

    // await page.pause();
});

interface Country {
    name: string
    capital: string
    currency: string
    primaryLanguage: string
}

/*

element container: //table[@id='countries']
.//tr -> filas
.//td -> columnas

//table[@id='countries']//tr[2]//td[1] -> Check
//table[@id='countries']//tr[2]//td[2] -> Country
//table[@id='countries']//tr[2]//td[3] -> Capital
//table[@id='countries']//tr[2]//td[4] -> Currency
//table[@id='countries']//tr[2]//td[5] -> Primary Language

*/