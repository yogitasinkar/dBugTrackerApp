import Joi from "joi";

const visitorSchema = Joi.object().keys({
  name: Joi.string().empty().required().messages({
    "any.required": "Please enter your name.",
    "string.empty": "Please enter your name.",
  }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),

  comment: Joi.string().empty().required().messages({
    "any.required": "Please enter a comment.",
    "string.empty": "Please enter a comment.",
  }),
});

export { visitorSchema };