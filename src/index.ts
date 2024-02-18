import express, { Application, Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors'; // to block requests from different origins
import { router as userRouter } from './routes/userRouters'
import {redisClient} from './utils/config'

// Load environment variables from .env file
dotenv.config()

const app: Application = express();
const port: number = parseInt(process.env.PORT || '3030' as string);

app.use(cors()); //enable CORS for all origins.
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', userRouter)

app.get('*', (req: Request, res: Response) => {
    res.status(400).json({ message: 'Invalid endpoint' })
})
//error handler
app.use((req, res, next) => {
    const error : Error = new Error('Something went wrong')
    next(error)
})

// Error-handling Middleware
const errorMiddleware: ErrorRequestHandler = (err, req: Request, res : Response, next) => {
    console.error('Error:', err.message);
    res.status(500).send('Internal Server Error');
}
app.use(errorMiddleware)

const startServer = async () => {
    try {
        await redisClient.connect();//connect to redis server
        app.listen(port, () => {
            console.log('server is connected to redis and listening on port ' + port);
        })
    }
    catch (error) {
        console.log('error connecting to redis server : ' + (error as Error).message);
    }
}


startServer()
