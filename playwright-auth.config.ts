import { defineConfig, devices } from "@playwright/test";
import baseEnvUrl from "./tests/utils/environmentBaseUrl";

require("dotenv").config({ path: "./.env", override: true });

export default defineConfig({
  //   globalSetup: require.resolve('./tests/setup/global-setup'),
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: undefined,
  reporter: "html",
  // timeout: 5000,
  use: {
    // storageState: 'storageState.json',
    trace: "on",
    baseURL:
      process.env.NODE_ENV === "production"
        ? baseEnvUrl.production.home
        : process.env.NODE_ENV === "staging"
        ? baseEnvUrl.staging.home
        : baseEnvUrl.local.home,
  },

  projects: [
    {
      name: "auth-setup",
      testMatch: /auth-setup\.ts/,
    },
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
    {
      name: "chromium-auth",
      use: {
        ...devices["Desktop Chrome"],
        // storageState: '.auth/admin.json', //use this in case you have multiple projects one per user
      },
      dependencies: ["auth-setup"],
    },
  ],
});
