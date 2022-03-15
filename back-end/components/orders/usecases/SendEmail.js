import aws from "aws-sdk";

const sns = new aws.SNS({ region: process.env.AWS_DEPLOY_REGION });

export default async (reciverEamil, message, subject, order_id) => {
	const data = await sns
		.publish({
			Message: `cancelling order for ${reciverEamil}`,
			MessageAttributes: {
				reciverEamil: {
					StringValue: `${reciverEamil}`,
					DataType: "String",
				},
				message: {
					StringValue: message,
					DataType: "String",
				},
				subject: {
					StringValue: subject,
					DataType: "String",
				},
				order_id: {
					StringValue: order_id,
					DataType: "String",
				},
			},
			TopicArn: "arn:aws:sns:eu-west-1:604091718886:bh_cancel_order.fifo",
			MessageGroupId: "cancel-order",
			MessageDeduplicationId: reciverEamil,
		})
		.promise();

	return data;
};
