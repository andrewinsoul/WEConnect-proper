import Joi from 'joi';

/**
*
* @param {Object} request
*/
export default function validator(request) {
  let schema;
  if (Object.keys(request).includes('category')) {
    schema = {
      name: Joi.string().required(),
      location: Joi.string().required(),
      category: Joi.string().required(),
      userId: Joi.number().integer().required(),
      profile: Joi.string().required(),
    };
  }
  else if (Object.keys(request).includes('password1')) {
    schema = {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password1: Joi.string().required(),
      password2: Joi.string().required(),
      username: Joi.string().required(),
    };
  }
  else if (Object.keys(request).length === 2 && Object.keys(request).includes('email') && Object.keys(request).includes('password')) {
    schema = {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    };
  }
  else if (Object.keys(request).includes('review')) {
    schema = {
      review: Joi.string().required(),
      email: Joi.string().email().required(),
      username: Joi.string().required(),
      businessId: Joi.number().integer().required(),
    };
  }
  else {
    return 'was not validated by joi...';
  }
  return Joi.validate(request, schema);
}
