/**
 * Logic for interacting with the zone table 
 */

import { omit } from 'lodash';
import { User } from '../entities/user';
import { Zone } from '../entities/zone';

//Create the zone interface
interface IZone {
	name: string,
	zonal_coord: User,
}
//Create a zone
export const createZone = async (zoneObject: IZone) => {
    try {
        //Create the zone 
        const zone = Zone.create({
            name: zoneObject.name,
            zonal_coord:zoneObject.zonal_coord
        })
        return await zone.save()
    } catch (error) {
        throw new Error('A Zone with that name already existing')
    }
};

//Get all the zones 
export const getAllZone = async () => {
    //Look up for the zone
    const zones = await Zone.find()

    return zones
}

//Get a zone 
export const getZone = async (id: string) => {
    //Look up for the zone using the id 
    const zone = await Zone.findOne({ where: { id } })
    return zone
}

//Update a zone 
export const updateZone = async (id: string, zoneObject:{}) => {
    const changesMade = Zone.update({ id }, zoneObject)
    return changesMade
}
