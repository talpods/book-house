import aws from "aws-sdk";

const sns = new aws.SNS({ region: process.env.AWS_DEPLOY_REGION });

export default async (order_id, user) => {
	return sns
		.publish({
			Message: `confirm order for ${user}`,
			MessageAttributes: {
				order_id: {
					DataType: "String",
					StringValue: order_id,
				},
			},
			TopicArn: "arn:aws:sns:eu-west-1:604091718886:bh_confirm_order.fifo",
			MessageGroupId: "new-order",
			MessageDeduplicationId: user,
		})
		.promise();
};
