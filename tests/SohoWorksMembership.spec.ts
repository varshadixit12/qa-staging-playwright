import { test, expect } from '@playwright/test';
import { SohoWorksPage } from '../page/SohoWorksMembership';
import ReportLog from '../Utility/Report';

test('Full API validation for SohoWorks member application', async ({ page }) => {

  const SohoWorkPage = new SohoWorksPage(page);

  
  // sw_apply (GET)
  
  const [applyReq, applyRes] = await Promise.all([
    page.waitForRequest(req => req.url().includes("sw_apply") && req.method() === "GET"),
    page.waitForResponse(res => res.url().includes("sw_apply") && res.request().method() === "GET"),
    page.goto("https://apf-master.staging.sohohousedigital.com/sohoworks/en/sw_apply")
  ]);

  expect(applyRes.status()).toBe(200);
  console.log("sw_apply API OK");

  const applyReqData = applyReq.postDataJSON();
  console.log('apply Payload:', applyReqData);
  const applyResponseJson = await applyRes.text();
  console.log('apply Response status:', applyRes.status());
  console.log('apply Response:', applyResponseJson);
  
  expect([200]).toContain(applyRes.status());
   const uiTitle = await page.title();
   console.log("UI title "+uiTitle);
   expect(uiTitle).toContain("Soho Works Application Form");
   expect(applyResponseJson).toContain(uiTitle);

// sw_non_member (GET)

  const [nonMemberReq, nonMemberRes] = await Promise.all([
    page.waitForRequest(req => req.url().includes("sw_non_member") && req.method() === "GET"),
    page.waitForResponse(res => res.url().includes("sw_non_member") && res.request().method() === "GET"),
    SohoWorkPage.clicksw_non_member(),
  ]);
  await ReportLog.addStep("Click on I am Not A Soho House Member");

  await page.goto("https://apf-master.staging.sohohousedigital.com/sohoworks/en/sw_non_member");

  expect(nonMemberRes.status()).toBe(200);
  console.log("sw_non_member API OK");
   

// -------- Response Body Handling --------


let bodyText;
try {
  bodyText = await nonMemberRes.text();   // SAFEST
  console.log("non Member Response Body:", bodyText);
} catch {
  console.log("Unable to read response body (streamed or empty)");
}

// Status Assertion
   console.log("non Member Response status:", nonMemberRes.status());
   expect(nonMemberRes.status()).toBe(200);
   const uiTitle1 = await page.title();
   console.log("UI title1 "+uiTitle1);
   expect(uiTitle1).toContain("Soho Works Application Form");
   expect(bodyText).toContain(uiTitle1);


  // Application Form Submit (POST)
  

  const formSubmitEndpoint = "sw_non_member";
  const fillAll = async () => {
  await SohoWorkPage.fillDOB('11','10','2001');
  await SohoWorkPage.fillApplicationForm(
    'test', 'testing', 'abc@shohouse.com', 'Female',
    'London, 180 The Strand', 'Lounge Local', 'testing',
    'Architecture', '1234567894'
  );
};

  const [submitReq, submitRes] = await Promise.all([
  
  page.waitForRequest(req =>
    req.url().startsWith("https://apf-master.staging.sohohousedigital.com/sohoworks/en/sw_non_member") &&
    req.method() === "POST"
  ),
  page.waitForResponse(res =>
    res.url().startsWith("https://apf-master.staging.sohohousedigital.com/sohoworks/en/sw_non_member") &&
    res.request().method() === "POST"
  ),
  fillAll()
]);

await ReportLog.addStep("Fill Application Form");


  const submitReqData = submitReq.postDataJSON();
  console.log('submit Req Payload:', submitReqData);
  // const submitResJson = await submitRes.text();
  console.log('submit Response status:', submitRes.status());
  // console.log('submit Response:', submitResJson);
  const headers = submitRes.headers();
  console.log("FINAL Response Headers:", headers);
  const redirectLocation = headers["location"];
  console.log("Redirect Location:", redirectLocation);

  expect(submitRes.status()).toBe(302);
  expect(redirectLocation).toContain("https://apf-master.staging.sohohousedigital.com/sohoworks/en/sw_apply_outro");

await ReportLog.addStep("Redirect Thank you for your Application");

});

