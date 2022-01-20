/**
 * Databse connection logic
 */

//Dependencies
import { createConnection } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

//Get root directory
const rootDir =

		process.env.NODE_ENV === 'development' ? 'src' :
		'dist';

//Get extension
const fileExtension =

		process.env.NODE_ENV === 'development' ? 'ts' :
		'js';

//Create the database configuration object
const config: any = {
	type: 'postgres',
	// url: process.env.TYPEORM_URL,
	host: process.env.TYPEORM_HOST,
	port: process.env.TYPEORM_PORT,
	username: process.env.TYPEORM_USERNAME,
	password: process.env.TYPEORM_PASSWORD,
	database: process.env.TYPEORM_DATABASE,
	synchronize: process.env.TYPEORM_SYNCHRONIZE,
	logging: process.env.TYPEORM_LOGGING,
	// extra: {
	//     ssl: {
	//         require: true,
	//         rejectUnauthorized: false
	//     }
	// },
	entities: [
		rootDir + `/entities/*.${fileExtension}`,
	],
};

//Connect function
export const connectToDB = async () => {
	try {
		await createConnection(config);
		console.log('Database connection successfull');
	} catch (error) {
		console.error(error);
		throw new Error('Error connecting to database');
	}
};
