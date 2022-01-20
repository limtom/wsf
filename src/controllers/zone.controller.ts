/**
 * Handler logic for the zone route
 */

//Dependencies
import { Request, Response } from 'express';
import { omit, isEmpty } from 'lodash';
import { User } from '../entities/user';
import { asyncWrapper } from '../middlewares/async';
import { CreateZoneInput, getZoneInput, UpdateZoneInput } from '../schemas/zone.schema';
import { getUser } from '../services/users.service';
import { createZone, getAllZone, getZone, updateZone } from '../services/zone.service';

//Create a zone
export const createZoneHandler = asyncWrapper(async (req: Request<{}, {}, CreateZoneInput['body']>, res: Response) => {

    //Get the role of the user 
    const { role } = res.locals.user

    //Allow zone creation if the user is an admin
    if (role === 'Basic') {
        return res.status(403).json({ status: 'FAILED', msg: 'Unauthorized' })
    }

    //Extract the payload
    const { name, zonal_coord } = req.body

    //look up for the user 
    const user = await getUser(zonal_coord)

    //Create the zone
    const newZone = await createZone({ name, zonal_coord: <User>user })

    //Send a response
    return res.status(201).json({ status: 'SUCCESS', msg: 'New zone created', data: { id: newZone.id, name: newZone.name, zonal_coord: newZone.zonal_coord.name } });
});

//Get all zones
export const getAllZoneHandler = asyncWrapper(async (req: Request, res: Response) => {

    //Get all the zones 
    const zones = await getAllZone()

    //Send a response
    return res.status(200).json({ status: 'SUCCESS', msg: `A total of ${zones.length} zones retrieved`, data: zones });
});

//Get a zone
export const getZoneHandler = asyncWrapper(async (req: Request<getZoneInput['params']>, res: Response) => {

    //Look up for the zone by the id 
    const zone = await getZone(req.params.id)

    //Check if zone is exist 
    if (isEmpty(zone)) {
        return res.status(400).json({ status: 'FAILED', msg: 'The zone does not exist' })
    }

    //Send a response
    return res.status(200).json({ status: 'SUCCESS', msg: 'Zone retreived successfully', data: { id: zone?.id, name: zone?.name, zonal_coord: zone?.zonal_coord.name } });
});

//Update a zone
export const updateZoneHandler = asyncWrapper(async (req: Request<UpdateZoneInput['params'], {}, UpdateZoneInput['body']>, res: Response) => {

    //Update the zone
    const changes = await updateZone(req.params.id, req.body)

    //If there was no update
    if (changes.affected === 0) {
        return res.status(401).json({ status: 'FAILED', msg: `The specified zone does not exist` });
    }

    //Send a reponse
    return res.status(201).json({ status: 'SUCCESS', msg: `Zone updated` });
});
