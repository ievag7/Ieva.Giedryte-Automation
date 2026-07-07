import { test, expect } from '@playwright/test';

test ('open Academybugs website', async ({page}) => {
    await page.goto('https://academybugs.com/find-bugs/');
    await expect(page)
        .toHaveTitle(/Find/);
});