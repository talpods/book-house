import { render, screen } from "@testing-library/react";
import NewCategoryForm from "../components/NewCategoryForm";

it("should render Category Form component", async () => {
  await render(<NewCategoryForm />);
  const title = screen.getByText("Title");
  expect(title).toBeVisible();
});



