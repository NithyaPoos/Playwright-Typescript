//import { title } from "node:process";
import {test,expect} from "playwright/test";
test("second test-verify URL of the page",async ({page})=>{
await page.goto("https://automationexercise.com/",
    { timeout: 60000, waitUntil: 'load' }
                );

//print URL of the page
let url:string=await page.url();
console.log("URL of the page is:"+url);
//verify url-Assert on locators, not raw values
await expect(page).toHaveURL("https://automationexercise.com/");


})