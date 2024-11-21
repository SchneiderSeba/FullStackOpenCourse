import { test, describe, beforeEach, expect } from '@playwright/test';

describe('Blogs app', () => {
    beforeEach(async ({ page, request }) => {
        // Go to the starting page before each test.
        await request.post('http://localhost:5173/api/testing/reset');

        await page.goto('http://localhost:5173');
        });

    // test('front page can be opened', async ({ page }) => {

    //     const locator = await page.getByText('Blogs Website');
    //     await expect(locator).toBeVisible();
    //     await expect(page.getByText('Blogs Website')).toBeVisible();
    // })
    describe('When Login', () => {
        test('Login with a fake user' , async ({ page }) => {

            await page.fill('[data-testid="username"]', 'Dementor');
            await page.fill('[data-testid="password"]', '15673019');

            // await page.click('text=Sign Up');

            await page.click('button[type="submit"]');

            await page.waitForSelector('text=Logout');

            // await page.waitForSelector('text=Wrong Username or Password');

            await expect(page.getByText('Damian Martinez is logged as a Dementor')).toBeVisible();
        })

        test('Add a new Blog' , async ({ page }) => {

            // await page.goto('http://localhost:5173');
                
                await page.fill('[data-testid="username"]', 'Dementor');
                await page.fill('[data-testid="password"]', '15673019');
        
                await page.click('button[type="submit"]');
        
                await page.waitForSelector('text=Logout');
        
                await page.click('text=Create');

                await page.waitForSelector('text=Create new blog');
        
                await page.fill('[data-testid="title"]', 'USANDO TEST DATA');
                await page.fill('[data-testid="author"]', 'Dementor');
        
                await page.click('button[type="submit"]');
        
                await page.waitForSelector('[data-testid="blog-title"]:has-text("USANDO TEST DATA")');

                    const blogElement = await page.locator('[data-testid="blog-title"]:has-text("USANDO TEST DATA")');
                    await expect(blogElement).toBeVisible();
        })
    })
})