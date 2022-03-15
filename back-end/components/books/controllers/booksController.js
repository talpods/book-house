import addNewBook from "../application/useCases/addNewBook.js";
import getAllBooks from "../application/useCases/getAllBooks.js";
import getAllBooksByCategory from "../application/useCases/getAllBooksByCategory.js";
import getSingleBook from "../application/useCases/getSingleBook.js";
import updateExistingBook from "../application/useCases/updateExistingBook.js";
import deleteSingleBook from "../application/useCases/deleteSingleBook.js";

/**
 * @param {dependencies} dependencies
 */
export default (dependencies) => {
  const {
    booksRepository,
    bookSchema,
    ValidationService,
    redisService,
    redisFlush,
    StatusCode,
    AppError,
  } = dependencies;

  const getBooks = getAllBooks(booksRepository, AppError, StatusCode);

  const addBook = addNewBook(booksRepository);

  const updateBook = updateExistingBook(booksRepository, AppError, StatusCode);

  const getCategoryBooks = getAllBooksByCategory(
    booksRepository,
    AppError,
    StatusCode
  );

  const getBook = getSingleBook(booksRepository, AppError, StatusCode);

  const deleteBook = deleteSingleBook(booksRepository, AppError, StatusCode);

  return {
    getAllBooks: async ({ headers }) => {
      const { limit, last } = headers;
      const result = await redisService(`books_${last}_${limit}`, async () => {
        return await getBooks(
          limit ? limit : null,
          last ? JSON.parse(last) : ""
        );
      });

      return [StatusCode.OK, result];
    },
    addNewBook: async ({ body }) => {
      const values = ValidationService(bookSchema)(body);
      await addBook(values);
      await redisFlush();
      return [StatusCode.CREATED, "the book is added successfully"];
    },
    updateExistingBook: async ({ body, params }) => {
      const values = ValidationService(bookSchema)(body);
      await updateBook(values, params.slug);
      await redisFlush();
      return [StatusCode.CREATED, "the book is updated successfully"];
    },
    getAllBooksByCategory: async ({ headers, params }) => {
      const { limit, last } = headers;
      const { category } = params;
      const result = await redisService(`books_${category}`, async () => {
        return await getCategoryBooks(limit ? limit : null, last, category);
      });
      return [StatusCode.OK, result];
    },
    getSingleBook: async ({ params }) => {
      const { slug } = params;
      const result = await redisService(`books_${slug}`, async () => {
        return await getBook(slug);
      });
      return [StatusCode.OK, result];
    },
    deleteSingleBook: async ({ params }) => {
      const { slug } = params;
      await deleteBook(slug);
      await redisFlush();
      return [StatusCode.OK, "book is deleted successfully"];
    },
  };
};
