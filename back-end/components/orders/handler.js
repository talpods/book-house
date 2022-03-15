import serverless from "serverless-http";
import app from "./app.js";
import ConfirmOrder from "./usecases/ConfirmOrder.js";
import aws from "aws-sdk";
const ses = new aws.SES({ region: process.env.AWS_DEPLOY_REGION });

const server = serverless(app);

export const execute = async function (event, context) {
	return await server(event, context);
};

export const sendEmail = async function (event, context) {
	const data = JSON.parse(event["Records"][0]["body"]);
	const { MessageAttributes } = data;

	const subject = MessageAttributes["subject"]["Value"];
	const message = MessageAttributes["message"]["Value"];
	const reciverEamil = MessageAttributes["reciverEamil"]["Value"];
	const order_id = MessageAttributes["order_id"]["Value"];

	console.log("reciverEamil : ", reciverEamil);
	console.log("message : ", message);
	console.log("subject : ", subject);

	return ses
		.sendTemplatedEmail({
			Template: "cancel_order",
			TemplateData: `{ \"Order_id\":\"${order_id}\",
		 						\"message\": \"${message}"}\",}`,
			Source: process.env.BUSINESS_EMAIL,
			Destination: {
				ToAddresses: [reciverEamil],
			},
		})
		.promise();
};

export const createOrder = async function (event, context) {
	const data = JSON.parse(event["Records"][0]["body"]);
	const { MessageAttributes } = data;
	const order_id = MessageAttributes["order_id"]["Value"];
	console.log(order_id);
	const { result, order } = await ConfirmOrder(order_id);
	console.log("order : ", order);

	if (result.Attributes.status === "confirmed") {
		const data = await ses
			.sendTemplatedEmail({
				Template: "confirm_order",
				TemplateData: `{ \"Order_id\":\"${order_id}\",
			 \"items_count\": \"${order.products.length}\",
			 \"total\": \"${order.total_price}\",
			 \"street\": \"${order.shipping_address.street}\",
			 \"apartment\": \"${order.shipping_address.apartment}\",
			 \"city\": \"${order.shipping_address.city}\",
			 \"zipcode\": \"${order.shipping_address.zipcode}\" }`,
				Source: process.env.BUSINESS_EMAIL,
				Destination: {
					ToAddresses: [order.user],
				},
			})
			.promise();
		console.log(data);
		return data;
	} else {
		const data = await ses
			.sendTemplatedEmail({
				Template: "cancel_order",
				TemplateData: `{ \"Order_id\":\"${order_id}\",
		 						\"message\": \"${"We are sorry to inform you that  we currently  don't have all the amount of books you just ordered "}\",}`,
				Source: process.env.BUSINESS_EMAIL,
				Destination: {
					ToAddresses: [order.user],
				},
			})
			.promise();
		console.log(data);
		return data;
	}
};
