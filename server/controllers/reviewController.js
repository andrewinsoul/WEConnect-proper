import { reviews } from '../models/review';

export class reviewHandler {
  static addReview(req, res) {
    let reviewInfo = {
      id: reviews.length++,
      businessId: req.body.businessId,
      review: req.body.review,
      username: req.body.username,
      email: req.body.email
    }
    reviews.push(reviewInfo);
    return res.status(200).send({ msg: reviewInfo });
  }

  static getBusinessReview(req, res) {
    let businessReview = reviews.filter(item => item.businessId === Number(req.params.id))
    if (businessReview) return res.status(200).send({ msg: businessReview });
    return res.status(200).send({ msg: `No review yet for  business with id = ${businessId}` });
  }
}
