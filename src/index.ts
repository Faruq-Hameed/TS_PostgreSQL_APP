import express, { Application, Request, Response, NextFunction } from 'express';
/** module to create a pool of connections.*/
import { Pool } from 'pg';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config()

const app: Application = express();
// const port: number = 3000;
const port: number = process.env.POOL_PORT;
const poolPort = process.env.POOL_PORT;
const poolPassword = process.env.POOL_PORT;

//Pool configuration
const pool: Pool = new Pool({
    user: 'me',
    host: 'localhost',
    database:'api',
    password: 'password',
    port: 5432
})


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
    res.json({ info: 'Node.js, Express, and Postgres API' })
}


)

app.listen(port, () => {
    console.log('listening on port ' + port);
})