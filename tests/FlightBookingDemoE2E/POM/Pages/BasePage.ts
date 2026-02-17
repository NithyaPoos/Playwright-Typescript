import { Page, expect } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  async click(locator: string) {
    await this.page.locator(locator).click();
  }

  async type(locator: string, value: string) {
    await this.page.locator(locator).fill(value);
  }

  async select(locator: string, value: string) {
    await this.page.locator(locator).selectOption(value);
  }
}
