import { APIRequestContext } from "@playwright/test";
import { buildUrl } from "../../utils/apiUrlBuilder";
import { executeDeleteRequest } from "../../utils/apiRequestUtils";
import endpoints from "../../utils/apiEndpoints";
import methods from "../../utils/apiMethods";

async function deleteAllBooksByUser(
  apiContext: APIRequestContext,
  userId: string
) {
  const method = methods.delete;
  const requestOptions = {};
  const requestUrl = buildUrl(endpoints.books.delete, userId);
  const response = await executeDeleteRequest(
    apiContext,
    requestUrl,
    method,
    requestOptions
  );
}

// async function deleteOneBookByUser(
//   apiContext: APIRequestContext,
//   userId: string,
//   isbn: string
// ) {
//   const method = methods.delete;
//   const requestOptions = {};
//   const requestUrl = buildUrl(endpoints.books.delete, userId, isbn);
//   const response = await executeRequest(
//     apiContext,
//     requestUrl,
//     method,
//     requestOptions
//   );
// }

async function deleteBookAPIByIsbn(
  apiContext: APIRequestContext,
  userId: string,
  isbn: string
) {
  const method = methods.delete;
  const requestOptions = { data: { isbn: isbn, userId: userId } };
  const requestUrl = buildUrl(endpoints.book.delete);
  const response = await executeDeleteRequest(
    apiContext,
    requestUrl,
    method,
    requestOptions
  );
  return response;
}

export default {
  deleteAllBooksByUser,
  deleteBookAPIByIsbn,
};
