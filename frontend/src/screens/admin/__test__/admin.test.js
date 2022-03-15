import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AdminNav from "../../../components/AdminNav";
import AdminSideMenu from "../../../components/AdminSideMenu";
import Books from "../books/books.main";
import Orders from "../orders/orders.main";
import Categories from "../categories/Categories.main";
import Admin from "../admin.main";

test("Render admin top-navbar", () => {
  render(
    <MemoryRouter initialEntries={["/admin"]}>
      <AdminNav />
    </MemoryRouter>
  );

  const logo = screen.getByText(/Book House Admin/i);
  const logout = screen.getByText(/Logout/i);
  const books = screen.getByText(/Books/i);
  const categories = screen.getByText(/Categories/i);
  const orders = screen.getByText(/Orders/i);

  expect(logo).toBeInTheDocument();
  expect(logout).toBeInTheDocument();
  expect(books).toBeInTheDocument();
  expect(categories).toBeInTheDocument();
  expect(orders).toBeInTheDocument();
});

it("Render admin side-navbar", () => {
  render(
    <MemoryRouter initialEntries={["/admin"]}>
      <AdminSideMenu />
    </MemoryRouter>
  );
  const books = screen.getByText(/Books/i);
  const categories = screen.getByText(/Categories/i);
  const orders = screen.getByText(/Orders/i);
  expect(books).toBeInTheDocument();
  expect(categories).toBeInTheDocument();
  expect(orders).toBeInTheDocument();
});

it("Render book component", () => {
  render(<Books />);
  const spinner = screen.getByRole("status");
  expect(spinner).toBeInTheDocument();
});

it("Render orders component", () => {
  render(<Orders />);
  const spinner = screen.getByRole("status");
  expect(spinner).toBeInTheDocument();
});

it("Render categories component", () => {
  render(<Categories />);
  const spinner = screen.getByRole("status");
  expect(spinner).toBeInTheDocument();
});

it("Render admin component", () => {
  render(
    <MemoryRouter initialEntries={["/admin"]}>
      <Admin />
    </MemoryRouter>
  );
  const mainScreen = screen.getByRole("main");
  const sideNavigation = screen.getByRole("navigation");
  const navbar = screen.getByTestId("navbar");

  expect(mainScreen).toBeInTheDocument();
  expect(sideNavigation).toBeInTheDocument();
  expect(navbar).toBeInTheDocument();
});
