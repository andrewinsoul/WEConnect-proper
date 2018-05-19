import express from 'express';
import { businessHandler } from '../controllers/businessHandler';
import { appMiddlewares } from '../middlewares/middleware';
import { validateUserResource } from '../validateFunction';

export const businessRouter = express.Router();

businessRouter
  .post('/businesses', [validateUserResource, appMiddlewares.verifyToken, businessHandler.createBusiness])
  .get('/businesses', [appMiddlewares.verifyToken, businessHandler.getAllBusinesses, businessHandler.getBusinessesByCategory, businessHandler.getBusinessesByLocation]);

businessRouter
  .delete('/businesses/:id', [validateUserResource, appMiddlewares.verifyToken, businessHandler.deleteBusiness])
  .put('/businesses/:id', [validateUserResource, appMiddlewares.verifyToken, businessHandler.updateBusinessProfile])
  .get('/businesses/:id', [validateUserResource, appMiddlewares.verifyToken, businessHandler.getOneBusiness]);
