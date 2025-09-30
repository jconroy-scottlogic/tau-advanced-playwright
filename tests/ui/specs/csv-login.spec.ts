import { test } from "@playwright/test";
import { parse } from "csv-parse/sync";
import fs from "fs";
import path from "path";
import LoginPage from "../pages/login-page";
import pages from "../../utils/pages";
import userData from "../../data/user-data";

let loginPage: LoginPage;

const records = parse(
  fs.readFileSync(path.join(__dirname, "../../data/login-data.csv")),
  {
    columns: true,
    skip_empty_lines: true,
  }
);
test.use({ storageState: { cookies: [], origins: [] } }); // doesn't share the logged in session
// test.use({ storageState: undefined }); // https://github.com/microsoft/playwright/issues/17396
test.describe.configure({ mode: "serial" });

test.beforeEach(async ({ page }) => {
  await page.goto(pages.loginPage);
  loginPage = new LoginPage(page);
});

test.describe("Book Store - Login", () => {
  {
    test(`successfull login ${records[0].userName} ${records[0].password} `, async () => {
      await loginPage.doLogin(records[0].userName, records[0].password);
      await loginPage.checkLoggedIn();
    });

    test(`failing login - invalid username ${records[1].userName} ${records[1].password}`, async () => {
      await loginPage.doLogin(records[1].userName, records[1].password);
      await loginPage.checkInvalidCredentials();
    });

    test(`failing login - invalid password ${records[2].userName} ${records[2].password}`, async () => {
      await loginPage.doLogin(records[2].userName, records[2].password);
      await loginPage.checkInvalidCredentials();
    });
  }
});
