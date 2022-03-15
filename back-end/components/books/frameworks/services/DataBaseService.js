import AWS from "aws-sdk";

AWS.config.update({
	region: process.env.AWS_DEPLOY_REGION,
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "book-db";

/**
 * @returns {Object} DataBaseService
 *
 */
export default {
	getCountByPK: async (pk, sk) => {
		const result = await dynamoClient
			.query({
				TableName: process.env.TABLE_NAME,
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
				Select: "COUNT",
			})
			.promise();
		return result;
	},

	getCountByGsi: async (pk, sk, indexName) => {
		const result = await dynamoClient
			.query({
				TableName: process.env.TABLE_NAME,
				IndexName: indexName,
				KeyConditions: {
					lsi1pk: {
						ComparisonOperator: "EQ",
						AttributeValueList: [pk],
					},
					lsi1sk: {
						ComparisonOperator: "BEGINS_WITH",
						AttributeValueList: [sk],
					},
				},
				Select: "COUNT",
			})
			.promise();
		return result;
	},
	Save: (data) => {
		const params = {
			TableName: TABLE_NAME,
			Item: data,
		};
		return dynamoClient.put(params).promise();
	},

	FindOneById: async (pk, sk) => {
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
		return { book: response.Items[0] };
	},
	DeleteBySlug: async (pk, sk) => {
		const params = {
			TableName: TABLE_NAME,
			Key: {
				pk: pk,
				sk: sk,
			},
		};
		try {
			await dynamoClient.delete(params).promise();
			return { error: null };
		} catch (err) {
			return { err: err };
		}
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
		return {
			books: response.Items,
			last: response.LastEvaluatedKey,
			total: response.Count,
		};
	},
	FindByCategory: async (pk, sk, limit, last, indexName) => {
		const params = {
			TableName: TABLE_NAME,
			IndexName: indexName,
			KeyConditions: {
				lsi1pk: {
					ComparisonOperator: "EQ",
					AttributeValueList: [pk],
				},
				lsi1sk: {
					ComparisonOperator: "BEGINS_WITH",
					AttributeValueList: [sk],
				},
			},
			Limit: limit,
			ExclusiveStartKey: last ? last : null,
		};
		const response = await dynamoClient.query(params).promise();
		return {
			books: response.Items,
			last: response.LastEvaluatedKey,
			total: response.Count,
		};
	},
};
