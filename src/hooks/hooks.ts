import { Browser, BrowserContext, chromium, Page } from "@playwright/test";
import { pageFixture } from "./pageFixture";
import test = require("node:test");
import { After, AfterAll, Before, BeforeAll } from "@cucumber/cucumber";
let browser: Browser;
let context: BrowserContext
let page: Page;
BeforeAll(async function(){
    browser = await chromium.launch({headless: true});
})
Before(async function(){
    context = await browser.newContext();
    page = await browser.newPage();
    pageFixture.page = page;
})
After(async function(){
    //Screenshot only for failure
    
    await page.close();
    await context.close();
})
AfterAll(async function(){
    await browser.close();
})