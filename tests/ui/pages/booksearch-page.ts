import { type Page, type Locator, expect } from "@playwright/test";
import { buildUrl } from "../../utils/uiUrlBuilder";
import pages from "../../utils/pages";
import searchData from "../../data/search-data";

class BookSearchPage {
  readonly page: Page;
  readonly searchBar: Locator;
  readonly isbnLabel: Locator;
  readonly bookRow: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchBar = page.getByRole("textbox", { name: "Type to search" });
    this.isbnLabel = page.locator("#ISBN-wrapper").nth(1);
    this.bookRow = page.getByRole("rowgroup");
  }

  async goto(isbn: string) {
    const params = { book: isbn };
    const url = buildUrl(pages.bookStorePage, params);
    await this.page.goto(url);
  }

  async searchOneBook() {
    await this.searchBar.fill(searchData.searchOne);
  }

  async searchMutlipleBooks() {
    await this.searchBar.fill(searchData.searchMulti);
  }

  async searchNoBook() {
    await this.searchBar.fill(searchData.searchNothing);
  }

  async checkTitle() {
    expect(this.page.getByText("Kyle Simpson")).toBeVisible();
  }

  async assertSearchNumber(expectedResult: number) {
    const title = this.bookRow.getByRole("link");
    const resultCount = await title.count();

    expect(resultCount).toEqual(expectedResult);
  }

  async checkMultipleTitles() {
    expect(this.page.getByText("Addy Osmani")).toBeVisible();
    expect(this.page.getByText("Axel Rauschmayer")).toBeVisible();
    expect(this.page.getByText("Eric Elliott")).toBeVisible();
    expect(this.page.getByText("Marijn Haverbeke")).toBeVisible();
  }

  async checkNoResults() {
    expect(this.page.getByText("No rows found")).toBeVisible();
  }
}

export default BookSearchPage;
