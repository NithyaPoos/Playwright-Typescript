//locators-auto wait(hanles synchronization) ,retry ability(handle flakiness)
// to interact with elements on the page 
//locators-to find elements on the page
//three types of locators-builtin(locators methods),custom(css,xpath),text
//built in locators-page-getByRole, getByLabel, getByPlaceholder,
//                        getByText,getByAltText,getByTitle,getByTestId
//page.getByRole(role,{options})- roles may be button,link,textbox,
//              checkbox,heading,radio,combobox,table,tab,tabpanel etc
//page.getByText(text,{options})- text may be full or partial text  
//page.getByLabel(label,{options})- label is associated with input element
//page.getByPlaceholder(placeholder,{options})- placeholder is attribute of
// - input element
//page.getByAltText(altText,{options})- altText is attribute of img element
//page.getByTitle(title,{options})- title is attribute of any element
//page.getByTestId(testId,{options})- testId is attribute of any element  

import {test,expect, Locator} from '@playwright/test';
test('verify builtin locators of page getby',async ({page})=>{

await page.goto("https://testautomationpractice.blogspot.com/");
//getByRole-input type is text
const name=page.getByRole('textbox',{name:/Enter Name/i});
await name.fill("Demo1");
await expect(name).toHaveValue("Demo1");
//note -tag is input then use toHaveValue (not toHaveText)
//use getByRole for placeholder,label,...
//getByRole-radio button
const gender=page.getByRole('radio',{name:'Female'});
await gender.check();
await expect(gender).toBeChecked();
//getBYLabel for mutliple selection list
const colors=page.getByLabel('Colors:');
await colors.selectOption(["Red",'Blue',"Green"]);//choose option attribute value /text visible
await expect(colors).toHaveValues(["red",'blue','green']);//maintain DOM orer + must match value attributes(not visible text)
//getByRole for multiple selection list
const animals=page.getByRole('listbox',{name:'Sorted List:'});
await animals.selectOption(["Cat",'Dog',"Deer"]);//choose option attribute value /text visible
await expect(animals).toHaveValues(["cat",'deer','dog']);//maintain DOM order + must match value attributes(not visible text)
//date-css datepicker
const date1=page.locator('#datepicker')
await date1.fill("10/10/2022");
await expect(date1).toHaveValue("10/10/2022");
//date
const startDate=page.getByPlaceholder('Start Date');
const endDate=page.getByPlaceholder('End Date');
const submitBtn=page.locator('.date-picker-box').getByRole('button',{name:'Submit'});//more submit button so class used
await startDate.fill("2022-12-01");
await endDate.fill("2022-12-31");
await submitBtn.click();
await expect(startDate).toHaveValue("2022-12-01");
await expect(endDate).toHaveValue("2022-12-31");
//upload file
const file1Upload:Locator = page.locator('#singleFileInput');
const uploadBtn:Locator = page.getByRole('button', { name: 'Upload Single File' });
await file1Upload.setInputFiles('C:\\Users\\mahar\\Downloads\\Reading_Training_(2).Pdf');

//await file1Upload.setInputFiles('C:\Users\mahar\Downloads\Reading_Training_(2).Pdf');//"C:\Users\mahar\Downloads\Reading_Training_(2).Pdf"
await uploadBtn.click();
console.log(await page.locator('#fileUploadResult').allInnerTexts());

await expect(uploadBtn).toContainText('Upload');

})
