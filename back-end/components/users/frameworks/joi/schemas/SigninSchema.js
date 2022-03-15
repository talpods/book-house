import joi from "joi";

export default joi.object({
  email: joi.string().required().lowercase(),
  password: joi.string().required(),
});
