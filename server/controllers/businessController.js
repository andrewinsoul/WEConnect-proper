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
      businesses.splice(index, 1)
      for (let k = index; k < businesses.length; k += 1) {
        businesses[index].id -= 1;
      }
      const reviewsCopy = reviews.slice();
      reviews.forEach((item) => {
        if (item.businessId === Number(req.params.id)) {
          reviewsCopy.splice(reviews.indexOf(item), 1);
        }
      });
      reviews = reviewsCopy.slice();
      return res.status(200).send({ msg: reviews });
    }
    return res.status(404).send({ msg: 'business not found' });
  }

  static getAllBusiness(req, res) {
    return res.status(200).send({ msg: businesses });
  }

  static getBusinessById(req, res) {
    const business = businesses.find(item => item.id === Number(req.params.id));
    if (business) return res.status(200).send({ msg: business });
    return res.status(404).send({ error: 'business not found' });
  }

  static getBusinessByCategory(req, res) {
    const businessWithCategory = businesses.filter(item => item.category === req.query.category);
    if (businessWithCategory) return res.status(200).send({ msg: businessWithCategory });
    return res.status(404).send({ error: 'business with category not found' });
  }

  static getBusinessByLocation(req, res) {
    const businessWithLocation = businesses.filter(item => item.location === req.query.location);
    if (businessWithLocation) return res.status(200).send({ msg: businessWithLocation });
    return res.status(404).send({ error: 'business with location not found' });
  }
}
