/*
const pages = context.pages();
for (const p of pages) 
{
  console.log(await p.title());
}
or
Switching Between Tabs
============================
await pages[1].bringToFront();

Or switch back to the main page:
==================================
await page.bringToFront();

Handling Multiple Tabs at Once
=================================
const pages = context.pages();

const [main, tab2, tab3] = context.pages();
await tab3.bringToFront();//switch to tab3

//Handling Multiple Windows (Different Contexts)
=================================================
const [newWindow] = await Promise.all([
  context.waitForEvent('page'),
  page.click('#openWindow')
]);
await newWindow.bringToFront();//Switch to newWindow
await page.bringToFront();//Return to mainwindow



//wCapturing a New Tab / Window

const [newTab] = await Promise.all(
                       [ 
                         page.waitForEvent('popup'), 
                         page.click('#openTab') 
                         ]);
await newTab.waitForLoadState();
await expect(newTab).toHaveTitle(/Some Title/);   

//detect all tabs dynamically
==============================================================

context.on('page', async newPage => {
  await newPage.waitForLoadState();
  console.log('New tab opened:', await newPage.title());
});

==============================================================================


Open new tab        ===================     context.newPage()
Catch popup         ===================  	page.waitForEvent('popup')
List all tabs       ===================     context.pages()
Switch tab          ===================  	page.bringToFront()
Separate windows    ===================  	browser.newContext()

--------------------------------------------------------------------------------

*/

import {test,expect,Locator,Browser,BrowserContext,Page,ChromiumBrowser, chromium, BrowserType} from '@playwright/test';
import { TIMEOUT } from 'node:dns';
test('handling multiple pages/tabs/windows using context.pages()',async ({})=>{
    const browser:Browser=await chromium.launch();
    const context:BrowserContext=await browser.newContext();
    const parentPage:Page=await context.newPage();
    //page=tab1
    await parentPage.goto('https://testautomationpractice.blogspot.com/');
    const popupButton:Locator=parentPage.getByRole('button',{name:'Popup Windows'});
    let [childTab]=await Promise.all([ 
                    parentPage.waitForEvent('popup'),
                    parentPage.getByRole('button',{name:'Popup Windows'}).click()    //open two new  wind pages 
                ])

/*  
const [childTab]=await Promise.all([ 
                parentPage.waitForEvent('pages'),
                parentPage.getByRole('button',{name:'Popup Windows'}).click()    //open two new  wind pages 
                                   ]) 
*/
   let pagesAll=context.pages();             
   console.log("check no of tabs opened :: ",pagesAll.length);
   console.log("Title of the first page :: ",await pagesAll[0].title());
   console.log("Title of the second page :: ",await pagesAll[1].title());

    console.log("Url of the first page :: ",await pagesAll[0].url());
    console.log("Url of the second page :: ",await pagesAll[1].url());

   console.log("parent page ::" ,await parentPage.title());
   console.log("child page :: " ,await childTab.title());

   for(let p of pagesAll){
     let title=await p.title();
     if(title.includes('Playwright')){
        console.log("matches found ");
        await p.getByRole('link',{name:'Get started'}).click();
        console.log("check title of the current page ::",await p.title()    );
     // await p.waitForTimeout(3000);
   //  await p.close();
     }
   }

  
  await parentPage.bringToFront();
  console.log("check parent :: ",await parentPage.title());

    
                
   



})