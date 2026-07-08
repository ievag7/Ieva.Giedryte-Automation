import { expect, Page } from '@playwright/test';

export class CartPage {

    constructor(private page: Page) {}

    async verifyProduct(name: string, price: string) {

        await expect(this.page).toHaveURL(/my-cart/);

        await expect(
            this.page.getByRole('link', { name }).first()
        ).toBeVisible();

        const cartPrice = await this.page
            .locator('.ec_cartitem_price')
            .innerText();

        const normalize = (price: string) =>
            price.replace(/[^0-9.]/g, '').trim();

        expect(normalize(cartPrice))
            .toBe(normalize(price));
    }
}