import request from "supertest";
import app from "../../../src/app";
import Status from "../frameworks/common/statusCode.js";

describe("User Info functions", () => {
  it("should return status 400 and response body have message authorization header is missing", async () => {
    const info = await request(app).get("/api/users").send();

    expect(info.statusCode).toBe(Status.BAD_REQUEST);
    expect(info.body).toHaveProperty(
      "message",
      "authorization header is missing"
    );
  });

  it("should return status 200 and response body have first_name, last_name, role, email, photo", async () => {
    const user = { email: "ali@zaki.com", password: "12345678" };

    const Login = await request(app).post("/api/users/sign-in").send(user);
    const token = Login.body.token;
    const info = await request(app)
      .get("/api/users")
      .set("authorization", `Brear ${token}`);

    expect(info.statusCode).toBe(Status.OK);
    expect(info.body).toHaveProperty("first_name");
    expect(info.body).toHaveProperty("last_name");
    expect(info.body).toHaveProperty("role");
    expect(info.body).toHaveProperty("photo");
    expect(info.body).toHaveProperty("email");
    expect(info.body).toHaveProperty("phone");
    expect(info.body).toHaveProperty("sk");
  });

  it("should return status 400 and response body message JsonWebTokenError", async () => {
    const info = await request(app)
      .get("/api/users")
      .set(
        "authorization",
        `Brear fsdfwertwerfdgertggdfgdfgertergrrssdsdcsdsdsdsdsdsd`
      );

    expect(info.statusCode).toBe(Status.BAD_REQUEST);
    expect(info.body).toHaveProperty("message");
  });
});
