import express from 'express';
import businessHandler from '../controllers/businessController';
import reviewHandler from '../controllers/reviewController';
import userHandler from '../controllers/userController';
import { appMiddleware } from '../middlewares/middleware';

const router = express.Router();

router.post('/auth/signup', [appMiddleware.userSignupMiddleware], userHandler.signupUser);
router.post('/auth/login', [appMiddleware.userLoginMiddleware], userHandler.loginUser);

router
  .put('/businesses/:id', [appMiddleware.getBusinessByIdMiddleware], businessHandler.updateProfile)
  .delete('/businesses/:id', [appMiddleware.removeBusinessMiddleware], businessHandler.removeBusiness)
  .get('/businesses/:id', [appMiddleware.getBusinessByIdMiddleware], businessHandler.getBusinessById);

router
  .post('/businesses', [appMiddleware.addBusinessMiddleware], businessHandler.addBusiness)
  .get('/businesses', [appMiddleware.getAllBusinessMiddleware, appMiddleware.businessByCategoryMiddleware, appMiddleware.businessByLocationMiddleware]);

router
  .post('/businesses/reviews', [appMiddleware.addBusinessReviewMiddleware], reviewHandler.addReview)
  .get('/businesses/reviews/:id', [appMiddleware.getBusinessReviewMiddleware], reviewHandler.getBusinessReview);

export default router;
