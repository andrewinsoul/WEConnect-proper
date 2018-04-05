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
    console.log(businesses);
    return res.status(200).send({ msg: businessInfo });
  }

  static updateProfile(req, res) {
    const business = businesses.find(item => item.id === req.body.id);
    if (business) {
      const index = businesses.indexOf(business);
      businesses[index].profile = req.body.profile;
      return res.status(200).send({ msg: businesses });
    }
    return res.status(404).send({ error: 'business not found' });
  }

  static removeBusiness(req, res) {
    const index = businesses.findIndex(item => item.id === Number(req.params.id));
    if (index !== -1) {
      businesses.splice(index, 1);
      for (let k = 0; k < businesses.length; k += 1) {
        businesses[k].id -= 1;
      }
      // reviews.forEach((item, index, array) => {
      //   if (item.businessId === Number(req.params.id)) reviews.splice(index, 1);
      //   if (reviews[index].businessId === Number(req.params.id)) reviews.splice(index, 1);
      // });
      return res.status(200).send({ msg: businesses });
    }
    return res.status(404).send({ msg: 'business not found' });
  }

  static getBusinessById(req, res) {
    const business = businesses.find(item => item.id === Number(req.params.id));
    if (business) return res.status(200).send({ msg: business });
    return res.status(404).send({ error: 'business not found' });
  }
}
