import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ReservePage extends BasePage {
  readonly rows: Locator;

  constructor(page: Page) {
    super(page);
    this.rows = page.locator('table.table tbody tr');
  }

  async verifyPage() {
    await expect(this.page).toHaveTitle('BlazeDemo - reserve');
    await expect(this.rows.first()).toBeVisible();
  }

  async getAllPrices(): Promise<number[]> {
    const prices: number[] = [];

    for (const row of await this.rows.all()) {
      const priceText = await row.locator('td').last().innerText();
      prices.push(parseFloat(priceText.replace('$', '').trim()));
    }

    return prices;
  }

  async selectCheapestFlight(cheapest: number) {
    for (let i = 0; i < await this.rows.count(); i++) {
      const priceText = await this.rows.nth(i).locator('td').last().innerText();
      const price = parseFloat(priceText.replace('$', '').trim());

      if (price === cheapest) {
        await this.rows
          .nth(i)
          .getByRole('button', { name: 'Choose This Flight' })
          .click();
        break;
      }
    }
  }
}
