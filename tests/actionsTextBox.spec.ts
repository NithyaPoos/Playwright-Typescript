import {test,expect,Locator} from '@playwright/test';
test('playwright actions demo-textbox input type is text',async({page})=>{
    //url navigation
await page.goto("https://testautomationpractice.blogspot.com/");
await expect(page).toHaveTitle(/Automation Testing Practice/);

//type text in input box-enter name,email,phone
const name:Locator=page.locator('#name');
await expect(name).toBeVisible();
await expect(name).toBeEnabled();
const typeValue: string | null = await name.getAttribute('type');
console.log("Attribute value of type:"+typeValue);
expect (typeValue).toBe('text');
const maxLengthValue: string | null = await name.getAttribute('maxlength');
console.log("Attribute value of maxlength:"+maxLengthValue);
expect (maxLengthValue).toBe('15');
await expect(name).toHaveAttribute('type','text');
await expect(name).toHaveAttribute('maxlength','15');
await name.fill("Demo User");
console.log("title ::" + await page.title());
const nameValue: string = await name.inputValue();
console.log("value ::" + nameValue);
expect(nameValue).toBe("Demo User");
await expect(name).toHaveValue("Demo User");

const email:Locator=page.locator("#email");
await email.fill("demo@example.com");
await expect(email).toHaveValue("demo@example.com");

const phone:Locator=page.locator("#phone");
await phone.fill("1234567890");
await expect(phone).toHaveValue("1234567890");

//textarea message
const message:Locator=page.locator("#message");
await message.fill("This is demo message");
await expect(message).toHaveValue("This is demo message");
});