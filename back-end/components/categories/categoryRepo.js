import AWS from "aws-sdk";

AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.AWS_TABLE_NAME || "categories_db";

export default {
  // Get All Categories
  GetAllCategories: async () => {
    const params = {
      TableName: TABLE_NAME,
      KeyConditionExpression: "pk = :pk and begins_with(sk, :sk)",
      ExpressionAttributeValues: {
        ":pk": "category",
        ":sk": "category#",
      },
    };

    try {
      const data = await dynamoClient.query(params).promise();
      return { data: data.Items, error: null };
    } catch (error) {
      return { data: null, error: error };
    }
  },

  // Add New Category
  AddNewCategory: async ({ title, photo }) => {
    const slug = title.replace(" ", "-");
    const params = {
      TableName: TABLE_NAME,
      Item: {
        pk: "category",
        sk: `category#${slug}`,
        title: title,
        slug: slug,
        photo: photo,
      },
    };

    try {
      await dynamoClient.put(params).promise();
      return { data: params.Item, error: null };
    } catch (error) {
      return { data: null, error: error };
    }
  },

  // Delete Category
  DeleteCategory: async (slug) => {
    const params = {
      TableName: TABLE_NAME,
      Key: {
        pk: "category",
        sk: `category#${slug}`,
      },
    };

    try {
      await dynamoClient.delete(params).promise();
      return { error: null };
    } catch (error) {
      return { error: error };
    }
  },
};
