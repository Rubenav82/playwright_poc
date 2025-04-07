import { expect, Locator, Page } from "@playwright/test";

export class ItemsPage {

    private readonly inventoryItems: Locator
    private readonly shoppingCartLink: Locator
    private readonly checkOutButton: Locator

    // Locators
    constructor(page: Page) {
        this.inventoryItems = page.locator('#inventory_container .inventory_item');
        this.shoppingCartLink = page.locator('.shopping_cart_link');
        this.checkOutButton = page.getByRole('button', { name: 'Checkout' });
    }

    // Actions
    async getTextRandomItemName(randomIndex: number){
        const name = await this.inventoryItems.nth(randomIndex).locator('.inventory_item_name').innerText();
        return name;
    }

    async getTextRandomItemDesc(randomIndex: number){
        const desc = await this.inventoryItems.nth(randomIndex).locator('.inventory_item_desc').innerText();
        return desc;
    }

    async getTextRandomItemPrice(randomIndex: number){
        const price = await this.inventoryItems.nth(randomIndex).locator('.inventory_item_price').innerText();
        return price;
    }

    async clickAddButtonRandomItem(randomIndex: number){
        await this.inventoryItems.nth(randomIndex).locator('//button[contains(@class, \'btn_inventory\')]').click();
    }
    
    async clickShoppingCartLink(){
       await this.shoppingCartLink.click() ;
    }

    async getInformationGoToShoppingCart(randomIndex: number){
        let information = [];
        information['name'] = await this.getTextRandomItemName(randomIndex);
        information['desc'] = await this.getTextRandomItemDesc(randomIndex);
        information['price'] = await this.getTextRandomItemPrice(randomIndex);
        await this.clickAddButtonRandomItem(randomIndex);
        await this.clickShoppingCartLink();
        return information;
    }

    // Asserts
    async checkSuccessfulAdToCart() {
        expect(this.checkOutButton).toBeVisible();
    }
}