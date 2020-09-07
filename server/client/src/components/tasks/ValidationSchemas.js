import Joi from "joi";

const TaskSchema = Joi.object().keys({
  title: Joi.string().empty().required().messages({
    "any.required": "Please enter a task title.",
    "string.empty": "Please enter a task title.",
  }),

  description: Joi.string().empty().required().messages({
    "any.required": "Please enter a task description.",
    "string.empty": "Please enter a task description.",
  }),

  type: Joi.string().empty().required().messages({
    "any.required": "Please select the task type.",
    "string.empty": "Please select the task type.",
  }),

  assigned_to: Joi.string().empty().required().messages({
    "any.required": "Please select the task type.",
    "string.empty": "Please select the task type.",
  }),
});

export { TaskSchema };
