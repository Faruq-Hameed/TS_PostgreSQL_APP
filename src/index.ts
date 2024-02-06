import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { router as userRouter } from './routes/userRouters'

// Load environment variables from .env file
dotenv.config()

const app: Application = express();
const port: number = parseInt(process.env.PORT || '3030' as string);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
    res.json({ info: 'Node.js, Express, and Postgres API' })
})

app.use('/api', userRouter)

app.listen(port, () => {
    console.log('listening on port ' + port);
})