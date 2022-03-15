import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Pagination from "../components/Pagination";

test("check for prev button in Pagination Component to be disabled (page == first)", () => {
  render(<Pagination first={1} last={20} page={1} />);
  const prev = screen.getByTestId(/prev/i);
  expect(prev).toBeVisible();
  expect(prev).toBeDisabled();
});

test("check for prev button in Pagination Component to be enabled (page > first)", () => {
  render(<Pagination first={1} last={20} page={2} />);
  const prev = screen.getByTestId(/prev/i);
  expect(prev).toBeVisible();
  expect(prev).toBeEnabled();
});

test("check for next button in Pagination Component to be disabled (page == last)", () => {
  render(<Pagination first={1} last={20} page={20} />);
  const next = screen.getByTestId(/next/i);
  expect(next).toBeVisible();
  expect(next).toBeDisabled();
});

test("check for next button in Pagination Component to be enabled (page < last)", () => {
  render(<Pagination first={1} last={20} page={19} />);
  const next = screen.getByTestId(/next/i);
  expect(next).toBeVisible();
  expect(next).toBeEnabled();
});

test("check for next and prev buttons in Pagination Component to be enabled (page < last & page > first)", () => {
  render(<Pagination first={1} last={20} page={10} />);
  const next = screen.getByTestId(/next/i);
  const prev = screen.getByTestId(/prev/i);
  expect(next).toBeVisible();
  expect(next).toBeEnabled();
  expect(prev).toBeVisible();
  expect(prev).toBeEnabled();
});

test("check for next and prev buttons in Pagination Component to be disabled (page == last == first)", () => {
  render(<Pagination first={1} last={1} page={1} />);
  const next = screen.getByTestId(/next/i);
  const prev = screen.getByTestId(/prev/i);
  expect(next).toBeVisible();
  expect(next).toBeDisabled();
  expect(prev).toBeVisible();
  expect(prev).toBeDisabled();
});
