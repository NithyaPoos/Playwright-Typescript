import { test,expect } from '@playwright/test';
import { HomePage } from '../Pages/HomePage';
import { ReservePage } from '../Pages/ReservePage';
import { PurchasePage } from '../Pages/PurchasePage';
import { ConfirmationPage } from '../Pages/ConfirmationPage';
import { flightTestData } from '../../TestData/flightData';
import { extractPrice, getCheapest } from '../../Utils/priceUtils';
import { log } from '../../Utils/logger';


test.describe('Flight Booking E2E - BlazeDemo', () => {

  for (const testData of flightTestData) {

    test(`Booking flight from ${testData.departure} to ${testData.destination}`, async ({ page }) => {

      const home = new HomePage(page);
      const reserve = new ReservePage(page);
      const purchase = new PurchasePage(page);
      const confirm = new ConfirmationPage(page);

      // Home Page
      await home.goto();
      await home.verifyPage();
      await home.selectDeparture(testData.departure);
      await home.selectDestination(testData.destination);
      await home.clickFindFlights();

      // Reserve Page
      await reserve.verifyPage();
      const prices = await reserve.getAllPrices();
      const cheapest = getCheapest(prices);
      log(`Cheapest price: ${cheapest}`);
      await reserve.selectCheapestFlight(cheapest);

      // Purchase Page
      await purchase.verifyPage();
      await purchase.fillForm(testData.user);
      await purchase.purchaseFlight();

      // Confirmation Page
      await confirm.verifyPage();
      const confirmationId = await confirm.getConfirmationId();

      expect(confirmationId).not.toBe('');
      log(`Booking Confirmation ID: ${confirmationId}`);
    });

  }
});
