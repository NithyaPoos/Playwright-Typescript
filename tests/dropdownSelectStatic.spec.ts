import {test,expect,Locator} from '@playwright/test';
//seelct options from static and dynamic dropdowns
//select single and multiple options from diff dropdown options 
//extract all options from dropdown and compare count of options
//select option based on option visible text-label, index, value
//assert selected option using toBeSelected(),toHaveValue(),toContainText(),toHaveText(),toHaveCount(),
// toHaveAttribute()...
//loop through all dropdown options and select each option one by one ,select and assert
//select javascript based dropdowns using keyboard events and mouse click events or evaluate method


test('static dropdown-select single option by visible text',async({page})=>{ 
   await page.goto("https://testautomationpractice.blogspot.com/");
   //select dropdown locator and check its visibility before performing any action
    const countryDropdown:Locator = page.locator('#country');
    countryDropdown.scrollIntoViewIfNeeded();
    await expect(countryDropdown).toBeVisible();
    //await countryDropdown.selectOption('United States');  // or use label for visible text
    await countryDropdown.selectOption({label:'United States'});
    //expect(await countryDropdown.inputValue()).toBe('usa');


    //assert selected option using different assertions
    await expect(countryDropdown).toHaveValue('usa');
    await expect(countryDropdown).toHaveText(/United States/);
   // await expect(countryDropdown).toHaveAttribute('name','country');
    await expect(countryDropdown).toHaveCount(1);


    //print selected option text
const selectedOptionText=await countryDropdown.locator('option:checked').textContent();
console.log("Selected option text is:",selectedOptionText); //   United States

//print all the options inside the dropdown
const all = (await page.locator('#country option').allTextContents()).map(opt=>opt.trim());
console.log("All dropdown options are==================>:",all); 

//print all dropdown options count and text 
//console.log("text context ::  ",await countryDropdown.textContent()); //prints  all options for quick debugging      
const options = await countryDropdown.locator('option').allTextContents();
for(const option of options){
    if(option.trim().startsWith('U')){
    console.log("dropdown option text ::----------> ",option);
}
}
/*
//console.log("selected all text options are ::" ,options);
 //palywright filtered opt-  
 const filteredOptions: string[] = await countryDropdown.locator('option') //not for option 
                                              .filter({ hasText: /^U/ }) //hasTest is for div/span/li/button/p,etc
                                              .allTextContents();
 console.log("playwright filteredOptions ::---",filteredOptions);                                             
  */                                           

//filter using JS array funcs
//countryDropdown.locator('#country option')
const opts = await countryDropdown.locator('option').allTextContents(); 
const filtered = opts.map(o => o.trim())
                      .filter(o => o.startsWith('U'));
 console.log("TS/JS built in func arra used :: ",filtered);



const allOptions:Locator=countryDropdown.locator('option'); 
    //for index based selection,filtering,assertion on specific option,conditions 
    const optionCount = await allOptions.count();
    console.log("Total options in dropdown:", optionCount);
    for (let i = 0; i < optionCount; i++) {
        const optionText = await allOptions.nth(i).textContent();
        console.log("Option", i, ":", optionText);
    }
   
    
})
test('static dropdown-select single option by index',async({page})=>{ 
   await page.goto("https://testautomationpractice.blogspot.com/");
   const countryDropdown:Locator = page.locator('#country');
   await expect(countryDropdown).toBeVisible();
   await countryDropdown.selectOption({index:0});
   await expect(countryDropdown).toHaveValue('usa');
   await expect(countryDropdown).toHaveText(/United States/);
   await expect(countryDropdown).toHaveCount(1);
  
})
test('static dropdown-select single option by value',async({page})=>{ 
   await page.goto("https://testautomationpractice.blogspot.com/");
   const countryDropdown:Locator = page.locator('#country');
    await expect(countryDropdown).toBeVisible();
    //await countryDropdown.selectOption('usa');//value
   await countryDropdown.selectOption({value:'usa'});
    await expect(countryDropdown).toHaveValue('usa');
    await expect(countryDropdown).toHaveText(/United States/);
    await expect(countryDropdown).toHaveCount(1);

})

test('static dropdown- select diff options',async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
const dropdown = page.locator('#country'); 
 await dropdown.scrollIntoViewIfNeeded();
   const countrySelect :string[]= await page.selectOption('#country', [
                                           { value: 'US' },
                                           { label: 'India' },
                                            { index: 3 }
                                         ]);//germany will be selected 

    console.log("Selected options are:",countrySelect);
    expect(countrySelect).toEqual(["germany"]);
    await expect(dropdown).toHaveValue('germany');

    await page.waitForTimeout(3000);


});
test('static dropdown-select multiple options',async({page})=>{ 
   await page.goto("https://testautomationpractice.blogspot.com/");
//seelct multiple options from dropdown
const dropdownColor = page.locator('#colors');
    await dropdownColor.scrollIntoViewIfNeeded();
 const dropdownColorOptions = page.locator('#colors option');
    const optionsColorCount:number= await dropdownColorOptions.count();
    console.log("Total options in colors dropdown:", optionsColorCount);
    expect(optionsColorCount).toBe(7);
    expect(dropdownColorOptions).toHaveCount(7);

    //print all color options
    for( let color of (await dropdownColorOptions.allTextContents()).map(ot=>ot.trim()))
        {
        console.log("Color option is:",color);
        }
   
    //select multiple options
  const selectedColorOptions:string[] = await dropdownColor.selectOption(['red','blue','yellow']); //value based selection
    //dropdownOptions.selectOption([{value:'red'},{value:'blue'},{value:'yellow'}]); //value based selection
   // dropdownOptions.selectOption([{label:'Green'},{label:'Orange'}]); //label based selection
    //dropdownOptions.selectOption([{index:0},{index:5}]); //index based selection
   expect(selectedColorOptions).toEqual(["red", "blue", "yellow"]);//order is important
   expect(selectedColorOptions).toHaveLength(3);
   expect(selectedColorOptions).toEqual(expect.arrayContaining(["red", "blue", "yellow"]));//doesnt't care about order

   //expect(selectedColorOptions).toContain("red");//onyl single match is enough

   //another way to select multiple options
    const countryDropdown:Locator = page.locator('#country');
    await expect(countryDropdown).toBeVisible();
    //await countryDropdown.selectOption('usa');//value
   //print all dropdown options count and text 
    const allOptions:Locator=countryDropdown.locator('option');
    const optionCount = await allOptions.count();
    console.log("Total options in dropdown:", optionCount);
    for (let i = 0; i < optionCount; i++) {
        const optionText = await allOptions.nth(i).textContent();
        console.log("Option", i, ":", optionText);
    }
    //assert total options count
    expect(optionCount).toBe(10);

    //loop through all options and select each option one by one and assert
    for(let i=0;i<optionCount;i++){
        const optionValue=await allOptions.nth(i).getAttribute('value');
        await countryDropdown.selectOption({value:optionValue!});
        //assert selected option
        await expect(countryDropdown).toHaveValue(optionValue!);
    //  await expect(countryDropdown).toHaveText(new RegExp(await allOptions.nth(i).textContent()!));
    }
  
    await page.waitForTimeout(3000);
})

test('select-verify displayed dropdown options are sorted',async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    const animaldropdown:Locator=page.locator("#animals");
    await animaldropdown.scrollIntoViewIfNeeded();
    await expect(animaldropdown).toBeVisible();

  
    const animalOptions = page.locator("#animals option");
    //const animalOptions = page.locator("#colors option");
    const optionCount = await animalOptions.count();
    console.log("Total options in animals dropdown:", optionCount);
    expect(optionCount).toBe(10);
    expect(animalOptions).toHaveCount(10);

    //extract all options text into an array
    //use spread opertor to make original array copy for comparison
    const actualOptions:string[]=(await animalOptions.allTextContents()).map(opt=>opt.trim());
    const expectedOptions:string[]=[...actualOptions] //create a copy of actual options array
    const sortedOptions= [...actualOptions].sort(); //sort a copy of actual options array
    console.log("Expected sorted options are:",sortedOptions)
    console.log("Actual options are:",actualOptions);
    expect(actualOptions).toEqual(sortedOptions); //compare actual and expected sorted arrays

})

test.only('select-verify dropdown options contain duplicates',async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    const animalsdropdown:Locator=page.locator("#colors");
    await animalsdropdown.scrollIntoViewIfNeeded();
    await expect(animalsdropdown).toBeVisible();

    const animaldropdown:Locator=page.locator("#colors option");
    const optionCount = await animaldropdown.count();
    console.log("Total options in colors dropdown:", optionCount);
    expect(animaldropdown).toHaveCount(7);

    //extract all options text into an array
    const actualOptions:string[]=(await animaldropdown.allTextContents()).map(opt=>opt.trim());
    console.log("Actual options are:",actualOptions);

    //check for duplicates using Set
    const uniqueOptions:Set<string>=new Set<string>();
    //array to hold duplicate options
    const duplicateOptions:string[]=[];

    for(const value of actualOptions){
//check if value is already in set then it's duplicate so add to duplicate array else add to set
        if(uniqueOptions.has(value)){
            duplicateOptions.push(value);
                    console.log("Duplicate option found:",value);
        }
        else{
            uniqueOptions.add(value);
        }
    }

    
    if(duplicateOptions.length>0){
            console.log("Duplicate option found:",duplicateOptions);
    }else{
        console.log("No duplicate options found in dropdown");
    }

//confirm duplicates exist
expect(duplicateOptions.length).toBeGreaterThan(0);
//expect(duplicateOptions.length).toBe(0); //to fail the test


  
  
})


test('dynamic dropdown options',async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");

})