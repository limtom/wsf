/**
 * Application starting point
 */

//Dependencies
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { notFound } from './middlewares/notFound';
import { connectToDB } from './utils/connect';
import { userRouter } from './routes/user.route';
import { errorHandler } from './middlewares/error-handler';
import { zoneRouter } from './routes/zone.route';

dotenv.config();

//Createe an express app
const app = express();
const port = process.env.PORT || 5001;

//Middleware
app.use(express.json())
app.use(morgan('dev'));
app.use(cookieParser())
app.use(
	cors({
		credentials: true,
		origin: 'http:localhost:3000' || '*',
	})
);

//Routee
app.get('/', (req, res) => {
	res.send('Hello-world');
});
app.use('/api/v1', userRouter)
app.use('/api/v1', zoneRouter)
app.use(notFound);
app.use(errorHandler)

//App initialization
const init = async () => {
	try {
		//Connect to the database
        await connectToDB();
        
		//Start the server
		app.listen(port, () => {
			console.log(`Server listening on ${port}`);
		});
    } catch (error:any) {
        console.log(error.message)
        throw new Error(error.message)
    }
};

//Start the app
init()
