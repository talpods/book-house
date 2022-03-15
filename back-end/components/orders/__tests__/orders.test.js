//const request = require("supertest");
import request from "supertest";
import app from "../../../src/app.js";

test("check add new order", async () => {
	const dataBefor = await request(app).get("/api/orders");
	const befor = dataBefor.body.orders.length;
	const response = await request(app)
		.post("/api/orders")
		.send({
			user: "user@example.com",
			shipping: {
				street: "street582",
				suite: "Suite 75",
				city: "cairo",
				zipcode: "67867-7878",
			},
			products: [
				{
					sk: "books#handling-protocols-with-the-net-component",
					quantity: 2,
				},
				{
					sk: "books#the-book-of-life",
					quantity: 2,
				},
				{
					sk: "books#unlocking-android",
					quantity: 2,
				},
			],
		});

	const dataAfter = await request(app).get("/api/orders");
	const after = dataAfter.body.orders.length;

	expect(response.statusCode).toBe(201);
	expect(after).toBe(befor + 1);
});

test("check getting all orders", async () => {
	const response = await request(app).get("/api/orders");
	expect(response.statusCode).toBe(200);
	expect(response.body.orders).toBeDefined();
});

test("check getting order details", async () => {
	const data = await request(app).get("/api/orders");
	const orders = data.body.orders;
	const response = await request(app).get(`/api/orders/${orders[0].order_id}`);

	expect(response.statusCode).toBe(200);
	expect(response.body.order_id).toBeDefined();
	expect(response.body.products).toBeDefined();
	expect(response.body.user).toBeDefined();
	expect(response.body.shipping_address).toBeDefined();
	expect(response.body.shipping_address).toBeDefined();
	expect(response.body.total_price).toBeDefined();
});

test("check deleting order", async () => {
	const dataBefor = await request(app).get("/api/orders");
	const befor = dataBefor.body.orders.length;
	const response = await request(app).delete(
		`/api/orders/${dataBefor.body.orders[0].order_id}`
	);
	const dataAfter = await request(app).get("/api/orders");
	const after = dataAfter.body.orders.length;
	expect(response.statusCode).toBe(200);
	expect(after).toBe(befor - 1);
});
