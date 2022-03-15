import request from "supertest";
import app from "../../../src/app";
import Status from "../frameworks/common/statusCode.js";

describe("SignUp endpoint", () => {
  it("should return bad request for missing password", async () => {
    const user = {
      first_name: "ali",
      last_name: "zaki",
      email: "ali@zaki.com",
    };

    const req = await request(app).post("/api/users").send(user);

    expect(req.statusCode).toBe(Status.BAD_REQUEST);
  });

  it("should return status 400 and response body have message password less than 8 characters", async () => {
    const user = {
      first_name: "ali",
      last_name: "zaki",
      password: "123456",
      email: "ali@zaki.com",
    };

    const req = await request(app).post("/api/users").send(user);

    expect(req.statusCode).toBe(Status.BAD_REQUEST);
  });

  it("should return status 400 and response body have message first_name less than 3 characters", async () => {
    const user = {
      first_name: "al",
      last_name: "zaki",
      password: "123456",
      email: "ali@zaki.com",
    };

    const req = await request(app).post("/api/users").send(user);

    expect(req.statusCode).toBe(Status.BAD_REQUEST);
  });

  it("should return status 400 and response body have message last_name less than 3 characters", async () => {
    const user = {
      first_name: "ali",
      last_name: "za",
      password: "123456",
      email: "ali@zaki.com",
    };

    const req = await request(app).post("/api/users").send(user);

    expect(req.statusCode).toBe(Status.BAD_REQUEST);
  });

  it("should return status 400 and response body have message email not valid email", async () => {
    const user = {
      first_name: "ali",
      last_name: "zaki",
      password: "123456",
      email: "alizaki.com",
    };

    const req = await request(app).post("/api/users").send(user);

    expect(req.statusCode).toBe(Status.BAD_REQUEST);
  });

  it("should return bad request because request body have unwanted data", async () => {
    const user = {
      first_name: "ali",
      last_name: "zaki",
      password: "123456",
      email: "alizaki.com",
      role: "user",
    };

    const req = await request(app).post("/api/users").send(user);

    expect(req.statusCode).toBe(Status.BAD_REQUEST);
  });

  it("shouldn't create new user", async () => {
    const user = {
      first_name: "ali",
      last_name: "zaki",
      password: "12345678",
      email: "ali@zaki.com",
    };

    const req = await request(app).post("/api/users").send(user);

    expect(req.statusCode).toBe(Status.BAD_REQUEST);
  });

  it("should create new user", async () => {
    const random = (Math.random() + 1).toString(36).substring(7);
    const user = {
      first_name: random,
      last_name: random,
      password: "12345678",
      email: `${random}@${random}.com`,
    };

    const req = await request(app).post("/api/users").send(user);

    expect(req.statusCode).toBe(Status.CREATED);
  });
});
