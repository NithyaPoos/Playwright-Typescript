import {test,expect,Locator, Page} from '@playwright/test';


test.beforeEach(async ({ page }) => {
  // Navigate to the Swag Labs website
  await page.goto('https://www.saucedemo.com/');  
  expect(page).toHaveURL('https://www.saucedemo.com/'); // Verify that we are on the correct URL
});
// test.afterEach(async ({ page }) => {
//   // Logout after each test
//   await page.click('#react-burger-menu-btn');
//   await page.click('#logout_sidebar_link');
// });

const logindata = [
  { username: 'standard_user', password: 'secret_sauce' },
  { username: 'locked_out_user', password: 'secret_sauce' },
  { username: 'problem_user', password: 'secret_sauce' },
  { username: 'performance_glitch_user', password: 'secret_sauce' }
];
async function login(page:Page, username:string, password:string) {
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill(username);
  await page.getByPlaceholder('Password').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/inventory/);
}

test.describe('Swag Labs E2E Tests', () => {     
test('Login and Add to Cart', async ({ page }) => {
  // Navigate to the Swag Labs website
//await page.goto('https://www.saucedemo.com/');  
 // Verify that we are on the correct URL
 /*


 const username= page.getByPlaceholder('Username');
 await expect(username).toBeVisible(); // Verify that the username field is visible
 await username.fill(logindata[0].username);
 const password=page.getByRole('textbox', { name: 'Password' })
 await expect(password).toBeVisible(); // Verify that the password field is visible
 await password.fill(logindata[0].password); //placeholder as the accessible name.
const loginButton=page.getByRole('button', { name: 'Login' })
await expect(loginButton).toBeEnabled(); // Verify that the login button is visible
await loginButton.click(); 
expect(page).toHaveTitle('Swag Labs'); // Verify that we have successfully logged in and are on the correct page

*/
await login(page, logindata[0].username, logindata[0].password);
//const addToCartButton=page.getByRole('button', { name: 'Add to cart' }).first();
//const addToCartButton=page.getByRole('button', { name: 'Add to cart' }).last();
const addToCartButton=page.getByRole('button', { name: 'Add to cart' }).nth(2);//Is fragile-If UI order changes → test fails.
const addToCart=page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');//better test or test-id
await expect(addToCartButton).toBeVisible(); // Verify that the add to cart button is visible
await addToCartButton.click(); // Click the add to cart button
const cartBadge=page.locator('.shopping_cart_link');
await expect(cartBadge).toBeVisible(); // Verify that the cart badge is visible and shows the correct number of items
await cartBadge.click(); // Click the cart badge to go to the cart page
await expect(page).toHaveURL('https://www.saucedemo.com/cart.html'); // Verify that we are on the cart page    
await expect(page).toHaveURL(/cart/);//recommended to use regex for better URL verification instead of hardcoding the entire URL which can change easily


const cartItemQuantit=page.locator('.cart_quantity[data-test="item-quantity"]');
await expect(cartItemQuantit).toHaveText('1');
 // Verify that the correct item is in the cart with the correct quantity
 const checkoutButton=page.getByRole('button', { name: 'Checkout' });
 await expect(checkoutButton).toBeVisible();
await checkoutButton.click(); // Click the checkout button to go to the checkout page
await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html'); // Verify that we are on the checkout page
const firstNameInput=page.getByPlaceholder('First Name');
await expect(firstNameInput).toBeVisible(); // Verify that the first name input field is visible
await firstNameInput.fill('John');
const lastNameInput=page.getByPlaceholder('Last Name');
await expect(lastNameInput).toBeVisible(); // Verify that the last name input field is visible
await lastNameInput.fill('Doe');
const postalCodeInput=page.getByPlaceholder('Zip/Postal Code');
await expect(postalCodeInput).toBeVisible();    // Verify that the postal code input field is visible
await postalCodeInput.fill('12345');
const continueButton=page.getByRole('button', { name: 'Continue' });
await expect(continueButton).toBeVisible(); 
await continueButton.click(); // Click the continue button to go to the overview page
await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
//await expect(page.getByText('Sauce Labs Bolt T-Shirt')).toBeVisible(); // Verify that the correct item is listed on the overview page
await expect(page.getByText('Price Total')).toBeVisible(); // Verify that the price total is displayed on the overview page
const finishButton=page.getByRole('button', { name: 'Finish' });
await expect(finishButton).toBeVisible();   
//how to Shipping Information:,Payment Information:Total: $ included ??
//await expect(page.getByText('Shipping Information:')).toBeVisible(); // Verify that the shipping information is displayed on the overview page
//await expect(page.locator('.summary_info')).toContainText('Shipping Information');//recommended to use test-id or test attribute for better locator strategy instead of text content which can change easily
//await expect(page.getByText('Payment Information:')).toBeVisible(); // Verify that the payment information is displayed on the overview page
//await expect(page.locator('.summary_total_label')).toContainText('Total: $');
await expect(page.locator('.summary_info')).toContainText('Shipping Information');
await expect(page.locator('.summary_info')).toContainText('Payment Information');
await expect(page.locator('.summary_total_label')).toContainText('Total: $');
const totalText = await page.locator('.summary_total_label').textContent();
expect(totalText).toMatch(/Total: \$\d+\.\d{2}/);
//await expect(page.getByText('Total: $')).toBeVisible(); // Verify that the total price is displayed on the overview page    
await finishButton.click(); // Click the finish button to complete the purchase
await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html'); // Verify that we are on the order confirmation page
await expect(page.getByText('THANK YOU FOR YOUR ORDER')).toBeVisible(); // Verify that the order confirmation message is displayed

});

test('Checkout Process', async ({ page }) => {
  await login(page, logindata[0].username, logindata[0].password);

  await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();

  await page.getByRole('button', { name: 'Checkout' }).click();

  await page.getByPlaceholder('First Name').fill('John');
  await page.getByPlaceholder('Last Name').fill('Doe');
  await page.getByPlaceholder('Zip/Postal Code').fill('12345');

  await page.getByRole('button', { name: 'Continue' }).click();

  await expect(page.locator('.summary_info')).toContainText('Shipping Information');
  await expect(page.locator('.summary_info')).toContainText('Payment Information');
  await expect(page.locator('.summary_total_label')).toContainText('Total: $');

  await page.getByRole('button', { name: 'Finish' }).click();
  await expect(page).toHaveURL(/checkout-complete/);
});


test('Logout', async ({ page }) => {
 await login(page, logindata[0].username, logindata[0].password);
 await page.locator('#react-burger-menu-btn').click(); 
 await page.locator('#logout_sidebar_link').click(); 
 await expect(page).toHaveURL('https://www.saucedemo.com/');
});
});
