import { batchGetData, update } from "../Repositories/ddb.js";
import GetBooksForOrder from "./GetBooksForOrder.js";
import GetOrderDetails from "./GetOrderDetails.js";

export default async (order_id) => {
	let valid = true;
	const order = await GetOrderDetails(order_id);
	const books = await batchGetData(order.products, "books");

	order.products.forEach((item) => {
		let bookItem = books.find((e) => e.sk === item.sk);
		console.log("order : ", item.quantity);
		console.log("book : ", bookItem.quantity);
		if (Number(item.quantity) > Number(bookItem.quantity)) {
			valid = false;
		}
	});

	if (valid) {
		const data = await update("orders", `orders#${order_id}`, "confirmed");
		return { result: data, order: order };
	} else {
		const data = await update("orders", `orders#${order_id}`, "rejected");
		return { result: data, order: order };
	}
};
