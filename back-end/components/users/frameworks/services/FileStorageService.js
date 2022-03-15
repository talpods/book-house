import AWS from "aws-sdk";

AWS.config.update({
  region: process.env.AWS_DEPLOY_REGION,
});

const s3 = new AWS.S3();
const BUCKET_NAME = process.env.BUCKET_NAME;

export default {
  Save: async (name, type) => {
    const params = {
      Bucket: BUCKET_NAME,
      Key: name,
      Expires: 60 * 20,
      ContentType: `image/${type}`,
    };
    return s3.getSignedUrlPromise("putObject", params);
  },
};
