const { test, expect } = require('@playwright/test');

test.describe('Автоматизовані тести для YouTube Music', () => {
  // 1. Тест на перевірку наявності елемента навігації "Home"
  test('Перевірка наявності елемента Home у меню', async ({ page }) => {
    // Відкриваємо YT Music
    await page.goto('https://music.youtube.com/');

    // Шукаємо посилання / пункт меню "Home" та перевіряємо його видимість
    const homeLink = page.getByRole('link', { name: 'Home' }).first();
    await expect(homeLink).toBeVisible();
  });

  // 2. Тест на перевірку правильного домену / URL
  test('Перевірка правильного домену сторінки', async ({ page }) => {
    // Відкриваємо YT Music
    await page.goto('https://music.youtube.com/');

    // Перевіряємо, що поточний URL сайту відповідає очікуваному домену
    await expect(page).toHaveURL('https://music.youtube.com/');
  });

  // 3. Тест на перевірку наявності кнопки "Sign in"
  test('Перевірка кнопки Sign in та перехід на сторінку авторизації', async ({ page }) => {
    // Відкриваємо YT Music
    await page.goto('https://music.youtube.com/');

    // Знаходимо кнопку або посилання "Sign in" та перевіряємо його видимість
    const signInButton = page.getByRole('link', { name: 'Sign in' }).or(page.getByRole('button', { name: 'Sign in' }));
    await expect(signInButton.first()).toBeVisible();

    // Натискаємо на кнопку "Sign in"
    await signInButton.first().click();

    // Перевіряємо, що після кліку відбувся перехід на сторінку входу Google (accounts.google.com)
    await expect(page).toHaveURL(/accounts\.google\.com/);
  });

  test.setTimeout(60000);
});

