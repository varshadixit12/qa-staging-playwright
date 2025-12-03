import { test, expect } from '@playwright/test';
import { MembershipPage } from '../page/Membershipcard';
import { ApiHelper } from '../Utility/apiHelper';
test('Login and apply for membership - Check API Call', async ({ page }) => {
  const membershipPage = new MembershipPage(page);
  
  // 1. Navigate to the login page
  await page.goto('https://master.identity.staging.sohohousedigital.com/sessions/new?client_id=c5b656450b07b5cb9540b5b9de133c76249f71b737ec100d1989047568cbc7be&prefers_password=true');

  // --- API CHECK START ---
  const api = new ApiHelper(page);
  const loginPostEndpointPattern = '/sessions'; 
  const expectedMethod = 'POST'; 
  
   const userEmail = 'test_membershipcard@sohohouse.com';
   const userPassword = 'password';
   const day = '11';
   const month ='10';
   const year= '2000';
   const formattedDOB = `${year}-${month}-${day}`;

  const [request, response] = await Promise.all([
    // A. Start waiting for the POST request that sends credentials
    page.waitForRequest(req => 
      req.url().includes(loginPostEndpointPattern) && 
      req.method() === expectedMethod
    ),
    
    // B. Start waiting for the server's response to the POST request
    page.waitForResponse(resp => 
      resp.url().includes(loginPostEndpointPattern) && 
      resp.request().method() === expectedMethod
    ),
    
    // C. Perform the action that triggers the API call (the login)
    membershipPage.login(userEmail, userPassword),
  ]);

  // 1. Inspect and Assert the Request Payload (Check data sent by the form)
  const requestPostData = request.postDataJSON(); 
  console.log('API Request Payload (JSON):', requestPostData);

  // Assertions on the request data:
  expect(requestPostData['session[email]']).toBe(userEmail);
  expect(requestPostData['session[password]']).toBe(userPassword);

  // 2. Assert the API Response Status
  console.log(`Captured API Response Status: ${response.status()}`);
   await expect(response.status()).toBe(302); 
  
  // 3. Inspect the Response Headers (Redirect Location)
  const locationHeader = response.headers().location;
  console.log('Response Location Header (Redirect Target):', locationHeader);
  
  // Assert that the redirect is pointing to a sensible location
  expect(locationHeader).toMatch("https://master.identity.staging.sohohousedigital.com/me"); 
 
  // --- API CHECK END ---

  // 4. Continue with the rest of your test steps, which now verifies the next page load
  await membershipPage.navigateToMembershipForm();
  
  await membershipPage.applyMembership();
  
   await page.goto('https://master.dih.staging.sohohousedigital.com/apply/125ca3d0-2f54-4468-9abf-f38e390bcf31/package');
  // DOB API validation
  const dobEndpoint = '/accounts/me';
  await page.waitForTimeout(2000); 
  const [dobRequest, dobResponse] = await Promise.all([
    page.waitForRequest(req => req.url().includes(dobEndpoint) && req.method() === 'PATCH'),
    page.waitForResponse(res => res.url().includes(dobEndpoint) && res.request().method() === 'PATCH'),
    membershipPage.fillDOB(day, month, year),
  ]);
   const dobData = dobRequest.postDataJSON();
  console.log('DOB Payload:', dobData);
  const dobResponseJson = await dobResponse.json();
  console.log('DOB Response status:', dobResponse.status());
  console.log('DOB Response:', dobResponseJson);
  
  expect(dobData).toHaveProperty('data.attributes.date_of_birth');
  expect(dobData.data.attributes.date_of_birth).toBe(formattedDOB);
  
  expect([200, 204]).toContain(dobResponse.status());

// Address API validation
const addressEndpoint = '/accounts/me';
await page.waitForTimeout(2000);
const [addressRequest, addressResponse] = await Promise.all([
  page.waitForRequest(req => req.url().includes(addressEndpoint) && req.method() === 'PATCH'),
  page.waitForResponse(res => res.url().includes(addressEndpoint) && res.request().method() === 'PATCH'),
  membershipPage.fillAddress('95,Harley St', 'W1G 8PP', 'London', 'Greater London', 'GB'),
]);

const addressData = addressRequest.postDataJSON();
console.log('Address Payload:', addressData);
console.log('Address Response status:', addressResponse.status());
const addressResponseJson = await addressResponse.json();
console.log('Address Response:', addressResponseJson);

// Assertions
expect(addressData).toHaveProperty('data.attributes.address');
expect(addressData.data.attributes.address.lines[0]).toBe('95,Harley St');
expect(addressData.data.attributes.address.postal_code).toBe('W1G 8PP');
expect(addressData.data.attributes.address.locality).toBe('London');
expect(addressData.data.attributes.address.state).toBe('');
expect(addressData.data.attributes.address.country_code).toBe('GB');

expect([200]).toContain(addressResponse.status());

// //Select Location
const selectLocationEndpoint = '/applications/applications/125ca3d0-2f54-4468-9abf-f38e390bcf31/relationships/product'; 
 await page.waitForTimeout(3000);
const [selectLocationRequest, selectLocationResponse] = await Promise.all([
  page.waitForRequest(req => req.url().includes(selectLocationEndpoint) && req.method() === 'PATCH'),
  page.waitForResponse(res => res.url().includes(selectLocationEndpoint) && res.request().method() === 'PATCH'),
  membershipPage.fillLocation('180 House'),
]);

const selectLocationData = selectLocationRequest.postDataJSON();
console.log('Location Payload:', selectLocationData);
console.log('Location Response status:', selectLocationResponse.status());
const selectLocationResponseJson = await selectLocationResponse.json();
console.log('Location Response:', selectLocationResponseJson);

expect(selectLocationResponse.status()).toBe(200);

// Select MembershipType
const selectMembershipTypeEndpoint = '/applications/applications/125ca3d0-2f54-4468-9abf-f38e390bcf31/relationships/product';

const [selectMembershipTypeRequest, selectMembershipTypeResponse] = await Promise.all([
  page.waitForRequest(req =>
    req.url().includes(selectMembershipTypeEndpoint) && req.method() === 'PATCH'
  ),
  page.waitForResponse(res =>
    res.url().includes(selectMembershipTypeEndpoint) && res.request().method() === 'PATCH'
  ),

  // ACTION TRIGGERING PATCH
  membershipPage.verifySelectMembershipTypeStep(),
]);

const selectMembershipTypeRequestData = selectMembershipTypeRequest.postDataJSON();
console.log('Select MembershipType Payload:', selectMembershipTypeRequestData);

console.log('Select MembershipType Response Status:', selectMembershipTypeResponse.status());
const selectMembershipTypeResponseJson = await selectMembershipTypeResponse.json();
console.log('Select MembershipType Response:', selectMembershipTypeResponseJson);

// // Your Profile




// Your Profile
const profileEndpoint = '/profiles/communication_preferences/me';

// Start request + response watchers BEFORE performing UI actions
const profileRequestPromise = page.waitForRequest(req =>
  req.url().includes(profileEndpoint) &&
  ['PATCH', 'POST', 'PUT', 'GET'].includes(req.method())
);

const profileResponsePromise = page.waitForResponse(res =>
  res.url().includes(profileEndpoint) &&
  ['PATCH', 'POST', 'PUT', 'GET'].includes(res.request().method())
);

// Now perform your UI action safely
await membershipPage.verifyYourProfilePersonalDetailsStep(
  '+44 (United Kingdom)',
  '123454577',
  'British',
  'Female'
);

// NOW await the network results
const profileRequest = await profileRequestPromise;
const profileResponse = await profileResponsePromise;

// Extract request payload
let profileData = null;
try {
  profileData = profileRequest.postDataJSON();
} catch (e) {
  console.log('⚠ No JSON payload (maybe GET request)');
}

console.log('Profile Payload:', profileData);
console.log('Profile Response Status:', profileResponse.status());

const profileResponseJson = await profileResponse.json();
console.log('Profile Response:', profileResponseJson);



// // // Your Profile step2 
// const yourProfileEndpoint = 'applications/applications/01666c98-281a-4e47-ad74-3c756ccb6ea2';

// const [yourProfileRequest, yourProfileResponse] = await Promise.all([
//   page.waitForRequest(req =>
//     req.url().includes(yourProfileEndpoint) && ['PATCH', 'POST', 'PUT', 'GET'].includes(req.method())
//   ),
//   page.waitForResponse(res =>
//     res.url().includes(yourProfileEndpoint) && ['PATCH', 'POST', 'PUT', 'GET'].includes(res.request().method())
//   ),
//   // Trigger UI action that causes API call
//   membershipPage.verifyYourProfilePersonalDetailsStep2('testing','Architecture','Accessory Designer','abc@gamil.com'),
// ]);

// const yourProfileRequestData = yourProfileRequest.postDataJSON();
//   console.log('your Profile Payload:', yourProfileRequestData);
//   console.log('your Profile Status:', yourProfileResponse.status());
//   const yourProfileResponseJson = await yourProfileResponse.json();
// console.log('your Profile Response:', yourProfileResponseJson);
  

// Profile Step 2 (UI only)
  await membershipPage.verifyYourProfilePersonalDetailsStep2(
    'testing',
    'Architecture',
    'Accessory Designer',
    'abc@gamil.com'
  );



});







