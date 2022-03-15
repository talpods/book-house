import { render, screen } from "@testing-library/react";
import BookForm from "../components/BookForm";
import { categories, books } from "./books.data";

it("should render bookForm component", async () => {
  const func = () => {};
  render(<BookForm submit={func} categories={categories} />);
  const title = screen.getByText("Title");
  const author = screen.getByText("Author");
  const price = screen.getByText("Price");
  const publishDate = screen.getByText("Publish Date");
  const category = screen.getByText("Category");
  const bookCover = screen.getByText("Book Cover");
  const description = screen.getByText("Description");
  const addBook = screen.getByText("Add Book");
  expect(title).toBeInTheDocument();
  expect(author).toBeInTheDocument();
  expect(price).toBeInTheDocument();
  expect(publishDate).toBeInTheDocument();
  expect(bookCover).toBeInTheDocument();
  expect(category).toBeInTheDocument();
  expect(description).toBeInTheDocument();
  expect(addBook).toBeInTheDocument();
});

it("should change button text", () => {
  const func = () => {};
  render(
    <BookForm
      submit={func}
      edit={true}
      data={books[0]}
      categories={categories}
    />
  );
  const addBook = screen.getByText("Save Book");
  expect(addBook).toBeInTheDocument();
});

it("should display values to screen", () => {
  const func = () => {};
  render(
    <BookForm
      submit={func}
      edit={true}
      data={books[5]}
      categories={categories}
    />
  );
  const title = screen.getByDisplayValue(books[5].title);
  const author = screen.getByDisplayValue(books[5].author);
  const price = screen.getByDisplayValue(books[5].price);
  const publishDate = screen.getByDisplayValue("2022-01-18");
  const category = screen.getByDisplayValue(books[5].category);
  const description = screen.getByDisplayValue(books[5].description);
  const quantity = screen.getByDisplayValue(books[5].stock_quantity);
  expect(title).toBeVisible();
  expect(author).toBeVisible();
  expect(publishDate).toBeVisible();
  expect(price).toBeVisible();
  expect(category).toBeVisible();
  expect(description).toBeVisible();
  expect(quantity).toBeVisible();
});
