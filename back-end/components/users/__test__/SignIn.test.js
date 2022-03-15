import request from "supertest";
import app from "../../../src/app";
import Status from "../frameworks/common/statusCode.js";

describe("SignIn endpoint", () => {
  it("should return status 200 and response body have email, token, role", async () => {
    const user = {
      email: "ali@zaki.com",
      password: "12345678",
    };

    const req = await request(app).post("/api/users/sign-in").send(user);

    expect(req.statusCode).toBe(Status.OK);
    expect(req.body).toHaveProperty("role");
    expect(req.body).toHaveProperty("token");
    expect(req.body).toHaveProperty("phone");
    expect(req.body).toHaveProperty("email");
    expect(req.body).toHaveProperty("first_name");
    expect(req.body).toHaveProperty("last_name");
    expect(req.body).toHaveProperty("sk");
  });

  it("should return status 400 with response body have message missing password", async () => {
    const user = {
      email: "ali@zaki.com",
    };

    const req = await request(app).post("/api/users/sign-in").send(user);

    expect(req.status).toBe(Status.BAD_REQUEST);
    expect(req.body).toHaveProperty("message", `"password" is required`);
  });

  it("should return 400 and response body have message credentials wrong", async () => {
    const user = {
      email: "ali@zaki.com",
      password: "1234567",
    };

    const req = await request(app).post("/api/users/sign-in").send(user);

    expect(req.status).toBe(Status.BAD_REQUEST);
    expect(req.body).toHaveProperty("message", "credentials wrong");
  });

  it("should return 404 and response body have message email not registered", async () => {
    const user = {
      email: "alia@zaki.com",
      password: "12345678",
    };
    const req = await request(app).post("/api/users/sign-in").send(user);

    expect(req.status).toBe(Status.NOT_FOUND);
    expect(req.body).toHaveProperty("message", "email not registered");
  });
});
