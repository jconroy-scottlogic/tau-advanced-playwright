import { test } from "@playwright/test";
import SwagLoginPage from "../../pages/swagprof-login-page";

const userName = "standard_user";
const password = "secret_sauce";

test.use({ storageState: { cookies: [], origins: [] } });
test.describe.configure({ mode: "serial" });
let loginPage: SwagLoginPage;

test.beforeEach(async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  loginPage = new SwagLoginPage(page);
});
test("Swag Labs - login", async () => {
  await loginPage.doLogin(userName, password);
  await loginPage.checkLoggedIn();
});
