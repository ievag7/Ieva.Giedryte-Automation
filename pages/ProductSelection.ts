import { Locator, Page } from '@playwright/test';

export class ProductSelection {
    constructor(private page: Page) {}

    readonly products = this.page
        .locator('.ec_product_li')
        .filter({ has: this.page.locator('.ec_price_type1') });

    readonly viewCartButton = this.page.getByRole('link', {
        name: 'View Cart'
    });

    async getRandomVisibleProduct(): Promise<Locator> {
        const visibleProducts: Locator[] = [];

        const count = await this.products.count();

        for (let i = 0; i < count; i++) {
            const product = this.products.nth(i);

            if (await product.isVisible()) {
                visibleProducts.push(product);
            }
        }

        return visibleProducts[
            Math.floor(Math.random() * visibleProducts.length)
        ];
    }

    async addProductToCart(product: Locator) {
        const productName = await product.locator('.ec_product_title_type1').innerText();
        const productPrice = await product.locator('.ec_price_type1').innerText();

        const button = product
            .locator('.ec_product_addtocart a:visible')
            .filter({ hasNotText: 'Select Options' })
            .first();

        const responsePromise = this.page.waitForResponse(response =>
            response.url().includes('admin-ajax.php') &&
            response.request().method() === 'POST'
        );

        await button.click();

        const response = await responsePromise;

        return {
            response,
            json: JSON.parse(await response.text()),
            productName,
            productPrice
        };
    }

    async openCart() {
        await this.viewCartButton.click();
    }
}