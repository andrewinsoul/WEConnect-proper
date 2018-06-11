import { businesses } from '../models/business';
import { reviews } from '../models/review';

export default class businessHandler {
  static addBusiness(req, res) {
    const businessInfo = {
      id: businesses.length += 1,
      name: req.body.name,
      location: req.body.location,
      category: req.body.category,
      userId: req.body.userId,
      profile: req.body.profile,
    };
    businesses.push(businessInfo);
    // same reason as stated out in the user controller module.
    businesses.splice(businesses.length - 2, 1);
    return res.status(201).send({ msg: businessInfo });
  }

  static updateProfile(req, res) {
    const index = businesses.findIndex(item => item.id === Number(req.params.id));
    businesses[index].profile = req.body.profile;
    return res.status(200).send({ msg: businesses[index] });
  }

  static removeBusiness(req, res) {
    const index = businesses.findIndex(item => item.id === Number(req.params.id));
    const business = businesses[index];
    businesses.splice(index, 1);
    return res.status(200).send({ msg: business });
  }

  static getBusinessById(req, res) {
    const business = businesses.find(item => item.id === Number(req.params.id));
    return res.status(200).send({ msg: business });
  }
}
