import { Browser, BrowserContext, chromium, Page } from "@playwright/test";
import { pageFixture } from "./pageFixture";
import test = require("node:test");
import { After, AfterAll, Before, BeforeAll, Status } from "@cucumber/cucumber";
import path = require("path");
let browser: Browser;
let context: BrowserContext
let page: Page;
BeforeAll(async function(){
    browser = await chromium.launch({headless: true});
})
Before(async function(){
    context = await browser.newContext();
    page = await context.newPage();
    pageFixture.page = page;
})
After(async function({pickle, result}){
    //Screenshot only for failure
    // if(result?.status == Status.FAILED){
    //     const image = await pageFixture.page.screenshot({path: `./test-results/screenshots/${pickle.name}.png`, type:'png'})
    //     this.attach(image, 'image/png')
    // }
    const image = await pageFixture.page.screenshot({path: `./test-results/screenshots/${pickle.name}.png`, type:'png'})
    this.attach(image, 'image/png')
    await page.close();
    await context.close();
})
AfterAll(async function(){
    await browser.close();
})