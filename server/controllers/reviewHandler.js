import { db } from '../models/index';

const { Review } = db;

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
      .catch(error => res.status(400).send(error));
  },

  getBusinessReview(req, res) {
    return Review
      .findAll({
        where: {
          businessId: req.params.id,
        },
      })
      .then((result) => {
        if (result.length) return res.status(200).send({ msg: result });
        return res.status(res.status(404).send({ error: 'no review yet for business' }));
      })
      .catch(err => res.status(500).send({ error: err }));
  },
};
