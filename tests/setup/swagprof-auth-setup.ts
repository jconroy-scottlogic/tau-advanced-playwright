import { test as setup } from "@playwright/test";
import SwagLoginPage from "../ui/pages/swagprof-login-page";

// const authFile = "playwright/.auth/user.json";
// const adminFile = ".auth/admin.json";

// setup("authenticate as admin", async ({ page }) => {
//   const user = "problem_user";
//   const password = "secret_sauce";
//   await doLogin(page, user, password);

//   await page.context().storageState({ path: adminFile });
// });

// const userFile = ".auth/user.json";

// setup("authenticate as user", async ({ page }) => {
//   const user = "standard_user";
//   const password = "secret_sauce";
//   await doLogin(page, user, password);
//   await page.context().storageState({ path: userFile });
// });

// async function doLogin(page: Page, user: string, password: string) {
//   //const baseURL = setup.info().project.use.baseURL!;
//   const loginPage = new SwagLoginPage(page);

//   await page.goto("https://www.saucedemo.com/");
//   await loginPage.doLogin(user, password);
//   await page.waitForURL("https://www.saucedemo.com/inventory.html");
//   await loginPage.checkLoggedIn();
// }
// setup("authenticate", async ({ request }) => {
//   // Send authentication request. Replace with your own.
//   await request.post("https://www.saucedemo.com/", {
//     form: {
//       user: "user",
//       password: "password",
//     },
//   });
//   await request.storageState({ path: authFile });
// });
