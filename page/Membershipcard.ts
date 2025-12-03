import { Page, expect } from '@playwright/test';
import { MembershipPageLocators } from '../locators/Membershipcardlocators';
import { WaitHelper } from '../Utility/waitHelper';



function delay(ms: number) 
{ return new Promise(resolve => setTimeout(resolve, ms)); }

export class MembershipPage {
  readonly page: Page;
  readonly locators: MembershipPageLocators;
  readonly wait: WaitHelper;

  constructor(page: Page) {
    this.page = page;
    this.locators = new MembershipPageLocators(page);
    this.wait = new WaitHelper(page);
  }


  async login(email: string, password: string) {
    await this.locators.emailField.fill(email);
    await this.locators.passwordField.fill(password);
    await this.locators.continueButton.click();
  }

  async navigateToMembershipForm() {
    await expect(this.locators.sohoHouseLink).toBeVisible();
    await this.locators.sohoHouseLink.click();
    await expect(this.locators.rejectButton).toBeVisible();
    await this.locators.rejectButton.click();
    await expect(this.locators.joinButton).toBeVisible();
    await this.locators.joinButton.click();
  }

  async clickOnProfile() {
    await expect(this.locators.profile).toBeVisible();
    await this.locators.profile.click();
    await this.page.waitForTimeout(3000); 
    await expect(this.locators.changePassword).toBeVisible();
    await this.locators.changePassword.click();
    await expect(this.locators.Preferences).toBeVisible();
    await this.locators.Preferences.click();
    await expect(this.locators.membershipApplication).toBeVisible();
    await this.locators.membershipApplication.click();
    await expect(this.locators.signOut).toBeVisible();
    await this.locators.signOut.click();

  }

  async applyMembership() {
    await expect(this.locators.applyMembershipButton).toBeVisible();
    await this.locators.applyMembershipButton.click();
  }

  async fillDOB(day: string, month: string, year: string) {
    await expect(this.locators.dayInput).toBeVisible();
    await this.locators.dayInput.fill(day);
    await expect(this.locators.monthInput).toBeVisible();
    await this.locators.monthInput.fill(month);
    await expect(this.locators.yearInput).toBeVisible();
    await this.locators.yearInput.fill(year);
    await expect(this.locators.yourDetailsPageText).toBeVisible();
    await this.locators.continueButton.click();
  }

async fillAddress(address: string, postalCode: string, city: string, state: string, country: string) {
  // Wait for and fill address
  await expect(this.locators.searchAddress).toBeVisible();
  await this.locators.searchAddress.fill(address);

  // Fill city
  await expect(this.locators.city).toBeVisible();
  await this.locators.city.fill(city);

  // Fill state
  await expect(this.locators.state).toBeVisible();
  await this.locators.state.fill(state);

  // Fill postal code
  await expect(this.locators.postalCode).toBeVisible();
  await this.locators.postalCode.fill(postalCode);

  // Handle dropdown correctly
  await expect(this.locators.country).toBeVisible();
  await this.locators.country.selectOption(country);

  // Click continue
  await expect(this.locators.continueButton).toBeVisible();
  await this.locators.continueButton.click();
}
 
async fillLocation(add: string) {
  // await this.locators.dropDown.click();
  // await this.locators.countryUK.click();
  // await expect(this.locators.selectLocation).toBeVisible();
  // await this.locators.selectLocation.click();
  // Confirm button if visible
  //  await this.locators.confirmSelectionButton.isVisible()
  //   await this.locators.confirmSelectionButton.click();
  //   if( await this.locators.confirmSelectionButton.isVisible()){
  //   await this.locators.confirmSelectionButton.click();
  //   await this.wait.untilVisible("Continue");}
  // Continue
  await expect(this.locators.continueButton).toBeVisible();
  await this.locators.continueButton.click();
  await this.wait.untilVisible("Every House membership");
}

async verifySelectMembershipTypeStep() {
  await expect(this.locators.everyHouseMemberShipText).toBeVisible();
  await expect(this.locators.localHouseText).toBeVisible();
  await expect(this.locators.chooseYourPaymentTermText).toBeVisible();
  await expect(this.locators.monthlyText).toBeVisible();
  await expect(this.locators.annuallyText).toBeVisible();
  await expect(this.locators.firstPaymentText).toBeVisible();
  await expect(this.locators.continueButton).toBeVisible();
  await this.locators.continueButton.click();
  await this.wait.untilVisible("Upload a valid photo ID");
  // await this.locators.continueButton.click();

console.log("DEBUG: After clicking Continue");
console.log("Current URL:", this.page.url());
console.log("All H1/H2:", await this.page.locator("h1, h2").allInnerTexts());
console.log("All headings:", await this.page.locator("text=Personal").allInnerTexts());

}

// async verifyYourProfilePersonalDetailsStep(countryCode: string, phoneNumber: string, nationality: string, gender: string) {
//   // await this.page.waitForTimeout(2000);
//   // await expect(this.locators.personalDetailsText).toBeVisible();
//   await this.page.getByRole("heading", { name: "Your profile" }).waitFor({ state: "visible" });
//   await expect(this.locators.countryCode).toBeVisible();
//   await this.locators.countryCode.selectOption(countryCode);
//   await expect(this.locators.phoneNumber).toBeVisible();
//   await this.locators.phoneNumber.fill(phoneNumber);

//   await expect(this.locators.nationality).toBeVisible();
//   await this.locators.nationality.selectOption(nationality);
//   await expect(this.locators.gender).toBeVisible();
//   await this.locators.gender.selectOption(gender);
  
//   // Upload face/headshot image
//   const headshotInput = this.page.locator('input#headshot');
//   await headshotInput.setInputFiles('tests/testData/facephoto.png');
//   // Upload valid ID image (2nd file input)
//   const idUploadInput = this.page.locator('input#identification');
//   await idUploadInput.setInputFiles('tests/testData/valid_PhotoID.jpg');
//   await expect(this.locators.continueButton).toBeVisible();
//    await this.locators.continueButton.click();
//   //  await delay(5000);
//   //  await this.page.waitForTimeout(10000);
//   //  await expect(this.page.getByText('Where do you work')).toBeVisible();
 
// }

// async verifyYourProfilePersonalDetailsStep(
//   countryCode: string,
//   phoneNumber: string,
//   nationality: string,
//   gender: string
// ) {
//   // Wait for page heading to appear
//   await this.page.getByRole("heading", { name: "Your profile" })
//     .waitFor({ state: "visible" });

//   // Fill form
//   await this.locators.countryCode.selectOption(countryCode);
//   await this.locators.phoneNumber.fill(phoneNumber);
//   await this.locators.nationality.selectOption(nationality);
//   await this.locators.gender.selectOption(gender);

//   // Upload files
//   const headshotInput = this.page.locator('input#headshot');
//   await headshotInput.setInputFiles('tests/testData/facephoto.png');

//   const idUploadInput = this.page.locator('input#identification');
//   await idUploadInput.setInputFiles('tests/testData/valid_PhotoID.jpg');

//   // *** Combine Continue click + PATCH wait ***
//   const membershipTypeEndpoint = '/profiles/communication_preferences/me';

//   const [patchRequest, patchResponse] = await Promise.all([
//     this.page.waitForRequest(
//       r => r.url().includes(membershipTypeEndpoint) && r.method() === "PATCH"
//     ),
//     this.page.waitForResponse(
//       r => r.url().includes(membershipTypeEndpoint) && r.request().method() === "PATCH"
//     ),
//     this.locators.continueButton.click(),
//   ]);
//  console.log("your pofile step1 request data:", patchRequest.postDataJSON());
//   console.log("PATCH Status:", patchResponse.status());
//   console.log("PATCH Response:", await patchResponse.json());

//   // Ensure navigation / next screen loads
//   await this.page.waitForLoadState("domcontentloaded");
// }


// async verifyYourProfilePersonalDetailsStep(
//   countryCode: string,
//   phoneNumber: string,
//   nationality: string,
//   gender: string
// ) {
//   await this.page.getByRole("heading", { name: "Your profile" })
//     .waitFor({ state: "visible" });

//   await this.locators.countryCode.selectOption(countryCode);
//   await this.locators.phoneNumber.fill(phoneNumber);
//   await this.locators.nationality.selectOption(nationality);
//   await this.locators.gender.selectOption(gender);

//   const headshotInput = this.page.locator('input#headshot');
//   await headshotInput.setInputFiles('tests/testData/facephoto.png');

//   const idUploadInput = this.page.locator('input#identification');
//   await idUploadInput.setInputFiles('tests/testData/valid_PhotoID.jpg');

//   await this.locators.continueButton.click();
  
// const patch = await this.page.waitForResponse(r =>
//   r.url().includes("/attachments/") &&
//   r.request().method() === "PATCH"
// );

// console.log("Actual PATCH URL:", patch.url());
// console.log("Actual PATCH Status:", patch.status());
// console.log("Actual PATCH Response JSON:", await patch.json());

// if (patch.url().includes("/applications/applications/")) {
//   throw new Error("Backend returned malformed PATCH URL: " + patch.url());
// }
// }



// async verifyYourProfilePersonalDetailsStep2(businessName: string, natureOfBusiness: string, occupation: string, workEmail: string) {

//   // await expect(this.page.getByText('Where do you work')).toBeVisible();

//    //Handle dropdown correctly
//   await expect(this.locators.businessName).toBeVisible();
//   await this.locators.businessName.fill(businessName);
//   await expect(this.locators.natureOfBusiness).toBeVisible();
//   await this.locators.natureOfBusiness.fill(natureOfBusiness);

//   await expect(this.locators.occupation).toBeVisible();
//   await this.locators.occupation.selectOption(occupation);

//   await expect(this.locators.workEmail).toBeVisible();
//   await this.locators.workEmail.fill(workEmail);

//   await this.locators.continueButton.click();
// }

// // ========== STEP 1: PERSONAL DETAILS (with PATCH assertion) ==========
// async verifyYourProfilePersonalDetailsStep(
//   countryCode: string,
//   phoneNumber: string,
//   nationality: string,
//   gender: string
// ) {
//   await this.page.getByRole("heading", { name: "Your profile" })
//     .waitFor({ state: "visible" });

//   await this.locators.countryCode.selectOption(countryCode);
//   await this.locators.phoneNumber.fill(phoneNumber);
//   await this.locators.nationality.selectOption(nationality);
//   await this.locators.gender.selectOption(gender);

//   const headshotInput = this.page.locator('input#headshot');
//   await headshotInput.setInputFiles('tests/testData/facephoto.png');

//   const idUploadInput = this.page.locator('input#identification');
//   await idUploadInput.setInputFiles('tests/testData/valid_PhotoID.jpg');

//   await this.locators.continueButton.click();

//   // Wait for PATCH request
//   const patch = await this.page.waitForResponse(r =>
//     r.url().includes("/attachments/") &&
//     r.request().method() === "PATCH"
//   );

//   console.log("PATCH URL:", patch.url());
//   console.log("PATCH Status:", patch.status());
//   console.log("PATCH JSON:", await patch.json());

//   // Assertion for bug (wrong URL)
//   if (patch.url().includes("/applications/applications/")) {
//     throw new Error(
//       "Backend returned PATCH URL → " + patch.url()
//     );
//   }

//   // Optional strong assertion
//   expect(patch.url()).not.toContain("/applications/applications/");
// }



// // ========== STEP 2: BUSINESS DETAILS ==========
// async verifyYourProfilePersonalDetailsStep2(
//   businessName: string,
//   natureOfBusiness: string,
//   occupation: string,
//   workEmail: string
// ) {

//   await expect(this.locators.businessName).toBeVisible();
//   await this.locators.businessName.fill(businessName);

//   await expect(this.locators.natureOfBusiness).toBeVisible();
//   await this.locators.natureOfBusiness.fill(natureOfBusiness);

//   await expect(this.locators.occupation).toBeVisible();
//   await this.locators.occupation.selectOption(occupation);

//   await expect(this.locators.workEmail).toBeVisible();
//   await this.locators.workEmail.fill(workEmail);

//   await this.locators.continueButton.click();
// }
async verifyYourProfilePersonalDetailsStep(
  countryCode: string,
  phoneNumber: string,
  nationality: string,
  gender: string
) {
  await this.page.getByRole("heading", { name: "Your profile" })
    .waitFor({ state: "visible" });

  await this.locators.countryCode.selectOption(countryCode);
  await this.locators.phoneNumber.fill(phoneNumber);
  await this.locators.nationality.selectOption(nationality);
  await this.locators.gender.selectOption(gender);

  await this.page.locator('#headshot').setInputFiles('tests/testData/facephoto.png');
  await this.page.locator('#identification').setInputFiles('tests/testData/valid_PhotoID.jpg');

  await this.locators.continueButton.click();

  // STEP CHANGE HERE — URL does NOT change
  await Promise.race([
     await this.page.getByRole('textbox', { name: 'Where do you work' })
    // this.page.getByText("Your work").waitFor({ timeout: 20000 }),
    // this.page.getByText("Where do you work").waitFor({ timeout: 20000 }),
    // this.page.waitForSelector('[data-cy="businessName"]', { timeout: 20000 })
  ]);
}




// async verifyYourProfilePersonalDetailsStep(
//   countryCode: string,
//   phoneNumber: string,
//   nationality: string,
//   gender: string
// ) {
//   await this.page.getByRole("heading", { name: "Your profile" }).waitFor({ state: "visible" });

//   await this.locators.countryCode.selectOption(countryCode);
//   await this.locators.phoneNumber.fill(phoneNumber);
//   await this.locators.nationality.selectOption(nationality);
//   await this.locators.gender.selectOption(gender);

//   // Upload headshot and ID
//   await this.page.locator('input#headshot').setInputFiles('tests/testData/facephoto.png');
//   await this.page.locator('input#identification').setInputFiles('tests/testData/valid_PhotoID.jpg');

//   await this.locators.continueButton.click();
//   //  await this.wait.untilVisible("Where do you work");
//   //  await this.wait.untilVisible("label[for='businessName']");
//   // await this.page.waitForSelector("[data-cy='businessName']", { timeout: 30000 });
//   // await this.wait.untilVisible("label[for='businessName']");
//   // Wait until the correct page step loads
// // await this.wait.untilVisible("Your work");

// // Now wait for the businessName input to appear
// // await this.wait.untilVisible("[data-cy='businessName']");



//   // await delay(5000);
// // await expect(this.page.getByText('Where do you work')).toBeVisible();
//   // Wait for both attachment PATCH requests
//   const attachments = await Promise.all([
//     this.page.waitForResponse(r => r.url().includes("/attachments/") && r.request().method() === "PATCH"),
//     this.page.waitForResponse(r => r.url().includes("/attachments/") && r.request().method() === "PATCH")
//   ]);

//   attachments.forEach(async (patch) => {
//     console.log("PATCH URL:", patch.url());
//     console.log("PATCH Status:", patch.status());
//     console.log("PATCH JSON:", await patch.json());

//     // Assert PATCH URL is correct
//     if (!patch.url().includes("/attachments/")) {
//       throw new Error("Invalid PATCH URL → " + patch.url());
//     }
//   });
// }

// ========== STEP 2: BUSINESS DETAILS ==========
async verifyYourProfilePersonalDetailsStep2(
  businessName: string,
  natureOfBusiness: string,
  occupation: string,
  workEmail: string
) {
  await this.page.getByRole("heading", { name: "Your work" }).waitFor({ state: "visible" });
  await this.locators.businessName.fill(businessName);
  await this.locators.natureOfBusiness.fill(natureOfBusiness);
  await this.locators.occupation.selectOption(occupation);
  await this.locators.workEmail.fill(workEmail);

  await this.locators.continueButton.click();
}


}
