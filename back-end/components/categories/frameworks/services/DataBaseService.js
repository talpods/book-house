import AWS from "aws-sdk";
AWS.config.update({
	region: process.env.AWS_DEPLOY_REGION,
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME;

/**
 * @returns {Object} DataBaseService
 *
 */
export default {
	Save: (data) => {
		const params = {
			TableName: TABLE_NAME,
			Item: data,
		};
		return dynamoClient.put(params).promise();
	},

	GetById: async (pk, sk) => {
		const params = {
			TableName: TABLE_NAME,
			Key: {
				pk: pk,
				sk: sk,
			},
		};

		const response = await dynamoClient.get(params).promise();
		return response.Item;
	},

	Find: async (pk, sk, limit, last) => {
		const params = {
			TableName: TABLE_NAME,
			KeyConditions: {
				pk: {
					ComparisonOperator: "EQ",
					AttributeValueList: [pk],
				},
				sk: {
					ComparisonOperator: "BEGINS_WITH",
					AttributeValueList: [sk],
				},
			},
			Limit: limit,
			ExclusiveStartKey: last ? last : null,
		};
		const response = await dynamoClient.query(params).promise();
		return { items: response.Items, last: response.LastEvaluatedKey };
	},

	FindAll: async (pk, sk) => {
		const params = {
			TableName: TABLE_NAME,
			KeyConditions: {
				pk: {
					ComparisonOperator: "EQ",
					AttributeValueList: [pk],
				},
				sk: {
					ComparisonOperator: "BEGINS_WITH",
					AttributeValueList: [sk],
				},
			},
		};
		const response = await dynamoClient.query(params).promise();
		return { items: response.Items, last: response.LastEvaluatedKey };
	},

	Delete: async (pk, sk) => {
		const params = {
			TableName: TABLE_NAME,
			Key: {
				pk: pk,
				sk: sk,
			},
		};

		return await dynamoClient.delete(params).promise();
	},
};
