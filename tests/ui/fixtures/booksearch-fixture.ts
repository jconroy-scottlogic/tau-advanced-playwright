import { test as base } from "@playwright/test";
import BookSearchPage from "../pages/booksearch-page";
import hooks from "../../utils/hooks";
import pages from "../../utils/pages";

type MyFixtures = {
  bookPage: BookSearchPage;
};

export type Duplicate = {
  isDupe: boolean;
};

export const test = base.extend<MyFixtures & Duplicate>({
  isDupe: false,

  bookPage: async ({ page }, use) => {
    const bookPage = await hooks.beforeEach(
      page,
      BookSearchPage,
      pages.bookStorePage
    );

    await use(bookPage);

    //await bookPage.addToYourCollection(isDupe);
  },
});

export { expect } from "@playwright/test";
