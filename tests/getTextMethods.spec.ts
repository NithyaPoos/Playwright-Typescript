import {test,expect,Locator} from '@playwright/test';

test.only('Extract text and print them ',async ({page})=>{
//url navigation to demo webshop
await page.goto('https://demowebshop.tricentis.com/');

//click computers category
//await page.locator('ul.top-menu a[href="/computers"]').click();
//await page.getByRole('link', { name: 'Computers' }).first().click();
await page.locator('div.header-menu').getByRole('link',{name:'Computers'}).click();

//get all product titles from computers category page
const productTitles: Locator = page.locator('div.sub-category-item>h2>a');

//count number of products
const productCount: number = await productTitles.count();
console.log(`Total products found: ${productCount}`);
//print all product titles using allTextContents()
console.log("Product Titles using allTextContents(): ",(await productTitles.allTextContents()).map(l=>l.trim()));

//print all product titles using allInnerTexts()
console.log("Product Titles using allInnerTexts(): ",await productTitles.allInnerTexts());  

//print each product title using loop and textContent()
for(let i=0;i<productCount;i++){
    const titleText: string | null = await productTitles.nth(i).textContent();//or innerText()
    console.log(`Product using textContent ${i+1}: mapped to string: ${String(titleText)}`); 
}
/**textContent() vs innerText()
 * textContent() retrieves the text as it appears in the HTML source, including
 * hidden text, extra spaces, and line breaks and returns string | null or "" for empty
 * 
 * innerText() retrieves the text as it is rendered on the page, excluding
 * hidden text, extra spaces, line breaks and returns string (never null, returns "" for empty)
 * 
 */
//other way to print each product title using loop and innerText()  
for(let i=0;i<productCount;i++){
    const titleText: string = await productTitles.nth(i).innerText();
    console.log(`Product using innerText ${i+1}: ${titleText}`); 
}  

//productTitles.all()` returns Promise<Locator[]> - converts a Locator to an array of Locators
console.log("Product Titles using all(): ",await productTitles.all());
console.log("first product title using all(): ",(await productTitles.all())[0]);
//first product title using all():  locator('div.sub-category-item>h2>a').first()  
console.log("first product title text using all(): ",await (await productTitles.all())[0].innerText());
//first product title text using all():  Desktops 
/**
 * 
Total products found: 3
Product Titles using allTextContents():  [ 'Desktops', 'Notebooks', 'Accessories' ]
Product Titles using allInnerTexts():  [ 'Desktops', 'Notebooks', 'Accessories' ]
Product using textContent 1: mapped to string:                                                                                     
                                    Desktops
Product using textContent 2: mapped to string:                                                                                     
                                    Notebooks
Product using textContent 3: mapped to string:
                                    Accessories
Product using innerText 1: Desktops                                                                                                
Product using innerText 2: Notebooks
Product using innerText 3: Accessories                                                                                             
Product Titles using all():  [
  locator('div.sub-category-item>h2>a').first(),
  locator('div.sub-category-item>h2>a').nth(1),
  locator('div.sub-category-item>h2>a').nth(2)
]
 * 
 * 
 */

//other way to print each product title using for of loop
for(const titleElement of await productTitles.all()){
    const titleText: string = await titleElement.innerText();
    //const titleText: string | null = await titleElement.textContent();
    console.log(`Product using for of loop: ${titleText}`);
}

//for in loop to print each product title
//locator to locator[] uaing .all()
//productTiles is Locator and productTiles.all() is Locator[] (.all() returns Promise<Locator[]>)
const allTitlesArray = await productTitles.all();
for(const index in allTitlesArray){
    const titleText: string = await allTitlesArray[index].innerText();
    console.log(`Product using for in loop index ${index}: ${titleText}`);
}

//click on Notebooks sub-category
await productTitles.filter({hasText:'Notebooks'}).click();

//other way to click on Notebooks sub-category-using nth index
//await productTitles.nth(1).click();
//await page.locator('div.sub-category-item>h2>a').nth(1).click();

//verify page title is Notebooks
await expect(page.locator('div.page-title h1')).toHaveText('Notebooks');


//wait for 3 seconds
await page.waitForTimeout(3000);


})


test('text extraction methods',async ({page})=>{

await page.goto('https://demowebshop.tricentis.com/');


})