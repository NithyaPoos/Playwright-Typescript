import {test,expect,Locator,Page} from '@playwright/test';
import { locales } from 'zod';


//resuable func to avoid repetition
//it should handle both past or future dates
/**
async function goToMonth(page, index, targetMonth, targetYear) {
    while (true) {
        const header = page.locator('h3.e7addce19e[aria-live="polite"]').nth(index);
        await expect(header).toBeVisible();

        const text = await header.innerText();
        const [month, year] = text.split(" ");

        if (month === targetMonth && year === targetYear) {
            return;
        }

        const nextBtn = page.getByRole('button', { name: 'Next month' });
        const prevBtn = page.getByRole('button', { name: 'Previous month' });

        // Try NEXT if target is in the future
        if (await nextBtn.isEnabled()) {
            await nextBtn.click();
            continue;
        }

        // Try PREVIOUS if target is in the past
        if (await prevBtn.isEnabled()) {
            await prevBtn.click();
            continue;
        }

        throw new Error(`Cannot reach ${targetMonth} ${targetYear}. Datepicker is capped.`);
    }
}


 */

test('data picker 3-next bootstrap-no past dates avail-only current ',async({page})=>{

await page.goto('https://www.booking.com/');
const datePicker:Locator=page.getByTestId('searchbox-dates-container');
await page.getByLabel('Dismiss sign-in info.').click();
await datePicker.click();

//targetdatemonth year
const tdate='12';
const tyear='2027';
const tmonth='March';

//checkin month year -January 2026

while(true){
const monthYear=page.locator('h3.e7addce19e[aria-live="polite"]').nth(0);
await expect(monthYear).toBeVisible();
const monthYearText:string=await monthYear.innerText();
console.log("innertext of month year :: ",monthYearText);// January 2026
// const month=monthYearText.split(' ')[0];
// const year=monthYearText.split(' ')[1];
const [month, year] = monthYearText.split(" ");
console.log("innertext of month year :: ",month,"::",year);//  January :: 2026

if(month===tmonth && year===tyear)
{
break;
}
else
    {
const nextMontButton=page.getByRole('button',{name:'Next month'});
await nextMontButton.click();
}

}
//const prevMontButton=page.getByRole('button',{name:'Previous month'});
//we select year and month first then we select date from them
const dates=page.locator('table.b8fcb0c66a tbody').nth(0).locator('td'); //two tbodies -one is for checking another is for checkout
console.log('dates :: ',await dates.count());
let checkinDate:boolean=false;
for(let date of await dates.all())
{
const dateText=await date.innerText();
if(tdate===dateText){
    await date.click();
    checkinDate=true;
    break;
}
}
expect(checkinDate).toBeTruthy();


//checkout date selection 
//targetdatemonth year
const t1date='17';
const t1year='2027';
const t1month='March';

while(true){
const monthYear=page.locator('h3.e7addce19e[aria-live="polite"]').nth(1);
await expect(monthYear).toBeVisible();
 const monthYearText=await monthYear.innerText();
const [month, year] =monthYearText.split(" ");
if(month===t1month && year===t1year)
{
break;
}
else
    {


//         const nextMontButton=page.getByRole('button',{name:'Next month'});
//         // If button is disabled → cannot move further → stop the loop 
//         if (await nextMontButton.isDisabled()) 
//         { 
//             throw new Error(`Cannot reach ${tmonth} ${tyear}. Datepicker is capped.`);
//          }
// //await nextMontButton.click();

const prevMontButton=page.getByRole('button',{name:'Previous month'});
await prevMontButton.click();
//we select year and month first then we select date from them
}

}

const dates1=page.locator('table.b8fcb0c66a tbody').nth(1).locator('td'); //two tbodies -one is for checking another is for checkout
console.log('dates :: ',await dates1.count());
let checkoutDate:boolean=false;
for(let date of await dates1.all())
{
const dateText=await date.innerText();
if(t1date===dateText){
    await date.click();
    console.log("clicked checkout",dateText);
    checkoutDate=true;
    break;
}
}

 expect(checkoutDate).toBeTruthy();
})