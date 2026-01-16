import {test,expect, Locator} from '@playwright/test';
test.only('playwright actions demo-checkbox ',async({page})=>{           
    //url navigation
await page.goto("https://testautomationpractice.blogspot.com/");
await expect(page).toHaveTitle(/Automation Testing Practice/);  
//checkbox-check() uncheck()-to check specific checkbox use getByLabel
const fridayCheckbox:Locator=page.getByLabel('Friday');
await expect(fridayCheckbox).toBeVisible();
await fridayCheckbox.setChecked(false);
//expect(await fridayCheckbox.isChecked()).toBeFalsy();

await fridayCheckbox.check();
await expect(fridayCheckbox).toBeChecked();

await fridayCheckbox.uncheck();
await expect(fridayCheckbox).not.toBeChecked();

//check multiple checkboxes-use getByRole and assert count OF checked checkboxes
const days:string[]=["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const daysCheckboxes:Locator[]=days.map(item=>page.getByLabel(item));
expect(daysCheckboxes.length).toBe(7);

for(const day of daysCheckboxes){
    if( !(await day.isChecked()) )
        {
    await day.check();
}
    await expect(day).toBeChecked();
}
//uncheck only last 3 checkboxes from the list and assert count of checked checkboxes

for(const day of daysCheckboxes.slice(-3)){
    if(await day.isChecked())
        {
    await day.uncheck();
        }
    await expect(day).not.toBeChecked();
}


//randomly check/uncheck checkboxes and assert count of checked checkboxes
//select index from 0 to 6  (1,3,6)
const indexes:number[] = [1,3,6];
for(const i of indexes){
    daysCheckboxes[i].check();
    await expect(daysCheckboxes[i]).toBeChecked();
}

//select the checkbox based on label name
//const days:string[]=["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const day1 = "Saturday",day2="friday"; 
for (const day of days) { 
    if (day.toLowerCase() === day1.toLowerCase() || day.toLowerCase() === day2.toLowerCase()) {
    await page.getByLabel(day).check(); 
    await expect(page.getByLabel(day)).toBeChecked(); 
} }

//other way using nth();

const checkboxes = page.locator('input[type="checkbox"].form-check-input');
const count = await checkboxes.count();
for (let i = 0; i < count; i++) {
  await checkboxes.nth(i).check();
  await expect(checkboxes.nth(i)).toBeChecked(); // FIXED
}
  

for (const box of await checkboxes.all()) { 
    await box.check(); 
   await expect(box).toBeChecked();
}

await page.waitForTimeout(3000);
});