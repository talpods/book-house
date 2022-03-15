import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { category } from "./data/mockData";

import CategoriesList from "../components/CategoriesList";

test("check for book title and author name", async () => {
  render(
    <BrowserRouter>
      <CategoriesList categories={category} />
    </BrowserRouter>
  );
  const categoryTitle = await screen.findByText(/^self_help/i);
  expect(categoryTitle).toBeVisible();
});
