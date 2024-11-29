import { test, describe, beforeEach, expect } from '@playwright/test';
import { loginWith, createBlog } from './helper.js';
import { text } from 'stream/consumers';

describe('Blogs app', () => {
    beforeEach(async ({ page, request }) => {
        // Go to the starting page before each test.
        await request.post('https://blogsweb-production-89be.up.railway.app/api/testing/reset');
        await request.post('https://blogsweb-production-89be.up.railway.app/api/users', {
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    username: 'Test',
                    name: 'Tester',
                    password: '15673019'
                }
            });

        await page.goto('http://localhost:5173');

        });

    describe('5.17 Initial Form', () => {
        test('front page can be opened', async ({ page }) => {

            await page.waitForSelector('form', { timeout: 60000 });

            const content = await page.content();
            console.log(content);

            const locator = await page.getByRole('form');
            await expect(locator).toBeVisible();
            await expect(locator.getByTestId('username')).toBeVisible();
            await expect(locator.getByTestId('password')).toBeVisible();
            await expect(locator.getByRole('button', { name: 'Login' })).toBeVisible();
        })
    })

    describe('When Login', () => {
        test('Login with a Real user' , async ({ page }) => {

            // await page.fill('[data-testid="username"]', 'Dementor');

            // await page.fill('[data-testid="password"]', '15673019');

            // await page.click('button[type="submit"]');

            await loginWith('Test', '15673019', page);

            await page.waitForSelector('text=Logout');

            // await page.waitForSelector('text=Wrong Username or Password');

            await expect(page.getByText('Tester is logged as a Test')).toBeVisible();
        })

        test('5.18 Login with a Fake user' , async ({ page }) => {

            // await page.fill('[data-testid="username"]', 'Dementor');

            // await page.fill('[data-testid="password"]', '15673019');

            // await page.click('button[type="submit"]');

            await loginWith('Fake', '15673019', page);

            const errorDiv = await page.locator('[data-testid="error-div"]:has-text("Wrong Username or Password")');
            await expect(errorDiv).toBeVisible();

        })

        test('5.19 , Add a new Blog' , async ({ page }) => {

            // await page.goto('http://localhost:5173');
                
                // await page.fill('[data-testid="username"]', 'Dementor');
                // await page.fill('[data-testid="password"]', '15673019');
        
                // await page.click('button[type="submit"]');

                await loginWith('Dementor', '15673019', page);
        
                await page.waitForSelector('text=Logout');
        
                // await page.click('text=Create');

                // await page.waitForSelector('text=Create new blog');
        
                // await page.fill('[data-testid="title"]', 'USANDO TEST DATA');
                // await page.fill('[data-testid="author"]', 'Dementor');
        
                // await page.click('button[type="submit"]');

                await createBlog('Usando Funciones Login y Crear', 'Dementor', page);
        
                await page.waitForSelector('[data-testid="blog-title"]:has-text("Usando Funciones Login y Crear")');

                    const blogElement = await page.locator('[data-testid="blog-title"]:has-text("Usando Funciones Login y Crear")');
                    await expect(blogElement).toBeVisible();
        })

        test('5.20 , like a blog' , async ({ page }) => {

            await loginWith('Test', '15673019', page);

            await createBlog('UNIQUE', 'Test', page);

            // Seleccionar el primer blog de la lista
            const blog = page.locator('.blogCard:has-text("UNIQUE")');
            await blog.waitFor({ timeout: 60000 });
            await blog.scrollIntoViewIfNeeded();

            const viewBtn = blog.locator('button:has-text("View")');
            await viewBtn.click();
        
            const likeBtn = blog.locator('button[data-testid="like-button"]');
        
            // Hacer clic en el botón de Like
            const likeCountLocator = blog.locator('[data-testid="amountOfLikes"]');
            const initialLikesText = await likeCountLocator.textContent();
            const initialLikes = parseInt(initialLikesText.split(' ')[0]);
            await likeBtn.click();
        
            // Esperar a que el contador de likes se actualice
            await expect(likeCountLocator).toHaveText(`${initialLikes + 1} likes`);
        })

        test('5.21 , delete blog', async ({ page }) => {

            await loginWith('Test', '15673019', page);

            await createBlog('DELETE', 'Test', page);

            const blog = page.locator('.blogCard:has-text("DELETE")');
            await blog.waitFor({ timeout: 60000 });
            await blog.scrollIntoViewIfNeeded();

            const viewBtn = blog.locator('button:has-text("View")');
            await viewBtn.click();

            const deleteBtn = blog.locator('button:has-text("Delete")');

            // Interceptar y aceptar el cuadro de diálogo de confirmación
            page.on('dialog', async dialog => {
                console.log(dialog.message());
                await dialog.accept();
            });

            await deleteBtn.click();

            await page.waitForSelector('.blogCard:has-text("DELETE")', { state: 'detached' });

            const deletedBlog = await page.locator('.blogCard:has-text("DELETE")').count();
                expect(deletedBlog).toBe(0);
        })

        test('5.22 , Only the owner can see delete btn', async ({ page }) => {

            await loginWith('Test', '15673019', page);

            await createBlog('Can U See DeleteBtn ?', 'Test', page);

            const blog = page.locator('.blogCard:has-text("Can U See DeleteBtn ?")');
            await blog.waitFor({ timeout: 60000 });
            await blog.scrollIntoViewIfNeeded();

            const viewBtn = blog.locator('button:has-text("View")');
            await viewBtn.click();

            const deleteBtn = blog.locator('button:has-text("Delete")');

            expect(deleteBtn).toBeVisible();
            
            //

            const blog2 = page.locator('.blogCard:has-text("Token JWT")');
            await blog2.waitFor({ timeout: 60000 });
            await blog2.scrollIntoViewIfNeeded();

            const viewBtn2 = blog2.locator('button:has-text("View")');
            await viewBtn2.click();

            const deleteBtn2 = blog2.locator('button:has-text("Delete")');

            expect(deleteBtn2).toBeHidden();
        })

        test('5.23 , All Blogs are sorted by amount of likes', async ({ page }) => {

            await loginWith('Test', '15673019', page);

            const blogs = page.locator('.blogCard');

            const likes = [];
            const blogCount = await blogs.count();
            for (let i = 0; i < blogCount; i++) {
                const blog = blogs.nth(i);
                const likeCountLocator = blog.locator('[data-testid="amountOfLikes"]');
                const likesText = await likeCountLocator.textContent();
                const likeCount = parseInt(likesText.split(' ')[0]);
                likes.push(likeCount);
            }

            console.log(likes);

            for (let i = 0; i < likes.length - 1; i++) {
                expect(likes[i]).toBeGreaterThanOrEqual(likes[i + 1]);
            }
            
        })
    })
})