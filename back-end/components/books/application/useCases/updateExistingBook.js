import Book from "../../entities/BookEntity.js";

export default (booksRepository, AppError, StatusCode) => {
  return async function Execute(book, slug) {
    const pk = "books";
    const sk = `books#${slug}`;
    const isFound = await booksRepository.FindSingleBook(pk, sk);
    if (!isFound)
      throw new AppError("book does not exists", StatusCode.NOT_FOUND);

    const localBook = new Book({
      title: book.title,
      author: book.author,
      category: book.category,
      price: book.price,
      quantity: book.quantity,
      publish_date: book.publish_date,
      description: book.description,
      photo: book.photo,
      slug: slug,
    });
    return await booksRepository.SaveOrUpdateBook(localBook);
  };
};
