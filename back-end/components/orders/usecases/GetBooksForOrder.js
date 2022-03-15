import { batchGetData } from "../Repositories/ddb.js";

export default async (products) => {
	const books = await batchGetData(products, "books");

	if (books.length != products.length)
		throw new Error("one of the books you are trying to buy does not exist");

	const orderItems = books.map((e) => {
		return {
			M: {
				sk: e.sk,
				quantity: `${products.find((item) => item.sk === e.sk).quantity}`,
				price: `${e.price}`,
			},
		};
	});

	const total_price = orderItems.reduce(
		(acc, curr) => acc + Number(curr.M.price) * Number(curr.M.quantity),
		0
	);

	return { total_price, orderItems };
};
