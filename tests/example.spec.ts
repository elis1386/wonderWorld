import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

const randomPassword = faker.internet.password();
const randomEmail = faker.internet.email();
const randomName = faker.internet.userName();
const randomSurname = faker.person.lastName();
const randomUrl = faker.internet.url();

test.beforeEach(async ({ page }) => {
  await page.goto('https://wonderworld-2a0e3.firebaseapp.com/');
});

test('sign up ', async ({ page }) => {
  page.getByRole('button', { name: 'Sign-up' }).click();
  await page.getByPlaceholder('enter you first name').fill(randomName);
  await page.keyboard.press('Tab');
  await page.getByPlaceholder('enter you last name').fill(randomSurname);
  await page.keyboard.press('Tab');
  await page.getByPlaceholder('name@example.com').fill(randomEmail);
  await page.keyboard.press('Tab');
  await page.getByPlaceholder('Password').fill(randomPassword);
  await page.keyboard.press('Tab');
  await page.getByPlaceholder('add your photo').fill(randomUrl);
  await page.keyboard.press('Tab');
  await page.getByRole('button', { name: 'Sign up' }).click();
  await expect(page).toHaveURL(/user/);
});

test('sign in as admin and sign out', async ({ page }) => {
  await page.pause();

  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByPlaceholder('name@example.com').fill('elis1386@gmail.com');
  await page.keyboard.press('Tab');
  await page.getByPlaceholder('Password').fill('Elis1234');
  await page.keyboard.press('Tab');
  await page.getByRole('main').getByRole('button', { name: 'Sign in' }).click();
  await page.goto('https://wonderworld-2a0e3.firebaseapp.com/admin');
  await page.locator('a').nth(1).click();
  await page.getByText('Sign out').click();
  await expect(page).toHaveURL('https://wonderworld-2a0e3.firebaseapp.com/');
});
test('sign in as user and sign out', async ({ page }) => {
  await page.pause();

  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByPlaceholder('name@example.com').fill('anna@gmail.com');
  await page.keyboard.press('Tab');
  await page.getByPlaceholder('Password').fill('Anna1234');
  await page.keyboard.press('Tab');
  await page.getByRole('main').getByRole('button', { name: 'Sign in' }).click();
  await page.goto('https://wonderworld-2a0e3.firebaseapp.com/user');
  await page.locator('a').nth(1).click();
  await page.getByText('Sign out').click();
  await expect(page).toHaveURL('https://wonderworld-2a0e3.firebaseapp.com/');
});

test('Borrow book if not log in', async ({ page }) => {
  page
    .locator('app-new-arrive')
    .getByRole('heading', { name: 'Neropatin päiväkirja: Karu' })
    .click();
  await page.getByRole('button', { name: 'Borrow this book' }).click();
  page.locator('app-book-list').getByText('Sorry... You need to sign in');
  page.getByRole('link', { name: 'sign in' }).click();
  await expect(page).toHaveURL(
    'https://wonderworld-2a0e3.firebaseapp.com/sign-in'
  );
});

