import OrdersEntity from "../entities/OrdersEntity.js";
import { create } from "../Repositories/ddb.js";
import { v4 } from "uuid";

export default async (user, orderItems, total_price, shipping) => {
	const newOrder = new OrdersEntity(
		v4(),
		user,
		shipping,
		orderItems,
		total_price
	);

	await create(newOrder);
	return newOrder;
};
