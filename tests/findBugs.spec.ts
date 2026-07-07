import { test, expect } from '@playwright/test';

test ('Add product to cart and verify details', async ({page}) => {
    await page.goto('https://academybugs.com/find-bugs/');

        const acceptCookies = page.getByRole('button', { name: 'Accept cookies' });

        if (await acceptCookies.isVisible()) {
            await acceptCookies.click();
        }

        await expect(page).toHaveTitle(/Find Bugs/);

    const product = page.locator('.ec_image_link_cover').filter({hasText: /.+/ });


    const visibleProducts = [];

    const count = await product.count(); 

for (let i = 0; i < count; i++) {
    if (await product.nth(i).isVisible()) {
        visibleProducts.push(product.nth(i));
    }
}

console.log('Visible products:', visibleProducts.length);

const randomProduct = visibleProducts[
    Math.floor(Math.random() * visibleProducts.length)
];
    
    const productName = await randomProduct.textContent(); 
    
    console.log('Product name:', productName);

    await randomProduct.click();

    await expect(page).toHaveURL(/store/);
    


   

});
