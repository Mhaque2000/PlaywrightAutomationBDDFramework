import { Page, Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('[name="user-name"]');
        this.passwordInput = page.locator('[name="password"]');
        this.loginButton = page.locator('[type="submit"]');
        this.errorMessage = page.locator('h3[data-test="error"]');
    }

    async navigate() {
        await this.page.goto('https://www.saucedemo.com/v1/');
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async loginWithValidCredentials() {
        await this.login('standard_user', 'secret_sauce');
    }

    async loginWithInvalidCredentials() {
        await this.login('invalid_user', 'secret_sauce');
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async getErrorMessage(): Promise<string | null> {
        return await this.errorMessage.textContent();
    }

    isOnLoginPage(): boolean {
        return this.page.url().includes('index.html');
    }
}