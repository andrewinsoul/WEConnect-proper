import { reviews } from '../models/review';
import { businesses } from '../models/business';

export default class reviewHandler {
  static addReview(req, res) {
    const reviewInfo = {
      id: reviews.length += 1,
      businessId: req.body.businessId,
      review: req.body.review,
      username: req.body.username,
      email: req.body.email,
    };
    reviews.push(reviewInfo);
    // same reason as stated out in the userController module.
    reviews.splice(reviews.length - 2, 1);
    return res.status(201).send({ msg: reviewInfo });
  }

  static getBusinessReview(req, res) {
    const businessReview = reviews.filter(item => item.businessId === Number(req.params.id));
    return res.status(200).send({ msg: businessReview });
  }
}
