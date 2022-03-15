import app from "../../../src/app.js";
import request from "supertest";

describe("test categories api", () => {
	const title = "science fiction";
	const photo = "test.jpg";
	const slug = title.replace(" ", "-");
	const authToken = `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXJzI2FobWVkQGFobWVkLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY0NjI5NDk4MywiZXhwIjoxNjQ2ODk5NzgzfQ.a6fkimWRt5Hu-ENMCSMl-50P0yz1xwGVPEguVgzkgzU`;

	it("should add new category", async () => {
		const res = await request(app)
			.post("/api/categories")
			.send({
				title,
				photo,
			})
			.set({ Authorization: authToken });
		expect(res.statusCode).toEqual(201);
		expect(res.body).toHaveProperty("msg", "added successfully");
	});

	it("should get all categories", async () => {
		const res = await request(app).get("/api/categories");
		expect(res.statusCode).toEqual(200);
		expect(res.body.length).toEqual(1);
		expect(res.body[0]).toHaveProperty("slug", slug);
	});

	it("should delete category", async () => {
		const res = await request(app)
			.delete(`/api/categories/${slug}`)
			.set({ Authorization: authToken });
		expect(res.statusCode).toEqual(204);
	});

	it("should get all categories after delete having 0 item", async () => {
		const res = await request(app).get("/api/categories");
		expect(res.statusCode).toEqual(200);
		expect(res.body.length).toEqual(0);
	});
});
