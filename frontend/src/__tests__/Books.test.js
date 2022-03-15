import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import Books from "../components/Books";

import { books } from "./data/mockData";

test("checks for Add To Cart button in Landing page ", async () => {
  render(
    <BrowserRouter>
      <Books books={books} loading={false} />
    </BrowserRouter>
  );
  const addToCart = await screen.findAllByText(/add to cart/i);
  expect(addToCart.length).toBe(books.length);
  addToCart.map((m) => {
    expect(m).toBeVisible();
  });
});

test("check for books to be displayed", async () => {
  render(
    <BrowserRouter>
      <Books books={books} loading={false} />
    </BrowserRouter>
  );

  const bookTitle = await screen.findByText(/Unlocking Android/i);
  expect(bookTitle).toBeVisible();
});
