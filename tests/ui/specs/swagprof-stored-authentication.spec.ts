import { test as setup, expect } from "@playwright/test";
import ProfilePage from "../pages/profile-page";
import SwagLoginPage from "../pages/swagprof-login-page";

let profile: ProfilePage;

setup.beforeEach(async ({ page }) => {
  await page.goto("https://www.saucedemo.com/inventory.html");
  //profile = new SwagLoginPage(page);
});

setup.describe.only("Profile - Stored Auth", () => {
  setup("Check logged in", async ({ page }) => {
    await expect(page.url()).toEqual(
      "https://www.saucedemo.com/inventory.html"
    );
  });
});
