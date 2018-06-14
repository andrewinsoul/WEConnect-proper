'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reviewHandler = undefined;

var _index = require('../models/index');

var Review = _index.db.Review,
    Business = _index.db.Business;
var reviewHandler = exports.reviewHandler = {
  createReview: function createReview(req, res) {
    return Review.create({
      email: req.body.email,
      username: req.body.username,
      review: req.body.review,
      businessId: req.body.businessId
    }).then(function () {
      return res.status(201).send({ msg: 'review successfully posted' });
    }).catch(function (error) {
      if (error.name === "SequelizeForeignKeyConstraintError") return res.status(404).send({ error: 'business not found' });
      // return res.status(500).send({ error: 'Database Error' });
    });
  },
  getBusinessReview: function getBusinessReview(req, res) {
    return Review.findAll({
      include: [{
        model: Business
      }],
      where: {
        businessId: req.params.id
      }
    }).then(function (result) {
      if (result.length) {
        var resultObject = result.map(function (reviewer) {
          return Object.assign({}, {
            email: reviewer.email,
            username: reviewer.username,
            review: reviewer.review,
            business: {
              name: reviewer.Business.name,
              profile: reviewer.Business.profile
            }
          });
        });
        return res.status(200).send({ msg: resultObject });
      }
      return res.status(res.status(404).send({ error: 'not found' }));
    });
    // .catch(error => res.status(500).send({ error }));
  }
};
//# sourceMappingURL=reviewHandler.js.map