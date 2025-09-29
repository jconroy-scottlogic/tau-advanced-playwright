import { test } from "../fixtures/bookadd-fixture";
import { APIRequestContext, expect, Page } from "@playwright/test";
import baseAPIUrl from "../../utils/environmentBaseUrl";
import deleteBookAPIRequest from "../../api/requests/delete-books-collection";
import userData from "../../data/user-data";
import SearchPage from "../../ui/pages/profile-page";
import addBook from "../../api/requests/create-books-collection";

// test.describe.configure({ mode: "serial" });

let apiContext: APIRequestContext;
const env = process.env.ENV!;
const password = process.env.PASSWORD!;
const userId = process.env.USERID!;
const userName = process.env.USERNAME!;
const isbn = "9781449331818";
const isbn2 = "9781449365035";
//const profile: SearchPage;
test.beforeAll(async ({ playwright }) => {
  //apiContext = await playwright.request.newContext({ storageState: 'storageState.json' });
  apiContext = await playwright.request.newContext({
    baseURL: baseAPIUrl.local.api,
    extraHTTPHeaders: {
      // Authorization: `Basic ${apiToken}`,
      Authorization: `Basic ${Buffer.from(`${userName}:${password}`).toString(
        "base64"
      )}`,
      // Authorization: `Basic ${env}`,
      Accept: "application/json",
    },
  });
});

test.describe("Books - Fixture & API", () => {
  // The scope of use is file or describe
  test.use({ isDupe: false });
  test("Delete one book from collection", async ({ page, bookPage }) => {
    //first thing that will happen is to call the fixture automatically. whenever the fixture has a "use" it goes back to the test and then go back to the fixture again when the test is done and execute any remaining commands
    await cleanBooks(userId, page);
    const addResponse = await addBooks(apiContext, userId, isbn);
    await addBooks(apiContext, userId, isbn2);
    const deleteResponse = await deleteOneBook(apiContext, userId, isbn);
    console.log(addResponse);
    console.log(deleteResponse);
    //await bookPage.goto(userData.books.new);
  });

  test("Add brand new book", async ({ page, bookPage }) => {
    //first thing that will happen is to call the fixture automatically. whenever the fixture has a "use" it goes back to the test and then go back to the fixture again when the test is done and execute any remaining commands
    await cleanBooks(userId, page);
    await addBooks(apiContext, userId, isbn);
    await page.goto("https://demoqa.com/profile");
    await assertBook;
    // expect(profile.assertBook());
    //await bookPage.goto(userData.books.new);
  });
});

async function addBooks(
  apiContext: APIRequestContext,
  userId: string,
  isbn: string
) {
  await addBook.addBookToCollection(apiContext, userId, isbn);
  // await page.reload();
}

async function cleanBooks(userId: string, page: Page) {
  await deleteBookAPIRequest.deleteAllBooksByUser(apiContext, userId);
  // await page.reload();
}

async function deleteOneBook(
  apiContext: APIRequestContext,
  userId: string,
  isbn: string
) {
  await deleteBookAPIRequest.deleteBookAPIByIsbn(apiContext, userId, isbn);
}
// Test
// Add one book
// add second book
// delete first book
// assrty only second book shwon

// /**
//  * 1. import the fixture file instead of the @playwright/test
//  * 2. as soon as you use "bookPage" as a param of the test,
//  *  the fixture will be called
//  * 3. In the fixture file, will create the POM
//  * 4. Next step in the fixture is the function "use",
//  *  so it goes back to the test file
//  * 5. In the test file, it will execute all the commands,
//  *  (cleanBooks and bookPage.goto)
//  * 6. As the test ends, it goes back to the fixture
//  *  and executes the first intruction after the "use"
//  * 7. In the fixture file, executes "bookPage.addToYourCollection",
//  *  passing the param definde in the describe
//  * (test.use({ isDupe: false });)
//  */
