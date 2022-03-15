import request from "supertest";
import app from "../app";

const token =
  "Brear eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXJzI2FobWVkQGFobWVkLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY0NjI5NDk4MywiZXhwIjoxNjQ2ODk5NzgzfQ.a6fkimWRt5Hu-ENMCSMl-50P0yz1xwGVPEguVgzkgzU";
describe("Books endpoints", () => {
  it("should save a new book", async () => {
    const res = await request(app)
      .post("/api/books")
      .set("authorization", token)
      .send({
        title: "the test book of life",
        author: "Famous Author",
        category: "development",
        price: 30,
        description: "this is a great book",
        quantity: 25,
        publish_date: "2/20/1999",
        photo: "photo.jpg",
      });
    expect(res.statusCode).toBe(201);
  });

  it("should update an existing book", async () => {
    const res = await request(app)
      .patch("/api/books/update-book/the-test-book-of-life")
      .set("authorization", token)
      .send({
        title: "the test book of life 2",
        author: "Famous Author",
        category: "development",
        price: 30,
        description: "this is a great book",
        quantity: 25,
        publish_date: "2/20/1999",
        photo: "photo.jpg",
      });
    expect(res.statusCode).toBe(201);
  });

  it("should return bad request if title is null in saving new book", async () => {
    const res = await request(app)
      .post("/api/books")
      .set("authorization", token)
      .send({
        author: "Famous Author",
        category: "1",
        price: 30,
        description: "this is a great book",
        quantity: 25,
        publish_date: "20/2/1999",
        photo: "photo.jpg",
      });
    expect(res.statusCode).toBe(400);
  });

  it("should return bad request if title is empty string in saving new book", async () => {
    const res = await request(app)
      .post("/api/books")
      .set("authorization", token)
      .send({
        title: "",
        author: "Famous Author",
        category: "1",
        price: 30,
        description: "this is a great book",
        quantity: 25,
        publish_date: "20/2/1999",
        photo: "photo.jpg",
      });
    expect(res.statusCode).toBe(400);
  });

  it("should return bad request if no token in saving existing book", async () => {
    const res = await request(app).post("/api/books/").send({
      title: "",
      author: "Famous Author",
      category: "1",
      price: 30,
      description: "this is a great book",
      quantity: 25,
      publish_date: "20/2/1999",
      photo: "photo.jpg",
    });
    expect(res.statusCode).toBe(400);
  });

  it("should return bad request if title is null in updating existing book", async () => {
    const res = await request(app)
      .patch("/api/books/update-book/the-test-book-of-life")
      .set("authorization", token)
      .send({
        author: "Famous Author",
        category: "1",
        price: 30,
        description: "this is a great book",
        quantity: 25,
        publish_date: "20/2/1999",
        photo: "photo.jpg",
      });
    expect(res.statusCode).toBe(400);
  });

  it("should return not found if slug is incorrect  in updating existing book", async () => {
    const res = await request(app)
      .patch("/api/books/update-book/the-testing-book-of-life")
      .set("authorization", token)
      .send({
        author: "Famous Author",
        category: "1",
        price: 30,
        description: "this is a great book",
        quantity: 25,
        publish_date: "20/2/1999",
        photo: "photo.jpg",
      });
    expect(res.statusCode).toBe(400);
  });

  it("should return bad request if title is empty string in updating existing book", async () => {
    const res = await request(app)
      .patch("/api/books/update-book/the-test-book-of-life")
      .set("authorization", token)
      .send({
        title: "",
        author: "Famous Author",
        category: "1",
        price: 30,
        description: "this is a great book",
        quantity: 25,
        publish_date: "20/2/1999",
        photo: "photo.jpg",
      });
    expect(res.statusCode).toBe(400);
  });

  it("should return bad request if no token in updating existing book", async () => {
    const res = await request(app)
      .patch("/api/books/update-book/the-test-book-of-life")
      .send({
        title: "",
        author: "Famous Author",
        category: "1",
        price: 30,
        description: "this is a great book",
        quantity: 25,
        publish_date: "20/2/1999",
        photo: "photo.jpg",
      });
    expect(res.statusCode).toBe(400);
  });

  it("should get all books", async () => {
    const res = await request(app).get("/api/books");
    expect(res.statusCode).toBe(200);

    expect(res.body).toHaveProperty("books");
    expect(res.body.books.length).toBeGreaterThan(0);
  });

  it("should return all books in the category", async () => {
    const category = "Romance";
    const res = await request(app).get(`/api/books/category/${category}`);

    expect(res.statusCode).toBe(200);

    expect(res.body).toHaveProperty("books");
    expect(res.body.books.length).toBeGreaterThan(0);
    expect(res.body.books[0].category).toBe(category);
  });

  it("should delete a book", async () => {
    const slug = "the-test-book-of-life";
    const res = await request(app)
      .delete(`/api/books/delete-book/${slug}`)
      .set("authorization", token);

    expect(res.statusCode).toBe(200);
  });

  it("should return bad request if no token in delete a book", async () => {
    const slug = "the-test-book-of-life";
    const res = await request(app).delete(`/api/books/delete-book/${slug}`);

    expect(res.statusCode).toBe(400);
  });
});
