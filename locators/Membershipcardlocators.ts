import { Page, Locator } from '@playwright/test';

export class MembershipPageLocators {
  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly continueButton: Locator;
  readonly sohoHouseLink: Locator;
  readonly profile: Locator;
  readonly changePassword: Locator;
  readonly Preferences: Locator;
  readonly membershipApplication: Locator;
  readonly signOut: Locator;
  readonly rejectButton: Locator;
  readonly joinButton: Locator;
  readonly applyMembershipButton: Locator;
  readonly dayInput: Locator;
  readonly monthInput: Locator;
  readonly yearInput: Locator;
  readonly yourDetailsPageText: Locator;
  readonly searchAddress: Locator;
  readonly postalCode: Locator;
  readonly city: Locator;
  readonly state: Locator;
  readonly country: Locator;
  readonly dropDown: Locator;
  readonly selectLocation:Locator;
  readonly confirmSelectionButton:Locator;
  readonly everyHouseMemberShipText:Locator;
  readonly localHouseText:Locator;
  readonly chooseYourPaymentTermText:Locator;
  readonly monthlyText:Locator;
  readonly annuallyText:Locator;
  readonly firstPaymentText:Locator;
  readonly mobileNumberText:Locator;
  readonly personalDetailsText:Locator;
  readonly selectPhoto:Locator;
  readonly countryCode: Locator;
  readonly phoneNumber: Locator;
  readonly nationality: Locator;
  readonly gender: Locator;
  readonly businessName: Locator;
  readonly natureOfBusiness: Locator;
  readonly occupation: Locator;
  readonly workEmail: Locator;
  readonly countryUK:Locator;

  constructor(page: Page) {
    this.emailField = page.locator('#session_email');
    this.passwordField = page.locator('#session_password');
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.sohoHouseLink = page.getByRole('link', { name: 'Soho House' });
    this.profile = page.locator("(//div[@class='navigation__profile-container'])");
    this.changePassword= page.locator("//span[contains(text(),'Change password')]")
    this.Preferences= page.locator("//span[contains(text(),'Preferences')]")
    this.membershipApplication= page.locator("//span[contains(text(),'Membership application')]")
    this.signOut= page.locator("//span[contains(text(),'Sign out')]")
    this.rejectButton = page.locator('text=Reject');
    this.joinButton = page.locator("//a[contains(text(), 'Join')]");
    this.applyMembershipButton = page.locator("(//a[contains(text(), 'Apply for membership')])[1]");
    this.dayInput = page.locator('[data-cy="Day"]');
    this.monthInput = page.locator('[data-cy="Month"]');
    this.yearInput = page.locator('[data-cy="Year"]');
    this.yourDetailsPageText = page.locator("//span[contains(text(),'Under 27 membership')]");
    this.searchAddress =page.locator('[data-cy="place"]');
    this.city =page.locator('[data-cy="town"]');
    this.dropDown = page.locator("div[class='ds__iconWrapper ds__iconWrapper--xsmall ds__iconWrapper--clickable ds__menuLabel__icon']");
    this.countryUK= page.locator("(//div//div[contains(text(),'UK')])[2]")
    //this.selectLocation = page.locator("//div[@class='ds__menuLabel__menuBar']");
    this.selectLocation =  page.locator('[data-cy="venue-180_HOUSE"]').nth(1);
    this.postalCode = page.locator('[data-cy="postcode"]');
    this.state = page.locator('[data-cy="state"]');
    this.country = page.locator('[data-cy="country"]');
    this.confirmSelectionButton = page.getByRole('button', { name: 'Confirm selection' });
    this.everyHouseMemberShipText=page.locator("//div//span[contains(text(),'Every House membership')]");
    this.localHouseText=page.locator("//div//span[contains(text(),'Local House')]");
    this.chooseYourPaymentTermText=page.locator("//div//span[contains(text(),'Choose your payment term')]");
    this.monthlyText=page.locator("//div//div[contains(text(),'Monthly')]");
    this.annuallyText=page.locator("//div//div[contains(text(),'Annually')]");
    this.firstPaymentText=page.locator("//div//span[contains(text(),'First Payment:')]");
    this.mobileNumberText=page.locator("//label[contains(text(),'Mobile number')]");
    this.personalDetailsText=page.locator("//div[contains(text(),'Personal details')]");
    this.selectPhoto=page.locator("(//div//label[contains(text(),'Choose image')])[1]")
    this.countryCode = page.locator('[data-cy="countryCode"]');
    this.phoneNumber = page.locator('[data-cy="phoneNumber"]');
    this.nationality = page.locator('[data-cy="nationality"]');
    this.gender = page.locator('[data-cy="gender"]');
    this.businessName = page.locator('[data-cy="businessName"]');
    this.natureOfBusiness = page.locator('[data-cy="natureOfBusiness"]');
    this.occupation = page.locator('[data-cy="occupation"]');
    this.workEmail = page.locator('[data-cy="workEmail"]');
 

    
  }
}
