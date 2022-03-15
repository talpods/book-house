import joi from "joi";

export default joi.object({
  oldPassword: joi.string().required(),
  newPassword: joi.string().required().min(8),
});
