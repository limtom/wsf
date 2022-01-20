/**
 * Users route Handlers logic 
 */

//Dependencies
import { Request, Response } from 'express';
import { isEmpty, omit } from 'lodash';
import { asyncWrapper } from '../middlewares/async';
import { CreaterUserInput, GetUserInput, UpdateUserInput, UserLoginInput } from '../schemas/user.schema';
import { createUser, findUser, getAllUser, logIn, updateUser } from '../services/users.service';
import { getTokens } from '../utils/jwtUtils';

//Create a user
export const createUserHandler = asyncWrapper(async (req: Request<{}, {}, CreaterUserInput['body']>, res: Response) => {

    //Extract the user payload from the body 
    const { name, phone_number, password, role } = req.body

    //Create the user 
    const newUser = await createUser({ name, phone_number, password, role })

    //Send a reponse
    return res.status(201).json({ status: 'SUCCESS', msg: 'New user created', data: omit(newUser, ['password']) });

});

//User login 
export const userLoginHandler = asyncWrapper(async (req: Request<{}, {}, UserLoginInput['body']>, res: Response) => {

    //Log the user in 
    const user = await logIn(req.body)

    //Extract the needed info form thr user object 
    const { user_id, phone_number, role } = user

    //Generate an access-token and refresh-token for the user
    const tokens = getTokens({ user_id, phone_number, role })

    //Set the refresh-token on the cookie
    res.cookie('refresh_Token', tokens.refreshToken, { httpOnly: true, path: '/' })

    //Return the response 
    return res.status(200).json({ status: 'SUCCESS', msg: `User logged in`, data: tokens });

})

//Get all the user
export const getAllUsersHandler = asyncWrapper(async (req: Request, res: Response) => {

    //Look up for the users
    const users = await getAllUser()

    //Send the response
    return res.status(200).json({ status: 'SUCCESS', msg: `A total of ${users.length} users detected`, data: users });
    
});

//Get a single user
export const getUserHandler = asyncWrapper(async (req: Request<GetUserInput['params']>, res: Response) => {

    //Look up for the user
    const user = await findUser(req.params.id)

    //If user is empty
    if (isEmpty(user)) {
        return res.status(404).json({ status: 'FAILED', msg: `User not found` });
    }

    //Send a reponse
    return res.status(200).json({ status: 'SUCCESS', msg: `User found`, data: user });

});

//Get user after log-in
export const getLoggedInUserHandler = asyncWrapper(async (req: Request, res: Response) => {

    //Extract the user from local object
    const { user_id } = res.locals.user

    //Lookup for the user 
    const user = await findUser(user_id)

    //Send a reponse
    return res.status(200).json({ status: 'SUCCESS', msg: 'Logged in user retrieved', data: user })

})

//Update a user
export const updateUserHandler = asyncWrapper(async (req: Request<UpdateUserInput['params'], {}, UpdateUserInput['body']>, res: Response) => {

    //Get the update parameters
    const userUpdates = await updateUser(req.params.id, req.body)

    //If there was no update
    if (userUpdates.affected === 0) {
        return res.status(401).json({ status: 'FAILED', msg: `The specified user does not exist` });
    }

    //Send a reponse
    return res.status(201).json({ status: 'SUCCESS', msg: `User updated` });

});
