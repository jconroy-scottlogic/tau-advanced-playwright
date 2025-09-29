import { test as base } from "@playwright/test";
import SearchPage from "../pages/profile-page";
import hooks from "../../utils/hooks";
import pages from "../../utils/pages";

type MyFixtures = {
  bookPage: SearchPage;
};

export type Duplicate = {
  isDupe: boolean;
};

export const test = base.extend<MyFixtures & Duplicate>({
  isDupe: false,

  bookPage: async ({ page, isDupe }, use) => {
    const bookPage = await hooks.beforeEach(
      page,
      SearchPage,
      pages.bookStorePage
    );

    await use(bookPage);
  },
});

export { expect } from "@playwright/test";
