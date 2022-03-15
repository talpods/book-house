import joi from "joi";

export default joi.object({
  email: joi.string().required().email().lowercase(),
  password: joi.string().required().min(8),
  first_name: joi.string().required().min(3),
  last_name: joi.string().required().min(3),
  photo: joi.string(),
});
