import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly departure: Locator;
  readonly destination: Locator;
  readonly findFlightsBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.departure = page.locator('select[name="fromPort"]');
    this.destination = page.locator('select[name="toPort"]');
    this.findFlightsBtn = page.getByRole('button', { name: 'Find Flights' });
  }

  async goto() {
    await this.page.goto('https://blazedemo.com/index.php');
  }

  async verifyPage() {
    await expect(this.page).toHaveTitle('BlazeDemo');
    await expect(this.departure).toBeVisible();
    await expect(this.destination).toBeVisible();
  }

  async selectDeparture(city: string) {
    await this.departure.selectOption({ label: city });
  }

  async selectDestination(city: string) {
    await this.destination.selectOption({ label: city });
  }

  async clickFindFlights() {
    await this.findFlightsBtn.click();
  }
}
