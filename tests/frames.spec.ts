import {test,expect,Locator,Frame,FrameLocator} from '@playwright/test';

test('frames handling-using page.fram() ',async ({page})=>{
await page.goto("https://ui.vision/demo/webtest/frames/");
//find total number of frames present on a page.
const totalFrames:Frame[]=page.frames();
console.log("Total frames on a page",totalFrames.length);//7
//ways to interact with elements inside the frame-
// page.frame() -name or url   page.frame({name:"n1"}) or page.frame({url://})
// or page.frameLocator()
    const frame1:Frame | null =page.frame({url:"https://ui.vision/demo/webtest/frames/frame_1.html"});
    //frame1.locator('input[name="mytext1"]').fill("test1");
    if(frame1){
    await frame1.locator('input[name="mytext1"]').fill("test1");
    //await frame1.fill('input[name="mytext1"]','test1');
             }
    else{
        console.log("Frame is not present as expected");
        }

  //page.frameLocator()


})
test('frames handling -using page.frameLocator()',async ({page})=>{
await page.goto("https://ui.vision/demo/webtest/frames/");
//find total number of frames present on a page.
const totalFrames:Frame[]=page.frames();
console.log("Total frames on a page",totalFrames.length);//7
const frame2:FrameLocator=page.frameLocator('[src="frame_1.html"]');//locate frame using any aval attributes
await frame2.locator('[name="mytext1"]').fill("test2"); 
})

test.only('handle inner frames  or iframes handling ',async ({page})=>{
await page.goto("https://ui.vision/demo/webtest/frames/");
// ? is an optional 
const frame2:Frame|null=page.frame({url:'https://ui.vision/demo/webtest/frames/frame_3.html'});//locate frame using any aval attributes
//await frame2?.locator("[name='mytext3']").fill("inside iframe");
if(frame2){
   await  frame2.locator("[name='mytext3']").fill("inside iframe");
    //find child frames or iframes inside frame3
    const childs:Frame[]= frame2.childFrames();
    console.log("number of iframes inside frame3 :: ",childs.length);//1
    const radio:Locator=childs[0].getByLabel('I am a human');
    await radio.check();
    await expect(radio).toBeChecked();

    await page.waitForTimeout(3000);
}
})