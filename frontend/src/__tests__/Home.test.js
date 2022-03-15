import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import Books from "../components/Books";

import Home from "../screens/customer/Home";
import App from "../App";

test("checks for CTA button in Landing page ", () => {
  render(
    <App>
      <Home />
    </App>
  );
  const cta = screen.getByTestId(/cta/i);
  expect(cta).toBeVisible();
  expect(cta).toBeEnabled();
});
