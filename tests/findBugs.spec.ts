import { test, expect } from '@playwright/test';
import { FindBugsPage } from '../pages/FindBugsPage';
import { ProductSelection } from '../pages/ProductSelection';

test ('Add product to cart and verify details', async ({page}) => {

    const findBugsPage = new FindBugsPage(page);
    const productSelection = new ProductSelection(page);

    await findBugsPage.goto();
    await findBugsPage.acceptCookies();

    const product = await productSelection.getRandomVisibleProduct();

    const { response, json, productName, productPrice } =
        await productSelection.addProductToCart(product);

    expect(response.ok()).toBeTruthy();
    expect(json[0].title.toUpperCase()).toContain(productName.toUpperCase());

    await productSelection.openCart();

    await expect(page).toHaveURL(/my-cart/);

    
const cartProductName = page
        .getByRole('link', {name: productName})
        .first();


    await expect(cartProductName).toBeVisible();


const cartProductPrice = await page
        .locator('.ec_cartitem_price')
        .innerText();

        const normalize = (price: string) =>
            price.replace(/[^0-9.]/g, '').trim();


    expect(normalize(cartProductPrice)).toBe(normalize(productPrice));

    // await cartPage.verifyProduct(name, price);
});

// const products = page.locator('.ec_product_li')
// .filter({ has: page.locator('.ec_price_type1') });

// const visibleProducts = [];

// const count = await products.count();

// for (let i = 0; i < count; i++) {
//     if (await products.nth(i).isVisible()) {
//         visibleProducts.push(products.nth(i));
//     }
// }

// const randomProduct = visibleProducts[
//     Math.floor(Math.random() * visibleProducts.length)
// ];

// const productName = await randomProduct
//     .locator('.ec_product_title_type1')
//     .innerText();

// const productPrice = await randomProduct
//     .locator('.ec_price_type1')
//     .innerText();

// const addToCartButton = randomProduct
//     .locator('.ec_product_addtocart a:visible')
//     .filter({ hasNotText: 'Select Options' })
//     .first();

//     await expect(addToCartButton).toBeVisible();

    

// const responsePromise = page.waitForResponse(response =>
//         response.url().includes('admin-ajax.php') &&
//         response.request().method() === 'POST'
//     );

//     await addToCartButton.click();

   
// const response = await responsePromise;

//     expect(response.ok()).toBeTruthy();

// const responseBody = await response.text();

// const json = JSON.parse(responseBody);

// expect(json[0].title.toLocaleUpperCase()).toContain(productName.toLocaleUpperCase());


// const viewCartButton = page.getByRole('link', { name: 'View Cart' });

//     await expect(viewCartButton).toBeVisible();

//     await viewCartButton.click();

//     await expect(page).toHaveURL(/my-cart/);

    
// const cartProductName = page
//         .getByRole('link', {name: productName})
//         .first();


//     await expect(cartProductName).toBeVisible();


// const cartProductPrice = await page
//         .locator('.ec_cartitem_price')
//         .innerText();

//         const normalize = (price: string) =>
//             price.replace(/[^0-9.]/g, '').trim();


//     expect(normalize(cartProductPrice)).toBe(normalize(productPrice));
    

