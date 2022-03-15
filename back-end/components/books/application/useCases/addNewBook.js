import Book from "../../entities/BookEntity.js";

export default (booksRepository) => {
  return async function Execute(book) {
    const {
      title,
      author,
      category,
      price,
      photo,
      description,
      quantity,
      publish_date,
    } = book;
    const localBook = new Book({
      title,
      author,
      category,
      price,
      photo: photo ? photo : "/assets/null.jpg",
      description,
      quantity,
      slug: title.toLowerCase().replace(/\s/g, "-"),
      publish_date,
    });
    return await booksRepository.SaveOrUpdateBook(localBook);
  };
};
