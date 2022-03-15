export default (booksRepository, AppError, StatusCode) => {
  return async function Execute(slug) {
    const pk = "books";
    const sk = `books#${slug}`;
    const result = await booksRepository.FindSingleBook(pk, sk);

    if (!result.book)
      throw new AppError("Book not found", StatusCode.NOT_FOUND);

    return result;
  };
};
