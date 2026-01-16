//import { title } from "node:process";
import {test,expect} from "playwright/test";

/* 
test("",({page})=>{

})
*/
//fixtures-global variable -an object containing the browser,page,context
//page is a Playwright fixture that represents a single browser tab.(chrome tab or safari or firefox))
//it is your direct handle to interact with the UI.    
//page object has methods like goto(),click(),fill(),title() etc to interact with the web page.
//expect-playwright assertion library to verify the test result
//toHaveTitle()- to verify the title of the page
//test function to define a test case
//test() function takes two arguments-first is the name of the test case-
// second is an async callback function which contains the test steps
//arrow function - ()=>{}
//test step- navigate to a web page
//page gives you access to navigation,clicking,typing,waiting
//screenshots,locators,dialogs,frames,network interception etc.
//Assert on locators, not raw values
test("first test-verify title of the page",async ({page})=>{
await page.goto("https://automationexercise.com/",
    { timeout: 60000, waitUntil: 'load' }
                );
// //print title
await page.title().then((title)=>{
    console.log("Title of the page is:"+title);
});
//other way to print title
let title:string=await page.title();
console.log("Title of the page is:"+title);

//verify title-Assert on locators, not raw values
await expect(page).toHaveTitle("Automation Exercise");

})