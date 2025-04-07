import { expect, Locator, Page } from "@playwright/test";

export class ThanksPage {

    private readonly thanksHeading: Locator

    // Locators
    constructor(page: Page) {
        this.thanksHeading = page.getByRole('heading', { name: 'Thank you for your order!' });
    }

    // Actions
    
    // Asserts
    async checkSuccessfulOrder() {
        await expect(this.thanksHeading).toBeVisible();
    }
}