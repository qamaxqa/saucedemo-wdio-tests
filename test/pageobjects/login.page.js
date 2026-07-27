import { $, browser } from '@wdio/globals';

class LoginPage {
    get usernameInput() { return $('[data-test="username"]'); }
    get passwordInput() { return $('[data-test="password"]'); }
    get loginButton() { return $('[data-test="login-button"]'); }
    get errorMessage() { return $('[data-test="error"]'); }

    async open() {
        await browser.url('/');
        await this.usernameInput.waitForDisplayed();
    }

    async login(username, password) {
        await this.usernameInput.setValue(username);
        await this.passwordInput.setValue(password);
        await this.loginButton.waitForClickable();
        await this.loginButton.click();
    }

    async getErrorMessage() {
        await this.errorMessage.waitForDisplayed();
        return this.errorMessage.getText();
    }
}

export default new LoginPage();
