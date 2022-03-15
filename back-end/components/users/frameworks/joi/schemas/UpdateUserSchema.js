import joi from "joi";

export default joi.object({
  first_name: joi.string().min(3),
  last_name: joi.string().min(3),
  phone: joi.string().min(11),
  photo: joi.string(),
});
