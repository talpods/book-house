import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { books } from "./data/mockData";
import BooksSlider from "../components/BooksSlider";

test("checks for CTA button in BooksSlider component ", async () => {
  render(<BooksSlider books={books} loading={false} />);
  const cta = await screen.findAllByText(/add to cart/i);
  cta.map((c) => {
    expect(c).toBeVisible();
    expect(c).toBeEnabled();
  });
});

test("check prev button to be disabled by default", async () => {
  render(<BooksSlider books={books} loading={false} />);
  const prev = await screen.findByTestId(/prev$/i);
  expect(prev).toBeDisabled();

  userEvent.click(await screen.findByTestId(/next$/i));
  expect(prev).toBeEnabled();
});
