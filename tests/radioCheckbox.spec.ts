import {test,expect,Locator} from '@playwright/test';
test('playwright actions demo-radio button ',async({page})=>{
      //url navigation
await page.goto("https://testautomationpractice.blogspot.com/");
await expect(page).toHaveTitle(/Automation Testing Practice/);  
//radio button-check()
const femaleRadio:Locator=page.locator('#female');
await expect(femaleRadio).toBeVisible();
await expect(femaleRadio).toBeEnabled();
expect(await femaleRadio.isChecked()).toBe(false);
await femaleRadio.check();
expect(await femaleRadio.isChecked()).toBe(true);
await expect(femaleRadio).toBeChecked();
});

test.only('playwright actions demo-checkbox ',async({page})=>{           
    //url navigation
await page.goto("https://testautomationpractice.blogspot.com/");
await expect(page).toHaveTitle(/Automation Testing Practice/);  
//checkbox-check() uncheck()
const fridayCheckbox:Locator=page.getByLabel('Friday');
await expect(fridayCheckbox).toBeVisible();
await expect(fridayCheckbox).toBeEnabled(); 
expect(await fridayCheckbox.isChecked()).toBe(false);
await fridayCheckbox.check();
await expect(fridayCheckbox).toBeChecked();
await fridayCheckbox.uncheck();
await expect(fridayCheckbox).not.toBeChecked();

});