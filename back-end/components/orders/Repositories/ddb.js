import AWS from "aws-sdk";
AWS.config.update({
	region: process.env.AWS_DEPLOY_REGION,
});

const ddbClient = new AWS.DynamoDB.DocumentClient();

export const getCountByPK = async (pk, sk) => {
	const result = await ddbClient
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
};

export const getCountByGsi = async (pk, sk, indexName) => {
	const result = await ddbClient
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
};

export const find = async (pk, sk, limit, last) => {
	const result = await ddbClient
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
			Limit: limit,
			ExclusiveStartKey: last ? last : null,
		})
		.promise();

	return { items: result.Items, last: result.LastEvaluatedKey };
};

export const batchGetData = async (items, pk) => {
	const params = {};
	params[process.env.TABLE_NAME] = {
		Keys: items.map((e) => {
			return {
				pk: pk,
				sk: e.sk,
			};
		}),
	};
	const result = await ddbClient
		.batchGet({
			RequestItems: params,
		})
		.promise();

	return result.Responses[process.env.TABLE_NAME];
};

export const create = async (item) => {
	const result = await ddbClient
		.put({
			TableName: process.env.TABLE_NAME,
			Item: item,
		})
		.promise();

	return result;
};

export const update = async (pk, sk, status) => {
	const result = await ddbClient
		.update({
			TableName: process.env.TABLE_NAME,
			Key: {
				pk,
				sk,
			},
			UpdateExpression: "set #st = :s",
			ExpressionAttributeNames: {
				"#st": "status",
			},
			ExpressionAttributeValues: {
				":s": status,
			},
			ReturnValues: "UPDATED_NEW",
		})
		.promise();

	return result;
};

export const Delete = async (pk, sk) => {
	const result = await ddbClient
		.delete({
			TableName: process.env.TABLE_NAME,
			Key: {
				pk,
				sk,
			},
			ReturnValues: "ALL_OLD",
		})
		.promise();

	return result.Attributes;
};

export const getOne = async (pk, sk) => {
	const result = await ddbClient
		.get({
			TableName: process.env.TABLE_NAME,
			Key: {
				pk,
				sk,
			},
		})
		.promise();

	return result.Item;
};

export const getWithIndex = async (indexName, pk, sk, limit, last) => {
	const result = await ddbClient
		.query({
			TableName: process.env.TABLE_NAME,
			IndexName: indexName,
			KeyConditions: {
				lsi1pk: {
					ComparisonOperator: "EQ",
					AttributeValueList: [pk],
				},
				lsi1sk: {
					ComparisonOperator: "EQ",
					AttributeValueList: [sk],
				},
			},
			Limit: limit,
			ExclusiveStartKey: last ? last : null,
		})
		.promise();

	return { items: result.Items, last: result.LastEvaluatedKey };
};
