import {test, expect,Locator} from '@playwright/test';


test('hidden dropdown -bootstrap',async({page})=>{           
    //url navigation
   await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
   await expect(page).toHaveTitle(/OrangeHRM/);
   //Login
   await page.locator('input[name="username"]').fill("Admin");
   await page.locator('input[name="password"]').fill("admin123");
   await page.locator('button[type="submit"]').click();
   await page.waitForTimeout(3000); 

   //click on PIM module
   //await page.locator("//*[text()='PIM']").click();
   await page.getByText("PIM").click();
   await page.waitForTimeout(2000);

   //click on jobtitle dropdown-hidden bootstrap dropdown-disappearing dropdown
   //const jobTitle:Locator=await page.locator('div.oxd-select-text-input').nth(2);
const jobTitle:Locator= page.locator('div.oxd-select-text-input').nth(2);
   jobTitle.click();
   await page.waitForTimeout(3000);

   //get all options from the dropdown  div[role='option'] span
    const allJobTitles:Locator=page.locator("div[role='option'] span");
    console.log("Print all the job title displayed options using TextOpts:: ",await allJobTitles.allTextContents());
   console.log("Print all the job title displayed options using InnerOpts:: ",await allJobTitles.allInnerTexts());

    const jobTitleCount:number=await allJobTitles.count();
    console.log(`\n Total job titles in the dropdown: ${jobTitleCount}`);
    //print all job titles from the dropdown
    for(let i=0;i<jobTitleCount;i++){
        const jobTitleText:string | null= await allJobTitles.nth(i).textContent();//or innerText()
        console.log(`Job Title ${i+1}: ${jobTitleText}`);
        if(jobTitleText==="Software Engineer"){
            await allJobTitles.nth(i).click();
            break;
        }
 
    }
    await expect(jobTitle).toHaveText("Software Engineer");
    await page.waitForTimeout(3000);



  
});