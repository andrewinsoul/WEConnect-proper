import Joi from 'joi';

/**
*
* @param {Object} response
*/
export default function validator(response) {
  let schema;
  if (Object.keys(response).includes('category')) {
    schema = {
      name: Joi.string().required(),
      location: Joi.string().required(),
      category: Joi.string().required(),
      userId: Joi.number().integer().required(),
      profile: Joi.string().required(),
    };
  }
  else if (Object.keys(response).includes('password1')) {
    schema = {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password1: Joi.string().required(),
      password2: Joi.string().required(),
      username: Joi.string().required(),
    };
  }
  else if (Object.keys(response).length === 2 && Object.keys(response).includes('email')) {
    schema = {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    };
  }
  else if (Object.keys(response).includes('review')) {
    schema = {
      review: Joi.string().required(),
      email: Joi.string().email().required(),
      username: Joi.string().required(),
      businessId: Joi.number().integer().required(),
    };
  }
  return Joi.validate(response, schema);
}
