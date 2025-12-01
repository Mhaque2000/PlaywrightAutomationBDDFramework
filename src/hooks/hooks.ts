import { Browser, BrowserContext, chromium, Page } from "@playwright/test";
import { pageFixture } from "./pageFixture";
import { After, AfterAll, Before, BeforeAll, Status } from "@cucumber/cucumber";

let browser: Browser;
let context: BrowserContext;
let page: Page;

BeforeAll(async function() {
    browser = await chromium.launch({ 
        headless: process.env.HEADLESS !== 'false',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    console.log('🚀 Browser launched');
});

Before(async function({ pickle }) {
    context = await browser.newContext({
        viewport: { width: 1920, height: 1080 },
        recordVideo: process.env.CI ? { dir: './test-results/videos/' } : undefined
    });
    page = await context.newPage();
    pageFixture.page = page;
    console.log(`▶️  Starting scenario: ${pickle.name}`);
});

After(async function({ pickle, result }) {
    const scenarioName = pickle.name.replace(/[^a-zA-Z0-9]/g, '_');
    
    // Screenshot on failure
    if (result?.status === Status.FAILED) {
        const screenshotPath = `./test-results/screenshots/${scenarioName}_${Date.now()}.png`;
        const image = await pageFixture.page.screenshot({ 
            path: screenshotPath, 
            type: 'png',
            fullPage: true 
        });
        await this.attach(image, 'image/png');
        console.log(`❌ Scenario failed: ${pickle.name}`);
    } else if (result?.status === Status.PASSED) {
        console.log(`✅ Scenario passed: ${pickle.name}`);
    }
    
    await page.close();
    await context.close();
});

AfterAll(async function() {
    await browser.close();
    console.log('🛑 Browser closed');
});