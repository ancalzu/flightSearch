import { $ } from '@wdio/globals'
import Page from './page.js';

class searchPage extends Page {

    get inputOrigin() {
        return $('#originInput');
    }

    get inputDestination() {
        return $('#destinationInput');
    }

    get btnSearch() {
        return $('#btnSubmitHomeSearcher');
    }

    get firstOption() {
        return $('#popup-list');
    }

    get btnRejectCookies() {
        return $('#onetrust-reject-all-handler');
    }

    get checkOneWay() {
        return $('#onewayList');
    }

    get nextMonth() {
        return $('#nextButtonCalendar');
    }


    async rejectCookies() {
        //Maximize window
        await browser.maximizeWindow()

        //Reject cookies
        await $('#onetrust-reject-all-handler').waitForExist()
        await this.btnRejectCookies.click();
    }

    async searchFlight(Origin, Destination) {
        //Select Origin
        await this.inputOrigin.click();
        await this.inputOrigin.setValue(Origin);
        await this.inputOrigin.addValue(" ");
        await this.firstOption.click();

        //Select Destination
        await this.inputDestination.click();
        await this.inputDestination.setValue(Destination);
        await this.inputDestination.addValue(" ");
        await this.firstOption.click();

        //Find first of june 2024
        let displayed = false;
        while (!displayed) {
          const month = await browser.$('[data-month="6"]');
          const exist = await month.isExisting();
      
          if (exist) {
            displayed = true;
          } else {
            this.nextMonth.click();
          }
        }
        
        //Select one way
        await browser.isElementSelected('#onewayList');
        await this.checkOneWay.click();

        //Select date
        await browser.elementClick('td.ui-datepicker-unselectable.ui-state-disabled[data-month="5"][data-year="2024"]')
        await this.btnSearch.click();
    }

    open() {
        return super.open();
    }
}

export default new searchPage();
