import axios from 'axios';
import {redisClient} from './utils/config'
import express, { Application, Request, Response, NextFunction } from 'express';
//testing redis with a 5 secs delayed api
const isDataModified = async()=>{
    const response = await axios.get("https://pleasant-newt-girdle.cyclic.app/api/modified")
    return response.data.modified
}

//testing redis with a 5 secs delayed api
const getAllUsers =async  () =>{
    const response = await axios.get("https://pleasant-newt-girdle.cyclic.app/api/users")
    return response.data
}

export const getCachedUsers = async (req: Request, res: Response) => {
    let result; //result that will be returned
    let isCached; //the result source is it from cached or not cached
    try {
        const data = await isDataModified()
        //if the data has been modified get the new data, and update the cached using set
        if (data === true) {
            result = await getAllUsers()
            isCached = false;
            //setting cached data
            await redisClient.set('allUsers', JSON.stringify(result));
        }
        //if the data hasn't been modified
        else {
            //get the cached data from redis
            const isCachedInRedis = await redisClient.get('allUsers');

            if (isCachedInRedis) {//if the data is cached in redis
                isCached = true;
                //stringify the cached data
                result = JSON.parse(isCachedInRedis)
            }

            else { //if the data isn't cached we get it and cached the data
                result = await getAllUsers();
                isCached = false;
                await redisClient.set('allUsers', JSON.stringify(result));
            }
        }
        return res.status(200).json({
            isCached,
            result : result
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ error })
    }
}
