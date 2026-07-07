import { test, expect } from '@playwright/test';

test ('Add product to cart and verify details', async ({page}) => {
    await page.goto('https://academybugs.com/find-bugs/');
    await expect(page)
        .toHaveTitle(/Find Bugs/);

    const product = page.locator('.ec_image_link_cover').filter({hasText: /.+/ });

    const count = await product.count(); 
    
    const randomIndex = Math.floor(Math.random() * count); 
    
    const randomProduct = product.nth(randomIndex); 
    
    const productName = await randomProduct.textContent(); 
    
    console.log('Product name:', productName);

   

   

});
