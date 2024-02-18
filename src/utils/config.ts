import { createClient } from "redis";
import dotenv from 'dotenv'

dotenv.config();
//sets up a Redis client using the redis package and export
export const redisClient = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT || '6379', 10)
    }
})