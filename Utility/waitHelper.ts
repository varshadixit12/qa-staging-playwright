import { Page } from '@playwright/test';

export class WaitHelper {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private ensurePageOpen() {
    if (this.page.isClosed()) {
      throw new Error("Cannot wait — page is already closed.");
    }
  }

  // Unified wait for text or selector
  async untilVisible(target: string, timeout = 10000) {
    this.ensurePageOpen();

    // Try text first
    const textLocator = this.page.getByText(target, { exact: false });

    try {
      await textLocator.waitFor({ state: "visible", timeout });
      return; // success
    } catch (_) {
      // If text was not found, check if it's a valid selector
      if (target.startsWith('#') || target.startsWith('.') || target.startsWith('//') || target.includes('[')) {
        this.ensurePageOpen();
        await this.page.locator(target).waitFor({ state: "visible", timeout });
      } else {
        throw new Error(`Neither text nor selector visible: ${target}`);
      }
    }
  }

  async untilURLContains(urlPart: string, timeout = 10000) {
    this.ensurePageOpen();
    await this.page.waitForURL(url => url.toString().includes(urlPart), { timeout });
  }

  async untilPageLoads(text: string, timeout = 15000) {
    await this.untilVisible(text, timeout);
  }
}
