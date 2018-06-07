'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _businessController = require('../controllers/businessController');

var _businessController2 = _interopRequireDefault(_businessController);

var _reviewController = require('../controllers/reviewController');

var _reviewController2 = _interopRequireDefault(_reviewController);

var _userController = require('../controllers/userController');

var _userController2 = _interopRequireDefault(_userController);

var _middleware = require('../middlewares/middleware');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/auth/signup', [_middleware.appMiddleware.userSignupMiddleware], _userController2.default.signupUser);
router.post('/auth/login', [_middleware.appMiddleware.userLoginMiddleware], _userController2.default.loginUser);

router.put('/businesses/:id', [_middleware.appMiddleware.getBusinessByIdMiddleware], _businessController2.default.updateProfile).delete('/businesses/:id', [_middleware.appMiddleware.removeBusinessMiddleware], _businessController2.default.removeBusiness).get('/businesses/:id', [_middleware.appMiddleware.getBusinessByIdMiddleware], _businessController2.default.getBusinessById);

router.post('/businesses', [_middleware.appMiddleware.addBusinessMiddleware], _businessController2.default.addBusiness).get('/businesses', [_middleware.appMiddleware.getAllBusinessMiddleware, _middleware.appMiddleware.businessByCategoryMiddleware, _middleware.appMiddleware.businessByLocationMiddleware]);

router.post('/businesses/reviews', [_middleware.appMiddleware.addBusinessReviewMiddleware], _reviewController2.default.addReview).get('/businesses/reviews/:id', [_middleware.appMiddleware.getBusinessReviewMiddleware], _reviewController2.default.getBusinessReview);

exports.default = router;