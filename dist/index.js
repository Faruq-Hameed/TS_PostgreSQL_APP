"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
/** module to create a pool of connections.*/
// import { Pool } from 'pg';
const dotenv_1 = __importDefault(require("dotenv"));
const userRouters_1 = require("./routes/userRouters");
// Load environment variables from .env file
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = parseInt(process.env.PORT || '3030');
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
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.json({ info: 'Node.js, Express, and Postgres API' });
});
// const getUsers = (req: Request, res: Response) =>{
//     pool.query('SELECT * FROM users ORDER BY id ASC', (error, results):void =>{
//         if(error){
//             throw error;
//         }
//         res.status(200).json(results.rows);
//     })
// }
// app.get('/api/', getUsers)
app.use('/api', userRouters_1.router);
app.listen(port, () => {
    console.log('listening on port ' + port);
});
