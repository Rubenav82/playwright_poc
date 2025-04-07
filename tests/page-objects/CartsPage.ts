import { expect, Locator, Page } from "@playwright/test";

export class CartsPage {

    private readonly actualName: Locator
    private readonly actualDesc: Locator
    private readonly actualPrice: Locator
    private readonly checkOutButton: Locator
    private readonly title: Locator

    // Locators
    constructor(page: Page) {
        this.actualName = page.locator('.inventory_item_name');
        this.actualDesc = page.locator('.inventory_item_desc');
        this.actualPrice = page.locator('.inventory_item_price');
        this.checkOutButton = page.getByRole('button', { name: 'Checkout' });
        this.title = page.locator('.title');
    }

    // Actions
    async getActualName(){
        const name = await this.actualName.innerText();
        return name;
    }

    async getActualDesc(){
        const desc = await this.actualDesc.innerText();
        return desc;
    }

    async getActualPrice(){
        const price = await this.actualPrice.innerText();
        return price;
    }

    async clickCheckOutButton(){
        await this.checkOutButton.click();
    }
    
    // Asserts
    async checkSuccessfulCartPage(expectedInformation: Array<string>) {
        const actualName = await this.getActualName();
        await expect(actualName).toEqual(expectedInformation['name']);
        const actualDesc = await this.getActualDesc();
        await expect(actualDesc).toEqual(expectedInformation['desc']);
        const actualPrice = await this.getActualPrice();
        await expect(actualPrice).toEqual(expectedInformation['price']);
    }

    async checkSuccessfulCheckOut() {
        await expect(this.title).toContainText('Checkout: Your Information');
    }
}