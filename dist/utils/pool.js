"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
/** module to create a pool of connections.*/
const pg_1 = require("pg");
const poolPort = process.env.POOL_PORT;
const poolPassword = process.env.POOL_PASSWORD;
//Pool configuration
const pool = new pg_1.Pool({
    user: 'me',
    host: 'localhost',
    database: 'api',
    password: poolPassword,
    port: parseInt(poolPort)
});
// Export the pool configuration
pool.connect().then(() => {
    console.log('connected to pg successfully');
});
exports.default = pool;
