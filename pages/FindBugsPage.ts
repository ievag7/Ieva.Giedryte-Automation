import {expect, Page} from '@playwright/test';

export class FindBugsPage {
    constructor(private page: Page) {}

    readonly acceptCookiesButton = this.page.getByRole('button', {
        name: 'Accept cookies'
    });

    async goto() {
        await this.page.goto('https://academybugs.com/find-bugs/');
        await expect(this.page).toHaveTitle(/Find Bugs/);
    }

    async acceptCookies() {
        if (await this.acceptCookiesButton.isVisible()) {
            await this.acceptCookiesButton.click();
        }
    }
}