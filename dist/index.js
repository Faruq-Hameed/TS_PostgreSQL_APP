"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
/** module to create a pool of connections.*/
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
const app = (0, express_1.default)();
// const port: number = 3000;
const port = parseInt(process.env.PORT || '3030');
const poolPort = process.env.POOL_PORT;
const poolPassword = process.env.POOL_PORT;
//Pool configuration
const pool = new pg_1.Pool({
    user: 'me',
    host: 'localhost',
    database: 'api',
    password: 'password',
    port: parseInt(poolPort)
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.json({ info: 'Node.js, Express, and Postgres API' });
});
const getUsers = (req, res) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
};
app.get('/api/', getUsers);
app.listen(port, () => {
    console.log('listening on port ' + port);
});
