// https://blazedemo.com/index.php 
// Choose departure and destination cities,
// then select the cheapest flight 
// from the displayed results using a sorting technique. 
// After selecting the flight, fill in the required details 
// and complete the booking.

import {test,expect,Locator} from '@playwright/test';

test(' Flight booking demo E2E ',async ({page})=>{
    //navigate to given url 
    await page.goto('https://blazedemo.com/index.php');

    //select departure and destination city from dropdwons
    //select deaprture as boston based on value or visible text/label or index
    const departure:Locator=page.locator('select[name="fromPort"]');
    await expect(departure).toBeVisible();
    //await departure.selectOption({label:'Boston'});
    // await departure.selectOption({value:'Boston'});
    await departure.selectOption({index:2});
    console.log("check selected value :: ",await departure.inputValue());//Boston
    await expect(departure).toHaveValue('Boston');

    //select destination
    const destination:Locator=page.locator('select[name="toPort"]'); 
   await  expect(destination).toBeVisible();
   const destinationOptions=destination.locator('option');
    console.log("destination count :: ",await destinationOptions.count());
    await expect(destinationOptions).toHaveCount(7);

    //await destination.selectOption({value:'Berlin'});
    await destination.selectOption({label:'Berlin'});
    //await destination.selectOption({index:3});
    console.log("selected destination value is :: ",await destination.inputValue());
    await expect(destination).toHaveValue('Berlin');

    //print all the options dispalyed in the dropdown destination
    const destinationOptionsValues:string[]=(await destinationOptions.allTextContents()).map(t=>t.trim());
    console.log("Print all the options of dropdown destination :: ",destinationOptionsValues);
   for(let valueee of destinationOptionsValues){
      if(valueee==='Dublin'){
       await destination.selectOption({label:valueee});
        await expect(destination).toHaveValue('Dublin');
        break;
      }
   }

   const findButton=page.getByRole('button',{name:'Find Flights'});
   await expect(findButton).toBeVisible();
   await expect(findButton).toBeEnabled();
   await findButton.click();
   console.log("title of the Page :: ",await page.title());
   await expect(page).toHaveTitle('BlazeDemo - reserve');
   console.log("current url of the Page :: ",page.url());
   //now into https://blazedemo.com/reserve.php 
    
   page.goto('https://blazedemo.com/reserve.php');
   // Assert table is visible 
   await expect(page.locator('table.table')).toBeVisible();
// //table-get last column data price for all the rows-then choose cheapest one after sorting is done  
const rows:Locator=page.locator('table.table tbody tr ');
await expect(rows.first()).toBeVisible();

console.log("rows count :: ",await rows.count());

//create a array to store prices 
const pricesSorted:string[]=[];
for(let row of await rows.all())
    {
       const priceText:string= await row.locator('td').last().innerText();
       console.log("price text :: ",priceText);
       //Convert "$472.56" → 472.56 because string sorts alpaha but numeric make sense here 
       //if we had $99.00, it would appear after $765.32 in string sort.
       pricesSorted.push(priceText);
       
    }

    pricesSorted.forEach(t=>console.log(t));//jus print 
    //convert $ to numeric
   const numeric= pricesSorted.map(p=>parseFloat(p.replace('$','').trim()));
   const sorted=[...numeric].sort();
   sorted.forEach(t=>console.log("after sorted",t));
//    const unique = new Set(sorted); 
//    console.log(unique);
   const cheapprice=sorted[0];//cheapest after sorting is done 

   console.log("cheapest :: ",cheapprice);
   
   for(let i=0;i<await rows.count();i++){
    const price=await rows.nth(i).locator('td').last().innerText();
    //compare numeric to numeric because cheapprcie is num
    const cheapest1=parseFloat(price.replace('$','').trim());
     if(cheapest1===cheapprice){
        console.log("found cheapest")
        const button=rows.nth(i).getByRole('button',{name:'Choose This Flight'});
        await button.click();
        break;
     }
   }
  
await expect(page).toHaveTitle('BlazeDemo Purchase');
   
    /*
price text ::  $472.56                                                                           
price text ::  $432.98
price text ::  $200.98                                                                           
price text ::  $765.32                                                                           
price text ::  $233.98

after sorted $200.98                                                                             
after sorted $233.98                                                                             
after sorted $432.98                                                                             
after sorted $472.56                                                                             
after sorted $765.32                                                                             
  

*/


})



