import express from 'express';
import { userHandler } from '../controllers/userHandler';
import { appMiddlewares } from '../middlewares/middleware';
import { validateUserResource } from '../validateFunction';

export const userRouter = express.Router();

userRouter
  .post('/signup', [validateUserResource, appMiddlewares.addUserMiddleware, userHandler.createUser])
  .post('/login', [validateUserResource, userHandler.loginUser]);
