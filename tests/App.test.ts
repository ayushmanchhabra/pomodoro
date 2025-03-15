import path from 'node:path';
import process from 'node:process';

import { findpath } from 'nw';
import selenium from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('NW.js Selenium test suite', async function () {
    let driver: chrome.Driver = {} as chrome.Driver;

    /* Setup Selenium driver. */
    beforeAll(async function () {
        /* Initialise Chrome options */
        const options = new chrome.Options();

        const seleniumArguments = [
            'nwapp=' + path.resolve('dist', 'desktop'),
            '--user-data-dir=./dist/cache/nwjs'
        ];

        /* Run in headless mode when in CI environment. */
        if (process.env.CI) {
            seleniumArguments.push('headless=new');
        }

        options.addArguments(...seleniumArguments);

        const chromeDriverPath = await findpath('chromedriver', { flavor: 'sdk' });
        /* Pass file path of NW.js ChromeDriver to ServiceBuilder */
        const service = new chrome.ServiceBuilder(chromeDriverPath).build();

        /* Create a new session using the Chromium options and DriverService defined above. */
        driver = chrome.Driver.createSession(options, service);
    });

    /**
     * Get text via element's ID and assert it is equal.
     */
    it('gets timer component via ID', async function () {
        const textElement = await driver.findElement(selenium.By.id('timer'));

        const text = await textElement.getText();

        expect(text).toBeDefined()
    }, { timeout: Infinity });

    /**
     * Quit Selenium driver.
     */
    afterAll(async function () {
        await driver.quit();
    });
});
