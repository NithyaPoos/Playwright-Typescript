import {test,expect,Locator} from '@playwright/test';

test.only('Auto-suggest dropdown demo',async({page})=>{           
    //url navigation
await page.goto("https://www.flipkart.com/");
await expect(page).toHaveTitle(/Online Shopping India Mobile, Cameras, Lifestyle & more Online @ Flipkart.com/);

const searchBox:Locator=page.locator('div.RjvT8t input[name="q"]');
//await searchBox.click();
await searchBox.fill("mobile iphone 17 pro max"); 
await page.waitForTimeout(3000);

//wait for auto-suggest options to appear-disappear options from dropdown- inspect??
//cntrl+shift+P then run-emulate a function Page-then select locator
//get all the suggested options --------->cntrl+shift+P then run-emulate a function Locator-then select locator
const allSuggestedOptions:Locator=page.locator('ul>li');

//await expect(allSuggestedOptions).toBeVisible();
//print all the suggested options
const optionCount:number=await allSuggestedOptions.count();
console.log(`\n Total auto-suggest options: ${optionCount}`);   

//print all options using map and forEach
(await allSuggestedOptions.allTextContents()).map(text=>text.trim()).forEach((optionText, index)=>{
    console.log(`Option ${index+1}: ${optionText}`);
});

//select specific option from the list based on text
const autoSuggestOptions:Locator=page.locator('//*[text()="mobile cover iphone 17 pro max"]'); 
await expect(autoSuggestOptions).toBeVisible();

//get 5 th option from the list -if we know the index we can selecet directly
//const fifthOption:string | null=await allSuggestedOptions.nth(4).textContent();
const fifthOption:string | null=await allSuggestedOptions.nth(4).innerText();
console.log(`\n 5th option from the list: ${fifthOption}`);
//await allSuggestedOptions.nth(4).click();

//display count of suggested options
for(let i=0;i<optionCount;i++){
    // const optionText:string | null= await allSuggestedOptions.nth(i).textContent();
    // console.log(`Option ${i+1}: ${optionText}`);
    const optionText:string | null = await allSuggestedOptions.nth(i).innerText();
    console.log(`Option ${i+1}: ${optionText}`);
}

//click on specific option//display count of suggested options
for(let i=0;i<optionCount;i++){
    // const optionText:string | null= await allSuggestedOptions.nth(i).textContent();
    // console.log(`Option ${i+1}: ${optionText}`);
    const optionText:string | null = await allSuggestedOptions.nth(i).innerText();
   // if(optionText && optionText.toLowerCase().includes("mobile cover iphone 17 pro max")){
   if(optionText==="mobile cover iphone 17 pro max")
    {
        await allSuggestedOptions.nth(i).click();
        break;
    }
}


await page.waitForTimeout(3000);
});

