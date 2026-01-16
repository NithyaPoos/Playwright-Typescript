import { test, expect,Locator } from '@playwright/test';

test('Retrieve, compare and print product prices on bstackdemo.com', async ({ page }) => {

  await page.goto('https://bstackdemo.com');

  // Sort dropdown: Lowest → Highest
  const sortDropdown = page.locator('select');
  await sortDropdown.selectOption({ label: 'Lowest to highest' });

  await page.waitForTimeout(1500);

  // Retrieve product names and prices
  const productNames = await page.locator('.shelf-item__title').allTextContents();
  const priceTexts = await page.locator('.shelf-item__price').allTextContents();

  // Convert "$799" → 799
  const prices = priceTexts.map(p => parseFloat(p.replace('$', '').trim()));

  // Ensure counts match
  expect(productNames.length).toBe(prices.length);

  // Print all products
  console.log('\n All Products After Sorting (Lowest → Highest):');
  productNames.forEach((name, i) => {
    console.log(`- ${name}: $${prices[i]}`);
  });

  // Lowest & highest price
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  const minIndex = prices.indexOf(minPrice);
  const maxIndex = prices.indexOf(maxPrice);

  console.log('\n Lowest Priced Product:');
  console.log(`- ${productNames[minIndex]}: $${minPrice}`);

  console.log('\n Highest Priced Product:');
  console.log(`- ${productNames[maxIndex]}: $${maxPrice}`);

  // NEW: Print FIRST and LAST product after sorting
  console.log('\nFirst Product After Sorting:');
  console.log(`- ${productNames[0]}: $${prices[0]}`);

  console.log('\n Last Product After Sorting:');
  console.log(`- ${productNames[productNames.length - 1]}: $${prices[prices.length - 1]}`);

  // Assertions
  expect(prices[0]).toBe(minPrice); // first should be lowest
  expect(prices[prices.length - 1]).toBe(maxPrice); // last should be highest
});
