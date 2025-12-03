import { Page, APIResponse } from '@playwright/test';

export class ApiHelper {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Wait for one specific API endpoint (request + response).
   */
  async waitForApi(endpoint: string, methods = ['PATCH', 'POST', 'PUT', 'GET']) {
    const requestPromise = this.page.waitForRequest(req =>
      req.url().includes(endpoint) &&
      methods.includes(req.method())
    );

    const responsePromise = this.page.waitForResponse(res =>
      res.url().includes(endpoint) &&
      methods.includes(res.request().method())
    );

    const request = await requestPromise;
    const response = await responsePromise;

    return { request, response };
  }

  /**
   * Wait for multiple API endpoints in sequence (ordered).
   */
  async waitForApisSequential(endpoints: string[]) {
    const results = [];

    for (const ep of endpoints) {
      results.push(await this.waitForApi(ep));
    }

    return results;
  }

  /**
   * Wait for multiple APIs in parallel (unordered).
   */
  async waitForApisParallel(endpoints: string[]) {
    return Promise.all(
      endpoints.map(ep => this.waitForApi(ep))
    );
  }
}
