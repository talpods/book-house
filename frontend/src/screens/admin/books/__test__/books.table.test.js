import { render, screen } from "@testing-library/react";
import Table from "../components/BooksTable";
import { books } from "./books.data";

it("should display at least one document in table row", () => {
  render(<Table data={books} />);

  const title = screen.getByText(books[0].title);
  const price = screen.getByText(books[0].price);
  const publishDate = screen.getByText(books[0].publish_date);
  const quantity = screen.getByText(books[0].stock_quantity);

  expect(title).toBeVisible();
  expect(publishDate).toBeVisible();
  expect(price).toBeVisible();
  expect(quantity).toBeVisible();
});
