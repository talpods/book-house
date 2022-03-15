import { render, screen } from "@testing-library/react";
import { books } from "./data/mockData";

import BookItem from "../components/BookItem";

test("checks for CTA button in BookItem component ", async () => {
  render(<BookItem book={books[0]} />);
  const cta = await screen.findByTestId(/cta/i);
  expect(cta).toBeVisible();
  expect(cta).toBeEnabled();
});

test("check for book title and author name", async () => {
  render(<BookItem book={books[0]} />);
  const bookTitle = await screen.findAllByText(/^Unlocking Android by/i);
  const authorName = await screen.findAllByText(/Charlie Collins$/i);
  expect(bookTitle.length).toBe(2);
  expect(authorName.length).toBe(2);
});
