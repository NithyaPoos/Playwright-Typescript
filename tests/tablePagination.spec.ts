import {test,expect,Locator} from '@playwright/test';
import { locales } from 'zod';
import { is } from 'zod/v4/locales';

test('Read data if next page is avail then stop -no more pages',async({page})=>{
await page.goto('https://datatables.net/examples/basic_init/zero_configuration.html');

/**
 * Pagination-A table has more pages and A page in a table has more rows 
 * We can find all the pages on a table based on next button enabled stage 
 * if there are no more pages to read /click  then next button will be disabled
 * 
 * A page-More rows-data of all col -
 *           on top of locator tr.all() read
 * Table-Has more Pages-more rows -next button click-
 *           while(true){on top of locator tr.all() read}
 * A page-row-particular col then-row.get col -then read data
 * 
 */
/*
const rowsPerPage:Locator=page.locator("table#example tbody tr");
   const rowsCount:number=await rowsPerPage.count();
    console.log("Total rows per page",rowsCount);
    for(let r of await rowsPerPage.allInnerTexts()){
    console.log("data inside each row :: ",r);
    }
    /*
// const rowsPerPage:Locator[]=await page.locator("table#example tbody tr").all();
//    const rowsCount:number=await rowsPerPage.length;
//     console.log("Total rows per page",rowsCount);
//     for(let r of rowsPerPage){
//     console.log("data inside each row :: ",await r.allInnerTexts());
//     }
*/
//pagination table-read data until- no more pages
let scrollNextPage=true;
//let nextButton:Locator= page.getByRole('button', { name: 'Next' }); //>  next button
let nextButton:Locator=page.locator("button[aria-label='Next']");
let previousButton:Locator= page.getByRole('button', { name: 'Previous' });//<  prev
let count=1;
while(scrollNextPage)
    {
    //rows count
const rowsPerPage:Locator[]=await page.locator("table#example tbody tr").all();
const rowsCount:number=rowsPerPage.length;
console.log("Total rows per page",rowsCount);
for(let row of rowsPerPage)
    {
   const rowText=await row.innerText();
   console.log("-----------------Row Text for my reference-----------------------")
   console.log(rowText);
    }
    //this loop stop if there are no more pages to be clicked-check disbaled
//let nextButton:Locator= page.getByRole('button', { name: 'Next' });
const isDisabledButton=await nextButton.getAttribute('class');//dt-paging-button disabled next
if(isDisabledButton?.includes('disabled'))
{
scrollNextPage=false;
}
else
{
await nextButton.click();
count++;
}

}
console.log("count :: "+count);
//page.waitForTimeout(3000);
})

test('filter the rows on pagination table and check rows are present accordingly',
    async ({page})=>{
 await page.goto('https://datatables.net/examples/basic_init/zero_configuration.html');
 const dropdown_filterValues=page.locator('select#dt-length-0.dt-input option');
 for(let value of await dropdown_filterValues.all()){
  console.log("Dropdown value  :: ",await value.innerText());
 }
const dropdown_filter=page.locator('select#dt-length-0.dt-input');
await dropdown_filter.selectOption({label:"50"});

const rows=await page.locator("table#example tbody tr").all();
console.log("rows count :: ",rows.length);
const rows1=page.locator("table#example tbody tr");
console.log("rows count :: ",rows1.count());
expect(rows.length).toBe(50);
expect(rows1).toHaveCount(50);
//(filter dropdwon sleection)-> 10 ::  (table#example tbody tr) -> 10
//(filter dropdwon sleection)-> 25 ::  (table#example tbody tr) -> 25)


})

test.only('search for a specific row based on name or any other col value',
    async({page})=>{
await page.goto('https://datatables.net/examples/basic_init/zero_configuration.html');
//get searchbox locator and fill or enter value to be found
const searchbox:Locator=page.locator('#dt-search-0');
await page.waitForTimeout(3000);
//const searchbox:Locator=page.getByLabel('Search:');
await searchbox.fill('cox');
//for the enteredvalue in the search box,jus look for rows count dispalyed
const rows:Locator[]=await page.locator('table tbody tr').all();
console.log("count of rows for the searched result :: ",rows.length);
if(rows.length>=1)
{
console.log("Rows have been found for the given keywrod and details are dispaled below ");
for(let row of rows)
    {
    let match=false;
    const text=await row.innerText();
    if( text?.toLocaleLowerCase().includes('cox'))
        {
      console.log("Record matches found :: ",text);
      match=true;
      break;
    }
     expect(match).toBe(true);
     expect(match).toBeTruthy;
    }
   
}else{
console.log("No rows have beem found for the given keyword ")
}
})
