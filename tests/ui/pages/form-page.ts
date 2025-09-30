import {
  type Page,
  type Locator,
  type BrowserContext,
  expect,
  selectors,
} from "@playwright/test";
import { buildUrl } from "../../utils/uiUrlBuilder";
import pages from "../../utils/pages";
import formInfo from "../../data/form-data.ts";
import formData from "../../data/form-data.ts";

class FormPage {
  readonly page: Page;

  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly email: Locator;
  //readonly gender: Locator;
  readonly mobile: Locator;
  readonly submit: Locator;
  readonly formSubmitted: Locator;

  constructor(page: Page) {
    this.page = page;

    this.firstName = page.getByRole("textbox", { name: "First Name" });
    this.lastName = page.getByRole("textbox", { name: "Last Name" });
    this.email = page.getByRole("textbox", { name: "name@example.com" });
    //this.gender = page.getByRole("radio", { name: "Male", exact: true });
    this.mobile = page.getByRole("textbox", { name: "Mobile Number" });
    this.submit = page.locator("#submit");
    this.formSubmitted = page.locator("#example-modal-sizes-title-lg");
  }

  async goto(isbn: string) {
    const params = { book: isbn };
    const url = buildUrl(pages.form, params);
    await this.page.goto(url);
  }

  async fillName() {
    await this.firstName.fill(formData.firstName);
    await this.lastName.fill(formData.lastName);
  }

  async fillEmail() {
    await this.email.fill(formData.email);
  }

  async selectGender() {
    this.page.getByRole("radio", { name: formData.gender, exact: true });
  }

  async fillMobile() {
    await this.mobile.fill(formData.mobileNumber);
  }

  async submitForm() {
    await this.fillName();
    await this.fillEmail();
    await this.selectGender();
    await this.fillMobile();
    await this.submit.click();
    this.page.getByText("Thanks for submitting the form").isVisible;
  }
}

export default FormPage;
