/**
 * Logic for routing th zone table
 */

//Dependencies
import express from 'express';
import {
	createZoneHandler,
	getAllZoneHandler,
	getZoneHandler,
	updateZoneHandler,
} from '../controllers/zone.controller';
import { auth } from '../middlewares/auth';
import { validateSchema } from '../middlewares/validateSchema';
import { createZoneSchema, getZoneSchema, updateZoneSchema } from '../schemas/zone.schema';

//Create the router
const router = express.Router();

//Create a zone
router.post('/zones', validateSchema(createZoneSchema), auth, createZoneHandler);

//Get all zones
router.get('/zones', auth, getAllZoneHandler);

//Get a specific zone
router.get('/zones/:id', validateSchema(getZoneSchema), auth, getZoneHandler);

//Update a zone
router.patch('/zones/:id', validateSchema(updateZoneSchema), auth, updateZoneHandler);

export { router as zoneRouter };
