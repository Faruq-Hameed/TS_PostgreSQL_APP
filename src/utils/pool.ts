import dotenv from 'dotenv';
// Load environment variables from .env file
dotenv.config()

/** module to create a pool of connections.*/
import { Pool } from 'pg';

const poolPort = process.env.POOL_PORT;
const poolPassword = process.env.POOL_PASSWORD;

//Pool configuration
const pool: Pool = new Pool({
    user: 'me',
    host: 'localhost',
    database:'api',
    password: process.env.POOL_PASSWORD,
    port: parseInt(process.env.POOL_PORT as string)
})

// Export the pool configuration(though not required)
pool.connect().then(()=>{
    console.log('connected to pg successfully');
})
export default pool