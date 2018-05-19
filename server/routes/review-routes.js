import express from 'express';
import { reviewHandler } from '../controllers/reviewHandler';
import { appMiddlewares } from '../middlewares/middleware';
import { validateUserResource } from '../validateFunction';

export const reviewRouter = express.Router();

reviewRouter
  .post('/reviews', [validateUserResource, appMiddlewares.verifyToken, reviewHandler.createReview])
  .get('/reviews/:id', [validateUserResource, reviewHandler.getBusinessReview]);

