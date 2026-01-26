import {test,expect,Locator} from '@playwright/test';

test.only('Dynamic web table',async ({page})=>{
    //navigate to url
await page.goto("https://practice.expandtesting.com/dynamic-table");
await expect(page).toHaveTitle('Dynamic Tables page for Automation Testing Practice');                          
//check visiblity of table 
const table:Locator=page.locator('table.table');
await expect(table).toBeVisible();
//check CPU time column for particular row  locator('table.table').locator('tbody>tr').first()
//page.locator('table.table>tbody>tr')   locator('table.table').locator('tbody>tr').nth(1)
const rows:Locator=table.locator('tbody>tr'); //get all rows first then loop thru them to fetch a particular row based on match value
const rowCount:number=await rows.count();
console.log("rows total count  :: ",rowCount)
for(let row of await rows.all()){
    const text=await row.allInnerTexts();
    console.log("Inner text of each row in a table :: ",text)
   // if(text.includes('Chrome'))-this checks for the array contain an element that is exactly "Chrome"
   if(text.some(t=>t.includes('Chrome')))//This checks each string inside the row for the substring "Chrome".
        {
      console.log("Chrome has been found inside a tbale row");
      break;
        }
    else
        {
            console.log("Chrome has not been found anywhere in the given table ");
        }
}

//extract cell data for each row based on col
for(let row of await rows.all()){
    //const cols:Locator=row.locator('td');  //fetch all rows cols values
    const cols:Locator=row.locator('td').nth(0); //only first row cols values
    const text=await cols.allInnerTexts();
    console.log("Inner text of all cols value of first row in a table :: ",text)
   if(text.includes('Chrome'))//-this checks for the array contain an element that is exactly "Chrome"
   //if(text.some(t=>t.includes('Chrome')))//This checks each string inside the row for the substring "Chrome".
        {
      console.log("Chrome has been found inside a tbale row");
      break;
        }
    else
        {
            console.log("Chrome has not been found anywhere in the given table ");
        }
}

//extract a particular col text for a row in a table
//extract cell data for each row based on col
let val="";
for(let row of await rows.all()){
    //const cols:Locator=row.locator('td');  //fetch all rows cols values
    const colText:string=await row.locator('td').nth(0).innerText();
    if(colText==='Chrome'){
    //  console.log("Chrome has been found inside a tbale row");
     const texts=await row.locator('td').allInnerTexts();
    // console.log('col texts of a row in a table',texts);//[ 'Chrome', '5 Mbps', '0.7 MB', '0.2 MB/s', '9.5%' ]
     //check which column of this row hasa  % ? when we are not congizant of the value 
     //val= await row.locator('td:has-text("%")').innerText();
     val=await row.locator('td',{hasText:"%"}).innerText();
    // console.log('vlaue of a cell that has a %',val)//9.4% 
     break;
        }
    else
        {
            console.log("Chrome has not been found anywhere in the given table ");
        }
}


///compare values 
const val1:string=await page.locator('#chrome-cpu').innerText();
console.log('Value of val  and val1 ::==============>',val,"  ::  ",val1);
//page.waitForTimeout(3000);
const compResult =  val1.trim().includes(val.trim())? "true" : "false" ;
console.log('compare result ',compResult);

//asssertion
expect(val1).toContain(val);
})