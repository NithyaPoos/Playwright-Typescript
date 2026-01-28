import {test,expect,Locator,Page} from '@playwright/test';


//resuable func to avoid repetition
//it should handle both past or future dates
async function selectDate(date1:string,year1:string,month1:string,page:Page,isFuture:boolean)
{
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
if(isFuture)
    {
const nextButton=page.getByTitle('Next');
await nextButton.click();
}
else
    {
const previousButton=page.getByTitle('Prev')
await previousButton.click();
}

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

}
/**
 best approach to avoid flaky tests - prevent infinite loops when something goes wrong
 async function selectDate(date: string, year: string, month: string, page: Page) {
  const targetMonthIndex = (parseInt(year) * 12) + monthToNumber(month);
  
  while (true) {
    const currentMonth = await page.locator('.ui-datepicker-month').textContent();
    const currentYear = await page.locator('.ui-datepicker-year').textContent();

    const currentMonthIndex = (parseInt(currentYear) * 12) + monthToNumber(currentMonth);

    if (currentMonthIndex === targetMonthIndex) break;

    if (currentMonthIndex < targetMonthIndex) {
      await page.getByTitle('Next').click();
    } else {
      await page.getByTitle('Prev').click();
    }
  }

  await page.locator('.ui-datepicker-calendar td', { hasText: date }).click();
}

function monthToNumber(month: string): number {
  return [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ].indexOf(month);
}

 */


test.only('jquery data picker -next and previous buttons',async({page})=>{

await page.goto('https://testautomationpractice.blogspot.com/');
const datePicker1:Locator=page.locator('input#datepicker.hasDatepicker');
await expect(datePicker1).toBeVisible();
await datePicker1.fill('03/11/2026');
await expect(datePicker1).toHaveValue('03/11/2026');

//another way 
//ui-datepicker-month,ui-datepicker-year after clicking on loctor datePk
await datePicker1.click();
const year1:string='2029';
const month1='May';
const date1='19';

//await selectDate(date1,year1,month1,page,true);//for past date
await selectDate(date1,year1,month1,page,true);//futuredate-calling resuable func by passing arguments to parameters
console.log("date selected :: ",await datePicker1.inputValue());//05/19/2026
//const expectedDate:string='05/19/2020';//pastdate
const expectedDate:string='05/19/2029';//futuredate
await expect(datePicker1).toHaveValue(expectedDate);
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