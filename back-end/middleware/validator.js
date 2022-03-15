import  Status  from "../utility/statusCode.js";
import ApiError from "../utility/error.js";
/**
 *
 * @param {joi.ObjectSchema<any>} schema
 * @returns {Object} object values
 */
export default (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    const errorMessage = error.details
      .map((details) => details.message)
      .join(", ");
    throw new ApiError(errorMessage, Status.BAD_REQUEST);
  }
  next();
};
