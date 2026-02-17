import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ConfirmationPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async verifyPage() {
    await expect(this.page).toHaveTitle('BlazeDemo Confirmation');
    await expect(this.page.locator('table')).toBeVisible();
  }

  async getConfirmationId(): Promise<string> {
    return await this.page.locator('table tr:nth-child(1) td:nth-child(2)').innerText();
  }
}
