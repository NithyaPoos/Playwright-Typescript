import {test,expect,Locator} from '@playwright/test';

test('Read data if next page is avail then stop -no more pages',async({page})=>{
await page.goto('https://datatables.net/examples/basic_init/zero_configuration.html');
//pagination table-read data until- no more pages
let scrollNextPage=true;
let nextButton:Locator= page.getByRole('button', { name: 'Next' }); //>  next button
let previousButton:Locator= page.getByRole('button', { name: 'Previous' });//<  prev





const rowsPerPage:Locator=await page.locator("table#example tbody tr");
   const rowsCount:number=await rowsPerPage.count();
    console.log("Total rows per page",rowsCount);
    for(let r of await rowsPerPage.allInnerTexts()){
    console.log("data inside each row :: ",r);
    }
// const rowsPerPage:Locator[]=await page.locator("table#example tbody tr").all();
//    const rowsCount:number=await rowsPerPage.length;
//     console.log("Total rows per page",rowsCount);
//     for(let r of rowsPerPage){
//     console.log("data inside each row :: ",await r.allInnerTexts());
//     }

// while(scrollNextPage){
//     //rows count
// const rowsPerPage:Locator=page.locator("table#example tbody tr");
// const rowsCount:number=await rowsPerPage.count();
// console.log("Total rows per page",rowsCount);
// }

})