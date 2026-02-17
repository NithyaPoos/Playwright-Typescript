import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { UserData } from '../../TestData/models';

export class PurchasePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async verifyPage() {
    await expect(this.page).toHaveTitle('BlazeDemo Purchase');
    await expect(this.page.getByPlaceholder('First Last')).toBeVisible();
  }

  async fillForm(data: UserData) {
    await this.page.getByPlaceholder('First Last').fill(data.name);
    await this.page.getByPlaceholder('123 Main St.').fill(data.address);
    await this.page.getByPlaceholder('Anytown').fill(data.city);
    await this.page.getByPlaceholder('State').fill(data.state);
    await this.page.getByPlaceholder('12345').fill(data.zip);
    await this.page.getByPlaceholder('John Smith').fill(data.cardName);
    await this.page.getByPlaceholder('Credit Card Number').fill(data.cardNumber);
    await this.page.getByPlaceholder('Month').fill(data.month);
    await this.page.getByPlaceholder('Year').fill(data.year);

    await this.page.locator('#cardType').selectOption(data.cardType);
    await this.page.getByLabel('Remember me').check();
  }

  async purchaseFlight() {
    await this.page.getByRole('button', { name: 'Purchase Flight' }).click();
  }
}
