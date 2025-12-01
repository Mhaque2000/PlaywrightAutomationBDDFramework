import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { pageFixture } from '../../hooks/pageFixture';
import { PageManager } from '../pages/PageManager';

setDefaultTimeout(60 * 1000);

let pageManager: PageManager;

Given(/^I am on the login page$/, async () => {
    pageManager = new PageManager(pageFixture.page);
    await pageManager.loginPage.navigate();
});

When(/^I login with the valid credentials$/, async () => {
    await pageManager.loginPage.loginWithValidCredentials();
});

When(/^I login with the invalid credentials$/, async () => {
    await pageManager.loginPage.loginWithInvalidCredentials();
});

When(/^I login without credentials$/, async () => {
    await pageManager.loginPage.clickLoginButton();
});

Then(/^I should get the login failed "([^"]*)"$/, async (expectedErrorMessage: string) => {
    const actualErrorMessage = await pageManager.loginPage.getErrorMessage();
    expect(actualErrorMessage).toContain(expectedErrorMessage);
});

When(/^I clicked on the settings button$/, async () => {
    await pageManager.inventoryPage.openSettings();
});

When(/^I clicked on the "([^"]*)" button$/, async (buttonName: string) => {
    await pageManager.inventoryPage.clickSidebarLink(buttonName);
});

Then(/^I route back to the login page$/, async () => {
    expect(pageManager.loginPage.isOnLoginPage()).toBeTruthy();
});