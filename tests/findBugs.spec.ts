import { test, expect } from '@playwright/test';
import { FindBugsPage } from '../pages/FindBugsPage';
import { ProductSelection } from '../pages/ProductSelection';
import { CartPage } from '../pages/CartPage';

test ('Add product to cart and verify details', async ({page}) => {

    const findBugsPage = new FindBugsPage(page);
    const productSelection = new ProductSelection(page);
    const cartPage = new CartPage(page);
 
    //Open https://academybugs.com/find-bugs/ URL
    await findBugsPage.goto();      
    await findBugsPage.acceptCookies();

    //Add any product to the cart
    const product = await productSelection.getRandomVisibleProduct();

    const { response, json, productName, productPrice } =
        await productSelection.addProductToCart(product);


    //Verify API response status
    expect(response.ok()).toBeTruthy();

    //Verify the product name in response matches the UI
    expect(json[0].title.toUpperCase()).toContain(productName.toUpperCase());

    //Open cart
    await productSelection.openCart();


    //Verify the price matches with one on all products page
     await cartPage.verifyProduct(productName, productPrice);
});
    

