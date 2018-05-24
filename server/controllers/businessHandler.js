import { db } from '../models/index';

const { Business, User } = db;
/**
 * @param {string} word
 * @returns {string}
 */
function capitalize(word) {
  let formattedWord = '';
  for (let i = 0; i < word.length; i++) {
    if (i === 0) {
      formattedWord += word[i].toUpperCase();
      continue;
    }
    formattedWord += word[i];
  }
  return formattedWord;
}
export const businessHandler = {
  createBusiness(req, res) {
    return Business
      .create({
        name: req.body.name,
        address: req.body.address,
        location: req.body.location,
        category: req.body.category,
        profile: req.body.profile,
        userId: req.body.userId,
      })
      .then(result => res.status(201).send(result))
      .catch((error) => {
        if (error.name === 'SequelizeForeignKeyConstraintError') return res.status(404).send({ error: 'User not found' });
        if (error.parent.detail.includes('name')) return res.status(409).send({ error: 'business name already exists' });
        if (error.parent.detail.includes('profile')) return res.status(409).send({ error: 'business profile already exists' });
      });
  },

  deleteBusiness(req, res) {
    return Business
      .destroy({
        where: {
          id: req.params.id,
        },
      })
      .then((deletedBusiness) => {
        if (deletedBusiness) return res.status(200).send({ msg: 'Business successfully deleted' });
        return res.status(404).send({ error: 'business not found' });
      });
  },

  getOneBusiness(req, res) {
    return Business
      .findOne({
        include: [
          {
            model: User,
          },
        ],
        where: {
          id: req.params.id,
        },
      })
      .then((result) => {
        if (result) {
          const resultObject = Object.assign(
            {},
            {
              name: result.name,
              address: result.address,
              location: result.location,
              category: result.category,
              profile: result.profile,
              user: {
                name: result.User.name,
                email: result.User.email,
              },
            },
          );
          return res.status(200).send({ msg: resultObject });
        }
        return res.status(404).send({ error: 'business not found' });
      });
  },

  getAllBusinesses(req, res, next) {
    if (Object.keys(req.query).length) return next();
    return Business
      .findAll({
        include: [
          {
            model: User,
          },
        ],
      })
      .then((result) => {
        const resultObject = result.map((business) => {
          return Object.assign(
            {},
            {
              name: business.name,
              address: business.address,
              location: business.location,
              category: business.category,
              profile: business.profile,
              user: {
                name: business.User.name,
                email: business.User.email,
              },
            },
          );
        });
        return res.status(200).send({ msg: resultObject });
      });
  },

  getBusinessesByLocation(req, res) {
    if (Object.keys(req.query).includes('location')) {
      return Business
        .findAll({
          where: {
            location: capitalize(req.query.location),
          },
        })
        .then((result) => {
          if (result.length) return res.status(200).send({ msg: result });
          if (!result.length) return res.status(404).send({ error: 'business with location not found' });
        });
    }
    return res.status(400).send({ error: 'Bad Request' });
  },

  getBusinessesByCategory(req, res, next) {
    if (!Object.keys(req.query).includes('category')) return next();
    return Business
      .findAll({
        where: {
          category: capitalize(req.query.category),
        },
      })
      .then((result) => {
        if (result.length) return res.status(200).send({ msg: result });
        if (!result.length) return res.status(404).send({ error: 'business with category not found' });
      });
  },

  updateBusinessProfile(req, res) {
    return Business
      .update(
        {
          profile: req.body.profile,
        },
        {
          where: {
            id: req.params.id,
          },
        },
      )
      .then((result) => {
        if (result[0]) return res.status(200).send({ msg: 'profile succesfully updated' });
        return res.status(404).send({ error: 'business not found' });
      });
  },
};
