import express from 'express';
import businessHandler from '../controllers/businessController';
import reviewHandler from '../controllers/reviewController';
import userHandler from '../controllers/userController';
import { appMiddleware } from '../middlewares/middleware';

const router = express.Router();

router.post('/auth/signup', [appMiddleware.userSignupMiddleware], userHandler.signupUser);
router.post('/auth/login', [appMiddleware.userLoginMiddleware], userHandler.loginUser);
router.put('/businesses/:id', businessHandler.updateProfile);
router.delete('/businesses/:id', [appMiddleware.removeBusinessMiddleware], businessHandler.removeBusiness);
router.get('/businesses/:id', businessHandler.getBusinessById);
router.post('/businesses/', [appMiddleware.addBusinessMiddleware], businessHandler.addBusiness);
router.get('/businesses', [appMiddleware.getAllBusinessMiddleware, appMiddleware.businessByCategoryMiddleware, appMiddleware.businessByLocationMiddleware]);
router.post('/businesses/reviews', [appMiddleware.addBusinessReviewMiddleware], reviewHandler.addReview);
router.get('/businesses/reviews/:id', reviewHandler.getBusinessReview);

export default router;
