import { expect, Locator, Page } from "@playwright/test";

// Separamos en una clase la localización e interacción de los elementos, para que puedan ser reutilizados en distintos test sin duplicar código.

export class LoginPage {

    private readonly usernameTextbox: Locator
    private readonly passwordTextbox: Locator
    private readonly loginButton: Locator
    private readonly shoppingCartIcon: Locator

    // Locators
    constructor(page: Page) {
        this.usernameTextbox = page.getByRole('textbox', { name: 'Username' });
        this.passwordTextbox = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.shoppingCartIcon = page.locator('.shopping_cart_link');
    }

    // Actions
    async fillUsername(username: string) {
        await this.usernameTextbox.fill(username);
    }

    async fillPassword(password: string) {
        await this.passwordTextbox.fill(password);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async loginWithCredentials(username: string, password: string) {
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.clickLoginButton();
    }

    // Asserts
    async checkSuccessfulLogin() {
        expect(this.shoppingCartIcon).toBeVisible();
    }

}