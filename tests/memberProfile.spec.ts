import { test, expect } from '@playwright/test';
import { MembershipPage } from '../page/Membershipcard';

test('Login and apply for membership - Check API Call', async ({ page }) => {
  const membershipPage = new MembershipPage(page);
  
  // 1. Navigate to the login page
  await page.goto('https://master.identity.staging.sohohousedigital.com/sessions/new?client_id=c5b656450b07b5cb9540b5b9de133c76249f71b737ec100d1989047568cbc7be&prefers_password=true');

  // --- API CHECK START ---
  
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

   await membershipPage.navigateToMembershipForm();
   await membershipPage.clickOnProfile();

})