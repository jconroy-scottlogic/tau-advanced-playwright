import { chromium, firefox, FullConfig, webkit } from "@playwright/test";
import SwagLoginPage from "../ui/pages/swagprof-login-page";
import uiPages from "../utils/uiPages";

async function swagGlobalSetup(config: FullConfig) {
  const user = "standard_user";
  const password = "secret_sauce";
  const { storageState } = config.projects[0].use;
  const browser = await chromium.launch({ headless: false, timeout: 10000 });
  const page = await browser.newPage();
  const loginPage = new SwagLoginPage(page);

  await page.goto("https://www.saucedemo.com/");
  await loginPage.doLogin(user, password);
  await loginPage.checkLoggedIn();
  await page.context().storageState({ path: storageState as string });
  await browser.close();
}

export default swagGlobalSetup;

// https://playwright.dev/docs/test-global-setup-teardown#capturing-trace-of-failures-during-global-setup
// https://playwright.dev/docs/trace-viewer
