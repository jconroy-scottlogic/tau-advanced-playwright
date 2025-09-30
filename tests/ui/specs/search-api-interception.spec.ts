import { test, type Page, type BrowserContext } from "@playwright/test";
import BookSearchPage from "../pages/booksearch-page";
import apiPaths from "../../utils/apiPaths";
import pages from "../../utils/pages";

let listPage: BookSearchPage;

test.beforeEach(async ({ page }) => {
  await page.goto(pages.books);
  listPage = new BookSearchPage(page);
});

test.describe("Profile - API Interception", () => {
  test("Search books", async ({ page, context }) => {
    await listPage.searchOneBook();
    await watchAPICallAndMockResponse(page, context);
    await listPage.assertInterceptSearchNumber();
  });
});

async function watchAPICallAndMockResponse(
  page: Page,
  context: BrowserContext
) {
  await listPage.mockBooksListResponse(context);
  const [response] = await Promise.all([
    page.waitForResponse(new RegExp(apiPaths.books)),
    await page.reload(),
  ]);
  await response.json();
}
