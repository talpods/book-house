export default (booksRepository, AppError, StatusCode) => {
  return async function Execute(limit, last) {
    const pk = "books";
    const books = booksRepository.FindAllBooks(pk, pk, limit, last);
    const countBooks = booksRepository.GetCountByPk(pk, "books#");

    const [result, count] = await Promise.all([books, countBooks]);

    if (!result.books.length > 0)
      throw new AppError(
        "there are no books right now please come back later",
        StatusCode.NOT_FOUND
      );

    return { result, count: limit ? Math.ceil(count.Count / limit) : 0 };
  };
};
