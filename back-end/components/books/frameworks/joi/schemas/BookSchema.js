import joi from "joi";

export default joi.object({
  title: joi.string().min(3).required(),
  author: joi.string().min(3).required(),
  category: joi.string().min(3).required(),
  photo: joi.string().min(3).required(),
  price: joi.number().required(),
  description: joi.string().min(3).required(),
  quantity: joi.number().required(),
  publish_date: joi.date().required(),
});
