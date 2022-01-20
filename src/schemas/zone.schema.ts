/**
 * Zone creation schema
 */

//Dependencies
import { string, object, TypeOf } from 'zod';

//Create the zone creation payload
const createZonePayload = {
	body: object({
		name: string({
			required_error: 'Name field required',
		}).min(3, 'Must be at least 3 characters'),
		zonal_coord: string({
			required_error: "Zonal coord's name is required",
		}).min(6, 'Must be at least six characters'),
	}),
};

const updateZonePayload = {
	body: object({
		name: string({
			required_error: 'Name field required',
		})
			.min(3, 'Must be at least 3 characters')
			.optional(),
		zonal_coord: string({
			required_error: "Zonal coord's name is required",
		})
			.min(6, 'Must be at least six characters')
			.optional(),
	}),
};

const params = {
	params: object({
		id: string({
			required_error: 'Zone identifier required',
		}).uuid(),
	}),
};

//Zone schemas
//Create a zone
export const createZoneSchema = object({
	...createZonePayload,
});

//Get all the zones
export const updateZoneSchema = object({
	...updateZonePayload,
	...params,
});

//Get a zone
export const getZoneSchema = object({
	...params,
});

//Create the various types
export type CreateZoneInput = TypeOf<typeof createZoneSchema>;
export type UpdateZoneInput = TypeOf<typeof updateZoneSchema>;
export type getZoneInput = TypeOf<typeof getZoneSchema>;
