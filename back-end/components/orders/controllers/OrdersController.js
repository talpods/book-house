import addNewOrder from "../usecases/AddNewOrder.js";
import getAll from "../usecases/GetAllOrders.js";
import cancel from "../usecases/CancelOrder.js";
import getOrderDetails from "../usecases/GetOrderDetails.js";
import getOrdersForUser from "../usecases/GetOrdersForUser.js";
import SendEmail from "../usecases/SendEmail.js";
import paypal from "@paypal/checkout-server-sdk";
import GetBooksForOrder from "../usecases/GetBooksForOrder.js";
import NotifyConfirmOrder from "../usecases/NotifyConfirmOrder.js";
import { getCountByGsi, getCountByPK } from "../Repositories/ddb.js";

const Environment =
	process.env.NODE_ENV === "production"
		? paypal.core.LiveEnvironment
		: paypal.core.SandboxEnvironment;
const paypalClient = new paypal.core.PayPalHttpClient(
	new Environment(
		process.env.PAYPAL_CLIENT_ID,
		process.env.PAYPAL_CLIENT_SECRET
	)
);

export const getAllOrdersController = async (req) => {
	const { last, limit } = req.headers;
	const data = await getAll(limit, last ? JSON.parse(last) : null);
	const count = await getCountByPK("orders", "orders#");
	return [
		200,
		{
			orders: data.items,
			last: data.last,
			pages: Math.ceil(count.Count / limit),
		},
	];
};

export const getOrderDetailsController = async (req, res) => {
	const id = req.params.id;
	const data = await getOrderDetails(id);
	return [200, data];
};

export const getOrdersForOneUserController = async (req, res) => {
	const id = req.params.id;
	const { limit, last } = req.headers;
	const data = await getOrdersForUser(
		id,
		limit,
		last ? JSON.parse(last) : null
	);
	const count = await getCountByGsi("orders", `orders#${id}`, "lsi1-index");
	return [200, { data, pages: Math.ceil(count.Count / limit) }];
};

export const InitailizeNewOrderController = async (req, res) => {
	const { products, shipping } = req.body;
	const { total_price: total, orderItems } = await GetBooksForOrder(products);
	const data = await addNewOrder(
		req.userId.split("#")[1],
		orderItems,
		total,
		shipping
	);
	console.log(data);
	// getting paypal payment id and sending it back to paypal sdk
	const request = new paypal.orders.OrdersCreateRequest();
	request.prefer("return=representation");
	request.requestBody({
		intent: "CAPTURE",
		purchase_units: [
			{
				amount: {
					currency_code: "USD",
					value: total,
					breakdown: {
						item_total: {
							currency_code: "USD",
							value: total,
						},
					},
				},
			},
		],
	});

	const order = await paypalClient.execute(request);
	return [201, { id: order.result.id, order_id: data.order_id }];
};

export const confirmNewOrderController = async (req, res) => {
	const data = await NotifyConfirmOrder(
		req.body.order_id,
		req.userId.split("#")[1]
	);
	return [200, data];
};

export const cancelOrderController = async (req, res) => {
	const id = req.params.id;
	const data = await cancel(id);
	await SendEmail(data.user, req.body.message, "Order cancellation", id);
	return [200, data];
};
