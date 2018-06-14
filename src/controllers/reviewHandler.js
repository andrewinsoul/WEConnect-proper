import { db } from '../models/index';

const { Review, Business } = db;

export const reviewHandler = {
  createReview(req, res) {
    return Review
      .create({
        email: req.body.email,
        username: req.body.username,
        review: req.body.review,
        businessId: req.body.businessId,
      })
      .then(() => res.status(201).send({ msg: 'review successfully posted' }))
      .catch((error) => {
        if (error.name === "SequelizeForeignKeyConstraintError") return res.status(404).send({ error: 'business not found' });
        // return res.status(500).send({ error: 'Database Error' });
      });
  },

  getBusinessReview(req, res) {
    return Review
      .findAll({
        include: [
          {
            model: Business,
          },
        ],
        where: {
          businessId: req.params.id,
        },
      })
      .then((result) => {
        if (result.length) {
          const resultObject = result.map((reviewer) => {
            return Object.assign(
              {},
              {
                email: reviewer.email,
                username: reviewer.username,
                review: reviewer.review,
                business: {
                  name: reviewer.Business.name,
                  profile: reviewer.Business.profile,
                },
              },
            );
          });
          return res.status(200).send({ msg: resultObject });
        }
        return res.status(res.status(404).send({ error: 'not found' }));
      });
    // .catch(error => res.status(500).send({ error }));
  },
};
