import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect, $ } from '@wdio/globals'

import searchPage from '../pageobjects/searchPage.js';

Given(/^I am on the Vueling page$/, async () => {
    await searchPage.open()
    await searchPage.rejectCookies()
});

When(/^I search for a flight from (\w+) to (.+)$/, async (Origin, Destination) => {
    await searchPage.searchFlight(Origin, Destination)
});

Then(/^I should see a flight$/, async () => {
    await browser.switchWindow('https://tickets.vueling.com/ScheduleSelectNew.aspx')
    const flight = await $('[data-js-id="flightCard"]');
    await flight.waitForDisplayed({ timeout: 7000 });
    expect(flight).toBeExisting();
});

