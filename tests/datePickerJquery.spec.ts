import {test,expect,Locator,Page} from '@playwright/test';

test.only('jquery data picker -next and previous buttons',async({page})=>{

await page.goto('https://testautomationpractice.blogspot.com/');
const datePicker1:Locator=page.locator('input#datepicker.hasDatepicker');
expect(datePicker1).toBeVisible();
await datePicker1.fill('03/11/2026');
await expect(datePicker1).toHaveValue('03/11/2026');

//another way 
//ui-datepicker-month,ui-datepicker-year after clicking on loctor datePk
await datePicker1.click();
const year1:string='2002';
const month1='May';
const date1='19';
const futureyear=2027;
const pastyear=2025;

while(true)
    {
const month=await page.locator('.ui-datepicker-month').textContent();
console.log("month :: ",month);
const year=await page.locator('.ui-datepicker-year').textContent();
//console.log("month :: ",month);
console.log("year :: ",year);

if(month===month1 && year===year1)
{
console.log("matches found ",month,year);
break;
}
//find next and prev button
//future if nothing matches 
// const nextButton=page.getByTitle('Next');

// await nextButton.click();
const previousButton=page.getByTitle('Prev')
await previousButton.click();

}
const allDates:Locator[]=await page.locator('.ui-datepicker-calendar td').all();
for(let date of allDates)
 {
    //loop thru all the dates and click a date based on match found
  const dateText= await date.innerText();
  if(dateText===date1)
    {
        console.log(" date :: ",dateText);
    await date.click();
     break;
    }
 }

 console.log("date selected :: ",await datePicker1.inputValue());//05/19/2026
await expect(datePicker1).toHaveValue('05/19/2002');
})


test('data picker2 -dropdowns selection',async({page})=>{

await page.goto('https://testautomationpractice.blogspot.com/');

})

test('data picker2.2 -range based',async({page})=>{

await page.goto('https://testautomationpractice.blogspot.com/');

})

test('data picker 3-next bootstrap-no past dates avail-only current ',async({page})=>{

await page.goto('https://testautomationpractice.blogspot.com/');

})