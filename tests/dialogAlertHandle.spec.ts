//handle dialogs alike alert, confirm, prompt, and beforeunload
//by default, Playwright automatically handles dialogs by accepting them and 
// you dont need to write any additional code.
//However, you can override this behavior by listening to the 'dialog' event
//and providing custom handling logic.
import { test, expect } from '@playwright/test';    
test('dialog alert ', async ({ page }) => {
    //navigate to url
    await page.goto("https://testautomationpractice.blogspot.com/");   
    await expect(page).toHaveTitle(/Automation Testing Practice/);
    //simple alert dialog handling
//  const alert1:any=await Promise.all([page.waitForEvent('dialog'),
//             page.locator('button#alertBtn').click()]);
//register a dialog handler or listener event before clicking 
    page.on('dialog', async (d) => {
        console.log("dialog message :: ",d.message());//I am an alert box!
        console.log("dialog type ::", d.type());//alert
         expect(d.type()).toBe('alert');
         expect(d.message()).toBe('I am an alert box!');
        await d.accept();
    });
    await page.getByText('Simple Alert').click();
    await page.waitForTimeout(2000);

 // await page.getByText('Simple Alert').click();

// const simpleAlert:any=await alert1;//capture dialog object after click is done

//  //assertion to validate the text inside the dialog 
// expect(simpleAlert.message()).toBe('I am an alert box!');
// expect(simpleAlert.type()).toBe('alert');
// await simpleAlert.accept(); //accept dialog object after assertions are done 
 

});



test('Simple alert dialog handling2-accept/message/type', async ({ page }) => {
    //navigate to url
    await page.goto("https://testautomationpractice.blogspot.com/");    
    await expect(page).toHaveTitle(/Automation Testing Practice/);

 /*const [dialog] = await Promise.all([
  page.waitForEvent('dialog'),
  page.locator('#alertBtn').click({ noWaitAfter: true }) //deadlock occurs here 
]);*/

  const dg=page.waitForEvent('dialog');
  page.locator('#alertBtn').click({ noWaitAfter: true });
  const dialog=await dg;

console.log(`Alert Message is :: ${dialog.message()}`);

expect(dialog.type()).toBe('alert');
expect(dialog.message()).toBe('I am an alert box!');
await dialog.accept();

});
test('confirm dialog alert -handling accept /dismiss' , async ({ page }) => {
    //navigate to url
    await page.goto("https://testautomationpractice.blogspot.com/");    
    await expect(page).toHaveTitle(/Automation Testing Practice/);

    page.on('dialog',async (d)=>{
        console.log("Message inside the confirm alert box :: ",d.message());
        console.log("Type of the confirm alert box :: ",d.type());
       expect(d.message()).toContain('Press a button!');
       expect(d.type()).toBe('confirm');
      // await d.accept();
      await d.dismiss();
    })

       await  page.locator("button#confirmBtn").click();
       const text1:string= await page.locator("p#demo").innerText();//You pressed Cancel!
       console.log("text insde after confimation is done :: ",text1);// You pressed OK!
       expect(text1).toContain('You pressed Cancel!');
});
test.only('prompt dialog -alert handling -enter text -accept', async ({ page }) => {
    //navigate to url
    await page.goto("https://testautomationpractice.blogspot.com/");    
    await expect(page).toHaveTitle(/Automation Testing Practice/);

    page.on('dialog',async (g)=>{
        console.log("Type of the prompt dialog alert ::",g.type());//prompt
        console.log("Message appeared isnide the prompt dialog alert ::",g.message());//Please enter your name:  
        //await g.accept();//User cancelled the prompt.-not pausing any value
         expect(g.type()).toBe('prompt');
         expect(g.message()).toBe('Please enter your name:');
         expect(g.defaultValue()).toBe('Harry Potter');

         const defaultText:string=g.defaultValue();
         await g.accept(defaultText);//Hello Harry Potter! How are you today?
    
       // await g.dismiss();//User cancelled the prompt
       //await  g.accept('NewValue');////Hello NewValue! How are you today?
    })

    await page.locator("#promptBtn").click();
    const text1:string=await page.locator("#demo").innerText();
    console.log("text inside the promt after accepting it",text1);//Hello NewValue! How are you today?
    expect(text1).toContain('Hello Harry Potter! How are you today?');

});
test('beforeunload dialog handling', async ({ page }) => {
    //navigate to url
    await page.goto("https://testautomationpractice.blogspot.com/");    
    await expect(page).toHaveTitle(/Automation Testing Practice/);
});
test('dialog multiple handling', async ({ page }) => {
    //navigate to url
    await page.goto("https://testautomationpractice.blogspot.com/");    
    await expect(page).toHaveTitle(/Automation Testing Practice/);
});
test('dialog with delay handling', async ({ page }) => {
    //navigate to url
    await page.goto("https://testautomationpractice.blogspot.com/");    
    await expect(page).toHaveTitle(/Automation Testing Practice/);
});
