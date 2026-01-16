import {test, expect, Locator} from '@playwright/test';

test('table static data verification',async ({page})=>{
    //navigate to url
    await page.goto("https://testautomationpractice.blogspot.com/");    
    await expect(page).toHaveTitle(/Automation Testing Practice/);

    //locate table
     //count no of rows in a table[name='BookTable']>tbody>tr   7 
     //const rowsAll:Locator=page.locator("table[name='BookTable'] tbody tr");
     //use locator chaining
     const table:Locator=page.locator("table[name='BookTable']");//table locator
     const rowsAll:Locator=table.locator("tbody tr");//rows locator
     //const columnsAll:Locator=table.locator("thead tr th");//columns locator
      const columnsAll:Locator=rowsAll.locator("th");//columns locator
     //const columnWithouhtHeader:Locator=table.locator("tbody tr:nth-child(1) td");//columns without header
     const rowCount:number=await rowsAll.count();
     console.log(`Total number of rows in the table: ${rowCount}`); //7
     expect(rowCount).toBe(7);
     await expect(rowsAll).toHaveCount(7);

     //print all rows text
     console.log("All rows text: ",await rowsAll.allInnerTexts());
     await expect(rowsAll).toHaveText([
        'BookName\tAuthor\tSubject\tPrice',
        'Learn Selenium\tAmit\tSelenium\t300',
        'Learn Java\tMukesh\tJava\t500',
        'Learn JS\tAnimesh\tJavascript\t300',
        'Master In Selenium\tMukesh\tSelenium\t3000',
        'Master In Java\tAmod\tJAVA\t2000',
        'Master In JS\tAmit\tJavascript\t1000'
     ]);    
/**
 Running 1 test using 1 worker
[chromium] › tests\tableStatic.spec.ts:3:5 › table static data verification
Total number of rows in the table: 7
All rows text:  [
  'BookName\tAuthor\tSubject\tPrice',
  'Learn Selenium\tAmit\tSelenium\t300',
  'Learn Java\tMukesh\tJava\t500',
  'Learn JS\tAnimesh\tJavascript\t300',
  'Master In Selenium\tMukesh\tSelenium\t3000',
  'Master In Java\tAmod\tJAVA\t2000',
  'Master In JS\tAmit\tJavascript\t1000'
]
  1 passed (2.5s)
 */


  //count no of columns in the table  table[name='BookTable']>tbody>tr:nth-child(1)>td   4
// const columnsAll:Locator=rowsAll.locator("th");//columns locator
    const columnCount:number=await columnsAll.count();
     console.log(`Total number of columns in the table: ${columnCount}`); //4
    await expect(columnsAll).toHaveCount(4);    
   

    //print all columns text
    console.log("All columns text: ",await columnsAll.allInnerTexts());
    await expect(columnsAll).toHaveText([ 'BookName','Author','Subject','Price']);

  //extract specific row data -3rd row  
    const thirdRow:Locator=rowsAll.nth(2).locator("td");
    console.log("Third row data: ",await thirdRow.allInnerTexts());//[ 'Learn Java', 'Mukesh', 'Java', '500' ]
    for(const cellData of await thirdRow.allInnerTexts()){
        console.log("Cell data of 3rd row: ",cellData);
    }
    await expect(thirdRow).toHaveText(['Learn Java','Mukesh','Java','500']);

     //extract specific column data -2nd column of 3rd row
     //const secondColumnThirdRow:Locator=rowsAll.nth(2).locator("td").nth(1);
        const secondColumnThirdRow:Locator=thirdRow.nth(1);
        const secondColumnThirdRowText:string | null=await secondColumnThirdRow.innerText();
     console.log("Second column of third row data: ",secondColumnThirdRowText);//Mukesh
     expect(secondColumnThirdRowText).toBe("Mukesh");

     //for all the row fetch 3rd column data
     const randomData:Locator=rowsAll.locator("td").nth(2);
     console.log("Random data count: ",await randomData.count());//1
     await expect(randomData).toHaveCount(1);
     console.log("3rd column data for all rows: ",await randomData.allInnerTexts());//selenium
     await expect(randomData).toContainText("Selenium");

     

    
})