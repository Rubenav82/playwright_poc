import { expect, Locator, Page } from "@playwright/test";

export class InformationPage {

    private readonly firstNameTextbox: Locator
    private readonly lastNameTextbox: Locator
    private readonly postalCodeTextbox: Locator
    private readonly continueButton: Locator
    private readonly title: Locator

    // Locators
    constructor(page: Page) {
        this.firstNameTextbox = page.getByRole('textbox', { name: 'First Name' });
        this.lastNameTextbox = page.getByRole('textbox', { name: 'Last Name' })
        this.postalCodeTextbox = page.getByRole('textbox', { name: 'Zip/Postal Code' });
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.title = page.locator('.title');
    }

    // Actions
    async fillFirstName(firstName: string){
        await this.firstNameTextbox.fill(firstName);
    }

    async fillLastName(lastName: string){
        await this.lastNameTextbox.fill(lastName);
    }

    async fillPostalCode(postalCode: string){
        await this.postalCodeTextbox.fill(postalCode);
    }

    async clickContinueButton () {
        await this.continueButton.click();
    }

    async fillInformationContinue(firstName: string, lastName: string, postalCode: string) {
        await this.fillFirstName(firstName);
        await this.fillLastName(lastName);
        await this.fillPostalCode(postalCode);
        await this.clickContinueButton();
    }
    
    // Asserts
    async checkSuccessfulInformationContinue() {
        await expect(this.title).toContainText('Checkout: Overview');
    }
}