import { type Page, type Locator, expect } from "@playwright/test";
import { buildUrl } from "../../utils/uiUrlBuilder";
import pages from "../../utils/pages";

class BookSearchPage {
  readonly page: Page;
  readonly searchBar: Locator;
  readonly isbnLabel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchBar = page.getByRole("textbox", { name: "Type to search" });
    this.isbnLabel = page.locator("#ISBN-wrapper").nth(1);
  }

  async goto(isbn: string) {
    const params = { book: isbn };
    const url = buildUrl(pages.bookStorePage, params);
    await this.page.goto(url);
  }

  async searchOneBook(book: string) {
    await this.searchBar.fill(book);
  }

  async searchMutlipleBooks(Books: string) {
    await this.searchBar.fill(Books);
  }

  async searchNoBook(nobook: string) {
    await this.searchBar.fill(nobook);
  }

  async checkTitle() {
    expect(this.page.getByText("Kyle Simpson")).toBeVisible();
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
