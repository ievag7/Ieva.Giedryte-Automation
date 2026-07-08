import { test, expect } from '@playwright/test';

test ('Add product to cart and verify details', async ({page}) => {
    await page.goto('https://academybugs.com/find-bugs/');

        const acceptCookies = page.getByRole('button', { name: 'Accept cookies' });

        if (await acceptCookies.isVisible()) {
            await acceptCookies.click();
        }

        await expect(page).toHaveTitle(/Find Bugs/);

const products = page.locator('.ec_product_li').filter({ has: page.locator('.ec_price_type1') });

const visibleProducts = [];

const count = await products.count();

for (let i = 0; i < count; i++) {
    if (await products.nth(i).isVisible()) {
        visibleProducts.push(products.nth(i));
    }
}

console.log('Visible products:', visibleProducts.length);

const randomProduct = visibleProducts[
    Math.floor(Math.random() * visibleProducts.length)
];

const productName = await randomProduct
    .locator('.ec_product_title_type1')
    .innerText();

const productPrice = await randomProduct
    .locator('.ec_price_type1')
    .innerText();

console.log('Product name:', productName);
console.log('Product price:', productPrice);


    await randomProduct.click();

    await expect(page).toHaveURL(/store/);
    
    const addToCartButton = page.getByRole('button', { name: 'ADD TO CART' });

    await expect(addToCartButton).toBeVisible();

    const responsePromise = page.waitForResponse(response =>
        response.url().includes('admin-ajax.php') &&
        response.request().method() === 'POST'
    );
    
    await addToCartButton.click();
    
    const response = await responsePromise;

    const responseBody = await response.text();
    
    expect(response.ok()).toBeTruthy();

    const cartProduct = page.getByRole('link', {name: productName}).first();

    await expect(cartProduct).toBeVisible();

  


   

   

});
