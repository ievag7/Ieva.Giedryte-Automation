import { test, expect } from '@playwright/test';
import { FindBugsPage } from '../pages/FindBugsPage';
import { ProductSelection } from '../pages/ProductSelection';
import { CartPage } from '../pages/CartPage';

test ('Add product to cart and verify details', async ({page}) => {

    const findBugsPage = new FindBugsPage(page);
    const productSelection = new ProductSelection(page);
    const cartPage = new CartPage(page);

    await findBugsPage.goto();
    await findBugsPage.acceptCookies();

    const product = await productSelection.getRandomVisibleProduct();

    const { response, json, productName, productPrice } =
        await productSelection.addProductToCart(product);

    expect(response.ok()).toBeTruthy();
    expect(json[0].title.toUpperCase()).toContain(productName.toUpperCase());

    await productSelection.openCart();

     await cartPage.verifyProduct(productName, productPrice);
});
    

