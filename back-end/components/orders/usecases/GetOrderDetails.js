import { batchGetData, getOne } from "../Repositories/ddb.js";

export default async (id) => {
	const order = await getOne("orders", `orders#${id}`);
	if (!order) throw new Error("there is no order with this id");
	const books = await batchGetData(
		order.products.map((e) => e.M),
		"books"
	);

	const products = books.map((e) => {
		e.quantity = order.products.find((item) => item.M.sk == e.sk).M.quantity;
		e.price = order.products.find((item) => item.M.sk == e.sk).M.price;
		return e;
	});

	return { ...order, products };
};
