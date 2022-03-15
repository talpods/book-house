import Status from "../common/statusCode.js";
import ApiError from "../common/error.js";
/**
 *
 * @param {joi.ObjectSchema<any>} schema
 * @returns {Object} object values
 */
const Validator = (schema) => (data) => {
  const { error, value } = schema.validate(data);
  if (error) {
    const errorMessage = error.details
      .map((details) => details.message)
      .join(", ");
    throw new ApiError(errorMessage, Status.BAD_REQUEST);
  }
  return value;
};

export default Validator;
