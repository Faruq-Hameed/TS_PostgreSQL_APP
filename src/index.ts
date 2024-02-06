import express, { Application, Request, Response, NextFunction } from 'express';
/** module to create a pool of connections.*/
// import { Pool } from 'pg';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config()

const app: Application = express();
const port: number = parseInt(process.env.PORT || '3030' as string);
// const poolPort = process.env.POOL_PORT;
// const poolPassword = process.env.POOL_PASSWORD;

// //Pool configuration
// const pool: Pool = new Pool({
//     user: 'me',
//     host: 'localhost',
//     database:'api',
//     password: poolPassword,
//     port: parseInt(poolPort as string)
// })

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
    res.json({ info: 'Node.js, Express, and Postgres API' })
})

// const getUsers = (req: Request, res: Response) =>{
//     pool.query('SELECT * FROM users ORDER BY id ASC', (error, results):void =>{
//         if(error){
//             throw error;
//         }
//         res.status(200).json(results.rows);
//     })
// }

// app.get('/api/', getUsers)

app.listen(port, () => {
    console.log('listening on port ' + port);
})