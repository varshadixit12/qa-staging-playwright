import { Page, expect } from '@playwright/test';
import { SohoWorksMembership } from '../locators/SohoWorksMembership';
import { WaitHelper } from '../Utility/waitHelper';
import ReportLog from '../Utility/Report';



function delay(ms: number) 
{ return new Promise(resolve => setTimeout(resolve, ms)); }

export class SohoWorksPage {
  readonly page: Page;
  readonly locators: SohoWorksMembership;
  readonly wait: WaitHelper;

  constructor(page: Page) {
    this.page = page;
    this.locators = new SohoWorksMembership(page);
    this.wait = new WaitHelper(page);
  }


  async clicksw_non_member() {
    await expect(this.locators.IamNotASohoHouseMember).toBeVisible();
    await this.locators.IamNotASohoHouseMember.click();
  }

  async fillDOB(day: string, month: string, year: string) {
  await this.page.fill('#sw_non_member_date_of_birth_day', day);
  await this.page.fill('#sw_non_member_date_of_birth_month', month);
  await this.page.fill('#sw_non_member_date_of_birth_year', year);
}

  async fillApplicationForm(firstname: string, lastname: string, email: string, dentifyil: string, 
    sohoWorkLocation: string, membershipType: string, businessName: string, natureOfBusiness: string,businessTelephone: string,) {
    await expect(this.locators.firstName).toBeVisible();
    await this.locators.firstName.fill(firstname);
    await expect(this.locators.lastName).toBeVisible();
    await this.locators.lastName.fill(lastname);
    await expect(this.locators.email).toBeVisible();
    await this.locators.email.fill(email);
    await expect(this.locators.dob).toBeVisible();
    // await this.locators.dob.fill(dob);
    await expect(this.locators.identify).toBeVisible();
    await this.locators.identify.selectOption(dentifyil);
    await expect(this.locators.sohoWorkLocation).toBeVisible();
    await this.locators.sohoWorkLocation.selectOption(sohoWorkLocation);
    await expect(this.locators.membershipType).toBeVisible();
    await this.locators.membershipType.selectOption(membershipType);
    await this.page.locator("//input[@id='sw_non_member_head_shot']").setInputFiles('tests/testData/valid_PhotoID.jpg');
    await expect(this.locators.businessName).toBeVisible();
    await this.locators.businessName.fill(businessName);
    await expect(this.locators.natureOfBusiness).toBeVisible();
    await this.locators.natureOfBusiness.selectOption(natureOfBusiness);
    await expect(this.locators.businessTelephone).toBeVisible();
    await this.locators.businessTelephone.fill(businessTelephone);
    await expect(this.locators.checkbox1).toBeVisible();
    await this.locators.checkbox1.click()
    await expect(this.locators.checkbox2).toBeVisible();
    await this.locators.checkbox2.click()
    await this.locators.submit.click()
    // await delay(5000);
  await this.page.waitForSelector("text=Thank you for your application", {
  timeout: 15000
});

  
}
async submitApplicationForm(){
  await this.page.waitForSelector("text=Thank you for your application", {
  timeout: 15000
});
}



}