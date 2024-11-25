
export const loginWith = async (username, password, page) => {

    await page.fill('[data-testid="username"]', username);
    
    await page.fill('[data-testid="password"]', password);

    await page.click('button[type="submit"]');
};

export const createBlog = async (title, author, page) => {

    await page.click('text=Create');

    await page.waitForSelector('text=Create new blog');
        
    await page.fill('[data-testid="title"]', title);
    await page.fill('[data-testid="author"]', author);
        
    await page.click('button[type="submit"]');
}