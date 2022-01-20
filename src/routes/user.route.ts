/**
 * User router logic
 */

//Dependencies
import express from 'express';
import {
	createUserHandler,
	getAllUsersHandler,
	getLoggedInUserHandler,
	getUserHandler,
	updateUserHandler,
    userLoginHandler,
} from '../controllers/users.controller';
import { auth } from '../middlewares/auth';
import { validateSchema } from '../middlewares/validateSchema';
import { createUserSchema, getUserSchema, updateUserSchema, userLoginSchema } from '../schemas/user.schema';

//Create the router
const router = express.Router();

//Create WSF-Coord
router.post('/users/create', auth, validateSchema(createUserSchema), createUserHandler);

//User login
router.post('/users/login', validateSchema(userLoginSchema), userLoginHandler)

//Get user after log-in
router.get('/auth/user', auth, getLoggedInUserHandler)

//Get all WSF coord
router.get('/users', auth, getAllUsersHandler);

//Get a single WSF-coord
router.get('/users/:id', auth, validateSchema(getUserSchema), getUserHandler);

//Update a WSF-coord info
router.patch('/users/:id', auth, validateSchema(updateUserSchema), updateUserHandler);

export { router as userRouter };
