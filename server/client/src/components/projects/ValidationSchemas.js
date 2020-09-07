import Joi from "joi";

const ProjectSchema = Joi.object().keys({
    
  title: Joi.string().empty().required().messages({
    "any.required": "Please enter a project title.",
    "string.empty": "Please enter a project title.",
  }),

  description: Joi.string().empty().required().messages({
    "any.required": "Please enter a project description.",
    "string.empty": "Please enter a project description.",
  }),
});

export { ProjectSchema };
