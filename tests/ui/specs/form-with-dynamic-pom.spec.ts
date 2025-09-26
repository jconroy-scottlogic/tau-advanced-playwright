import { test } from "@playwright/test";
import FormPage from "../pages/form-page";
import hooks from "../../utils/hooks";
import pages from "../../utils/pages";

let formPage: FormPage;

test.beforeEach(async ({ page }) => {
  formPage = await hooks.beforeEach(page, FormPage, pages.form);
});

test.describe("Form - Dynamic Page Object Model", () => {
  test("Assert form is submitted", async () => {
    await formPage.submitForm();
  });
});
