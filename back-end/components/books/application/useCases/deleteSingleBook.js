export default (booksRepository, AppError, StatusCode) => {
  return async function Execute(slug) {
    const pk = "books";
    const sk = `books#${slug}`;
    const result = await booksRepository.DeleteBook(pk, sk);

    if (result.err) throw new AppError(result.err, StatusCode.NOT_FOUND);

    return result;
  };
};
