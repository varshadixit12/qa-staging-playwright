import { Page, Locator } from '@playwright/test';

export class SohoWorksMembership {
  readonly IamNotASohoHouseMember: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly email: Locator;
  readonly dob: Locator;
  readonly identify: Locator;
  readonly sohoWorkLocation: Locator;
  readonly membershipType: Locator;
  readonly uploadPhoto: Locator;
  readonly businessName: Locator;
  readonly natureOfBusiness: Locator;
  readonly businessTelephone: Locator;
  readonly checkbox1: Locator;
  readonly checkbox2: Locator;
  readonly submit: Locator;
  readonly thankYouMessage: Locator;


  

  constructor(page: Page) {
    
    this.IamNotASohoHouseMember = page.locator("//button[contains(text(),'I am not a Soho House Member')]");
    this.firstName = page.locator("//input[@id='sw_non_member_first_name']");
    this.lastName = page.locator("//input[@id='sw_non_member_last_name']");
    this.email = page.locator("//input[@id='sw_non_member_email']");
    // this.dob = page.locator("//input[@id='sw_non_member_date_of_birth_day']");
    this.dob = page.locator("#sw_non_member_date_of_birth_day");
    this.identify =page.locator("//select[@id='sw_non_member_gender']");
    this.sohoWorkLocation =page.locator("//select[@id='sw_non_member_your_sohoworks_location']");
    this.membershipType =page.locator("//select[@id='sw_non_member_type_of_membership']");
    this.uploadPhoto =page.locator("//input[@id='sw_non_member_head_shot']");
    this.businessName =page.locator("//input[@id='sw_non_member_registered_business_name']");
    this.natureOfBusiness =page.locator("//select[@id='sw_non_member_nature_of_business']");
    this.businessTelephone =page.locator("//input[@id='sw_non_member_business_telephone']");
    this.checkbox1 =page.locator("//input[@id='sw_non_member_agreed_to_receive_marketing_emails']");
    this.checkbox2 =page.locator("//input[@id='sw_non_member_terms_and_conditions_with_privacy_policy_agreed']");
    this.submit=page.locator("//button[@id='sw_apply_submit']");    
    this.thankYouMessage =page.locator("//h1[contains(text(),'Thank you for your application')]");
 

    
  }
}
