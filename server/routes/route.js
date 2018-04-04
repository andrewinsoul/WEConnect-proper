import express from 'express';
import businessHandler from '../controllers/businessController';
import reviewHandler from '../controllers/reviewController';
import userHandler from '../controllers/userController';
import { appMiddleware } from '../middlewares/middleware';

const router = express.Router();

// router.post('/auth/signup', [appMiddlewares.signupMiddleware], userController.addUser);
// router.post('/auth/login', [appMiddlewares.loginMiddleware], userController.loginUser);
// router.post('/businesses/', [appMiddlewares.addBusinessMiddleware], businessController.addBusiness);
router.put('/businesses/:id', businessHandler.updateProfile);
router.post('/auth/signup', userHandler.signupUser);
router.post('/auth/login', userHandler.loginUser);
router.delete('/businesses/:id', businessHandler.removeBusiness);
router.get('/businesses/:id', businessHandler.getBusinessById);
router.get('/businesses', [appMiddleware.getAllBusinessMiddleware], businessHandler.getAllBusiness);
router.get('/businesses', [appMiddleware.businessByCategoryMiddleware], businessHandler.getBusinessByCategory);
router.get('/businesses', [appMiddleware.businessByLocationMiddleware], businessHandler.getBusinessByLocation);
router.post('/businesses/reviews', reviewHandler.addReview);
router.get('/businesses/reviews/:id', reviewHandler.getBusinessReview);
// router.post('/businesses/reviews', [appMiddlewares.addReviewMiddleware], reviewController.addReview);
// router.get('/businesses/reviews/:id', reviewController.BusinessReviews);

export default router;
