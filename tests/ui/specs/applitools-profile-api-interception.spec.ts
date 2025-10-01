import { test, type Page, type BrowserContext } from "@playwright/test";
import ProfilePage from "../pages/profile-page";
import apiPaths from "../../utils/apiPaths";
import pages from "../../utils/pages";
import dotenv from "dotenv";
import {
  BatchInfo,
  Configuration,
  EyesRunner,
  VisualGridRunner,
  BrowserType,
  DeviceName,
  ScreenOrientation,
  Eyes,
  Target,
} from "@applitools/eyes-playwright";

export const USE_ULTRAFAST_GRID: boolean = true;
export let Batch: BatchInfo;
export let Config: Configuration;
export let Runner: EyesRunner;
let eyes: Eyes;
let profilePage: ProfilePage;
dotenv.config();

test.beforeAll(async () => {
  Runner = new VisualGridRunner({ testConcurrency: 1 });
  const runnerName = "Ultrafast Grid";
  Batch = new BatchInfo({ name: `Book Store - New Tab - ${runnerName}` });

  Config = new Configuration();

  Config.setBatch(Batch);
  Config.addBrowser(1920, 1080, BrowserType.CHROME);
});

test.beforeEach(async ({ page }) => {
  eyes = new Eyes(Runner, Config);
  await eyes.open(page, "Book Store Profile", test.info().title, {
    width: 1920,
    height: 1080,
  });

  await page.goto(pages.profile);
  profilePage = new ProfilePage(page);
});

test.afterEach(async () => {
  await eyes.close();
});

test.afterAll(async () => {
  const results = await Runner.getAllTestResults();
  console.log("Visual test results", results);
});

test.describe("Profile - API Interception", () => {
  test("Sort books", async ({ page, context }) => {
    await watchAPICallAndMockResponse(page, context);
    await profilePage.checkBooksList();
    await eyes.check("Profile page", Target.window().layout().fully());
    await profilePage.sortBooksList();
    await profilePage.checkSort();
    await eyes.check("Profile page", Target.window().layout().fully());
  });
});

async function watchAPICallAndMockResponse(
  page: Page,
  context: BrowserContext
) {
  await profilePage.mockBooksListResponse(context);
  const [response] = await Promise.all([
    page.waitForResponse(new RegExp(apiPaths.account)),
    await page.reload(),
  ]);
  await response.json();
}
