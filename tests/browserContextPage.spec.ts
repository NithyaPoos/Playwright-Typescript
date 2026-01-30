//browser------>         BrowserContext----->Page
//Chromium.launc()----->newContext()-------->newPage()
//RT browser              browserContext     Page   import all these in the first statement
//diff BC for multiple users/app for using diff pages(multiple) windows,tabs,popup)
//  for the same browser(chromium here-edge + chrome)
/*
Browser	        The actual Chromium/Firefox/WebKit instance	
BrowserContext	An isolated session (cookies, storage, permissions)	A separate Chrome profile
                Each context is fully isolated (cookies, localStorage, sessionStorage, permissions)
                can simulate multiple users in the same browser instance
                multiple tabs inside one context
                multiple contexts inside one browser
Page	        A tab, popup, or window	A single browser tab
================================================================================
import { chromium, Browser, BrowserContext, Page } from 'playwright';
async function run() {
  const browser: Browser = await chromium.launch({ headless: false });
  const context: BrowserContext = await browser.newContext();
  const page: Page = await context.newPage();

  await page.goto('https://example.com');
  await browser.close();
}
run();
================================================================================
Multiple users /multpile BC-Each user has its own cookies, storage, and session.
const browser = await chromium.launch();
================================================================================
// User A
const userA = await browser.newContext();
const pageA = await userA.newPage();
await pageA.goto('https://example.com/login');

// User B
const userB = await browser.newContext();
const pageB = await userB.newPage();
await pageB.goto('https://example.com/login');

==================================================
Multiple tabs/windows/popups in the same context
==================================================
const context = await browser.newContext();
const tab1 = await context.newPage();
const tab2 = await context.newPage();

await tab1.goto('https://google.com');
await tab2.goto('https://bing.com');

Both tabs share the same session (like two tabs in the same Chrome profile).

==================================================
Using different browsers (Chromium, Chrome, Edge)
==================================================
const browser = await chromium.launch();

const browser = await chromium.launch({
  channel: 'msedge'
});


const browser = await chromium.launch({
  channel: 'chrome'
});

Import everything in one statement
----------------------------------------------------------------------
import {chromium,Browser,BrowserContext,Page} from 'playwright';
 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

*/

import {test,expect,Locator,Browser,BrowserContext,Page,BrowserType,chromium,firefox,webkit} from '@playwright/test';
//import { test, expect, BrowserType, chromium, firefox, webkit } from '@playwright/test';

async function openAndCheckTitle(browserType: BrowserType, url: string, expectedTitle: string) 
{
  const browser :Browser= await browserType.launch();
  const context :BrowserContext= await browser.newContext();
  const page :Page= await context.newPage();

  await page.goto(url);
  await expect(page).toHaveTitle(expectedTitle);

  await browser.close();
}

test.only('browser thru reusbale func ',async ()=>{
const browsertype:BrowserType=chromium;
const url:string='https://www.google.com/';
const expectedtitle='Google';  
await openAndCheckTitle(browsertype,url,expectedtitle);
})

test('try chromium browser',async ()=>{
          //chrome
          const browser:Browser=await chromium.launch();//chromium.launch({ channel: 'chrome' })
          const bc:BrowserContext=await browser.newContext();  
          const page=await bc.newPage();  

          await page.goto('https://www.google.com/');
          await expect(page).toHaveTitle('Google');

          //firefox
          //const browser1:Browser=await firefox.launch();//chromium.launch({ channel: 'msedge' })
          const browser1:Browser=await chromium.launch({channel:'msedge'});
          const bc1:BrowserContext=await browser1.newContext();  
          const page1=await bc1.newPage();  
 
          await page1.goto('https://www.google.com/');
          await expect(page1).toHaveTitle('Google');

          await page.waitForTimeout(3000);
         // await page.pause();
         await browser.close(); 
         await browser1.close();
})
test('try webkit browser',async ()=>{
          //chrome
          const browser:Browser=await webkit.launch(); //create browser -webkit
          const bc:BrowserContext=await browser.newContext();  //create context 1
          const bc2:BrowserContext=await browser.newContext(); //create context2
          const page1=await bc.newPage();                        //create new page 1  for c1
          const page2=await bc.newPage();                       //create new page2    for c1
          const page=await bc2.newPage();                       //create new page1 for c2
         console.log("No of pages created for context :: ", bc.pages().length);//array of pages -2
        ;
          await page.goto('https://www.google.com/');            //c2
          await expect(page).toHaveTitle('Google');

          await page1.goto('https://chatgpt.com/');               //c1-p1
          await expect(page).toHaveTitle('Google');
      
          await page2.goto('https://testautomationpractice.blogspot.com/');//c1-p2
          await expect(page).toHaveTitle('Google');

          await page.waitForTimeout(3000);
          await page1.waitForTimeout(3000);   
          await page2.waitForTimeout(3000);

         await browser.close(); 

})

