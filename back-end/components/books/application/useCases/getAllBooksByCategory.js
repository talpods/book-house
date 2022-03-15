export default (booksRepository, AppError, StatusCode) => {
  return async function Execute(limit, last, category) {
    const pk = "books";
    const sk = `books#${category}`;
    const result = await booksRepository.FindBooksByCategory(
      pk,
      sk,
      limit,
      last,
      "lsi1-index"
    );
    if (!result.books.length > 0)
      throw new AppError(
        "there are no books in this category right now please come back later",
        StatusCode.NOT_FOUND
      );

    return result;
  };
};
