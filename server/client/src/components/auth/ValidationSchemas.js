import Joi from "joi";

const basicSchema = Joi.object().keys({
  firstname: Joi.string().empty().required().messages({
    "any.required": "FirstName cannot be empty.",
    "string.empty": "FirstName cannot be empty.",
  }),

  lastname: Joi.string().empty().required().messages({
    "any.required": "Lastname cannot be empty.",
    "string.empty": "Lastname cannot be empty.",
  }),
});

const contactSchema = Joi.object().keys({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .empty()
    .required()
    .messages({
      "any.required": "Phone cannot be empty.",
      "string.pattern.base": "Phone number should be digits of length 10",
      "string.empty": "Phone cannot be empty.",
    }),
});

const loginDetailsSchema = Joi.object().keys({
  username: Joi.string().empty().min(2).required().messages({
    "any.required": "Username cannot be empty.",
    "string.empty": "Username cannot be empty.",
  }),
  password: Joi.string()
    .pattern(/^[\w]{8,30}$/).empty().required()
    .messages({
      "string.pattern.base": "Password should be atleast 8-30 characters in length.",
      "any.required": "Password cannot be empty.",
      "string.empty": "Password cannot be empty.",
    }),

  confirmPassword: Joi.string()
    .empty()
    .required()
    .valid(Joi.ref("password"))
    .messages({
      "any.only": "Passwords do not mismatch",
    }),
});

const loginSchema = Joi.object().keys({
  username: Joi.string().empty().required().messages({
    "any.required": "Username cannot be empty.",
    "string.empty": "Username cannot be empty.",
  }),

  password: Joi.string().empty().required().messages({
    "any.required": "password cannot be empty.",
    "string.empty": "password cannot be empty.",
  }),
});




export { basicSchema, contactSchema, loginDetailsSchema, loginSchema };




  // lastname: Joi.string().empty().required().messages({
  //   "any.required": "Lastname cannot be empty.",
  //   "string.min": "Lastname should be atleast 2 characters",
  //   "string.empty": "Lastname cannot be empty.",
  // }),