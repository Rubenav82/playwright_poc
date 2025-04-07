import { expect, Locator, Page } from "@playwright/test";

export class ConfirmationPage {

    private readonly title: Locator
    private readonly titleItemLink: Locator
    private readonly descItemDiv: Locator
    private readonly priceItemDiv: Locator
    private readonly finishButton: Locator

    // Locators
    constructor(page: Page) {
        this.title = page.locator('.title');
        this.titleItemLink = page.locator('.inventory_item_name');
        this.descItemDiv = page.locator('.inventory_item_desc');
        this.priceItemDiv = page.locator('.inventory_item_price');
        this.finishButton = page.getByRole('button', { name: 'Finish' });
    }

    // Actions
    async getTitleItemLink(){
        const title = await this.titleItemLink.innerText();
        return title;
    }

    async getDescItemDiv(){
        const desc = await this.descItemDiv.innerText();
        return desc;
    }

    async getPriceItemDiv(){
        const price = await this.priceItemDiv.innerText();
        return price;
    }

    async clickFinishButton(){
        await this.finishButton.click();
    }
    
    // Asserts
    async checkSuccessfulConfirmationPage(expectedInformation: Array<string>) {
        await expect(this.title).toContainText('Checkout: Overview');
        const actualName = await this.getTitleItemLink();
        await expect(actualName).toEqual(expectedInformation['name']);
        const actualDesc = await this.getDescItemDiv();
        await expect(actualDesc).toEqual(expectedInformation['desc']);
        const actualPrice = await this.getPriceItemDiv();
        await expect(actualPrice).toEqual(expectedInformation['price']);
    }
}