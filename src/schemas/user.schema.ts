/**
 * Schema for user request endpoint 
 */

//Dependencies
import { object, string, nativeEnum, TypeOf } from 'zod';

enum UserRole {
    Basic = 'Basic',
    Admin = 'Admin'
}
const createUserPayload = {
    body: object({
        name: string({
            required_error: 'Name field is required'
        }).min(3, 'Name too short'),
        phone_number: string({
            required_error: 'Phone number field is required'
        }).min(11, 'Phone number not valid'),
        password: string({
            required_error:'Password is required'
        }).min(6, 'Password too short'),
        role:  nativeEnum(UserRole).default(UserRole.Basic)
    }),
};

const userLoginPayload = {
    body: object({
        phone_number: string({
            required_error:'Phone number is required'
        }).min(11, 'Phone number not valid'),
        password: string({
            required_error:'Password field is required'
        }).min(6,'Password too short')
    })
}

const updateUserPayload = {
    body: object({
        name: string({
            required_error: 'Name field is required'
        }).min(3, 'Name too short'),
        phone_number: string({
            required_error:'Phone number is required'
        }).min(11),
        password: string().min(6,'Password too short').optional()
    })
}

const params = {
    params: object({
        id: string({
            required_error:'User_id is required'
        }).uuid()
    })
}


//SCHEMAS 
export const createUserSchema = object({
    ...createUserPayload
})

export const getUserSchema = object({
    ...params
})

export const updateUserSchema = object({
    ...updateUserPayload,
    ...params
})

export const userLoginSchema = object({
    ...userLoginPayload
})

//Create the types
export type CreaterUserInput = TypeOf<typeof createUserSchema>
export type GetUserInput = TypeOf<typeof getUserSchema>
export type UpdateUserInput = TypeOf<typeof updateUserSchema>
export type UserLoginInput = TypeOf<typeof userLoginSchema>