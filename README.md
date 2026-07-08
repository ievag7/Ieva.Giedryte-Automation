Automation task

Write an automated test based on Playwright. The test should:
1. Open https://academybugs.com/find-bugs/ URL
2. Add any product to the cart
3. Verify:

   
   a. the API response status

   
   b. the product name in response matches the UI

   
4. Open cart and verify the price matches with one on all products page.

<br><br>

**Prerequisites:**
- Node.js must be installed on your machine.

<br> 

**Run the test using:**
npx playwright test tests/findBugs.spec.ts
