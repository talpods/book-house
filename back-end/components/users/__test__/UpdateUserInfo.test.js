import request from "supertest";
import app from "../../../src/app";
import Status from "../frameworks/common/statusCode.js";

describe("Update In functions", () => {
  it("should return status 400 and response body message JsonWebTokenError", async () => {
    const info = await request(app)
      .put("/api/users")
      .set(
        "authorization",
        `Brear fsdfwertwerfdgertggdfgdfgertergrrssdsdcsdsdsdsdsdsd`
      );

    expect(info.statusCode).toBe(Status.BAD_REQUEST);
    expect(info.body).toHaveProperty("message");
  });

  it("should return status 400 and respone body have message authorization header is missing", async () => {
    const info = await request(app).put("/api/users");

    expect(info.statusCode).toBe(Status.BAD_REQUEST);
    expect(info.body).toHaveProperty(
      "message",
      "authorization header is missing"
    );
  });

  it("should return status 400 with response body have message email is not allowed", async () => {
    const user = {
      password: "12345678",
      email: "ali@zaki.com",
    };

    const Login = await request(app).post("/api/users/sign-in").send(user);
    const token = Login.body.token;
    const info = await request(app)
      .put("/api/users")
      .set("authorization", `Brear ${token}`)
      .send(user);

    expect(info.statusCode).toBe(Status.BAD_REQUEST);
    expect(info.body).toHaveProperty("message", `"email" is not allowed`);
  });

  it("should return status 200 and update user info", async () => {
    const loginUser = {
      password: "12345678",
      email: "ali@zaki.com",
    };

    const user = {
      first_name: "ali",
      last_name: "zaki",
      photo: "https://bookhouse.s3.eu-west-1.amazonaws.com/149071.png",
    };

    const Login = await request(app).post("/api/users/sign-in").send(loginUser);
    const token = Login.body.token;
    const info = await request(app)
      .put("/api/users")
      .set("authorization", `Brear ${token}`)
      .send(user);
    expect(info.statusCode).toBe(Status.OK);
  });

  it("should return status 400 and response body have message password less than 8 characters", async () => {
    const loginUser = {
      password: "12345678",
      email: "ali@zaki.com",
    };

    const user = {
      first_name: "ali",
      last_name: "zaki",
      password: "123456",
    };

    const Login = await request(app).post("/api/users/sign-in").send(loginUser);
    const token = Login.body.token;
    const info = await request(app)
      .put("/api/users")
      .set("authorization", `Brear ${token}`)
      .send(user);
    expect(info.statusCode).toBe(Status.BAD_REQUEST);
    expect(info.body).toHaveProperty(
      "message",
      `"password" length must be at least 8 characters long`
    );
  });

  it("should return status 400 and response body have message first_name less than 3 characters", async () => {
    const loginUser = {
      password: "12345678",
      email: "ali@zaki.com",
    };

    const user = {
      first_name: "al",
      last_name: "zaki",
      password: "12345678",
    };

    const Login = await request(app).post("/api/users/sign-in").send(loginUser);
    const token = Login.body.token;
    const info = await request(app)
      .put("/api/users")
      .set("authorization", `Brear ${token}`)
      .send(user);
    expect(info.statusCode).toBe(Status.BAD_REQUEST);
    expect(info.body).toHaveProperty(
      "message",
      `"first_name" length must be at least 3 characters long`
    );
  });

  it("should return status 400 and response body have message last_name less than 3 characters", async () => {
    const loginUser = {
      password: "12345678",
      email: "ali@zaki.com",
    };

    const user = {
      first_name: "ali",
      last_name: "za",
      password: "12345678",
    };

    const Login = await request(app).post("/api/users/sign-in").send(loginUser);
    const token = Login.body.token;
    const info = await request(app)
      .put("/api/users")
      .set("authorization", `Brear ${token}`)
      .send(user);
    expect(info.statusCode).toBe(Status.BAD_REQUEST);
    expect(info.body).toHaveProperty(
      "message",
      `"last_name" length must be at least 3 characters long`
    );
  });

});
