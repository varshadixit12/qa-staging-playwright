import { allure } from "allure-playwright";

class ReportLog {

  async addStep(log: string): Promise<void> {
    await allure.step(`STEP: ${log}`, async () => {
      console.log(`STEP: ${log}`);
    });
  }

  async addArgument(name: string, value: string): Promise<void> {
    await allure.step(`Argument: ${name}`, async () => {
      allure.parameter(name, value);
      console.log(`Argument -> ${name}: ${value}`);
    });
  }

  async feature(log: string): Promise<void> {
    await allure.step(`Feature: ${log}`, async () => {
      console.log(`Feature: ${log}`);
    });
  }
}

export default new ReportLog();
