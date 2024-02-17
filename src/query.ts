import express, { Application, Request, Response, NextFunction } from 'express';
import pool from './utils/pool';
import axios from 'axios';
import {Query} from './utils/types'
import {redisClient} from './utils/config'
/** get all users api */
export const getUsers = async(req: Request, res: Response) => {
    let allUsers;
    try{
    // get all users from the cached
        let isCached;
        const cachedUsers = await redisClient.get('allUsers');
        if(cachedUsers){ //if cached users are available return cached users
            isCached= true
            return res.status(200).send({isCached, cachedUsers})
        }
        const query: Query = {
        text: 'SELECT * FROM users ORDER BY id ASC',
        values: []
    }
    pool.query(query, async(error, results) => {
        if (error) {
            throw error;
        }
        let responseData = {totalUser:results.rows.length, users:results.rows}
        // isCached=false;
        // await redisClient.set('allUsers', JSON.stringify(responseData))
        // res.status(200).json({isCached,responseData});


        redisClient.set('allUsers', JSON.stringify(responseData));

        res.status(200).json({
            isCached: false,
            fetchedUsers: responseData
        });

    })}
    catch(error){
        res.status(500).json({error:(error as Error).message});
    }
}


export const getUsers = async (req: Request, res: Response) => {
    try {
        // Check if data exists in cache
        const cachedData = await redisClient.get('users');
        if (cachedData) {
            console.log('Data retrieved from cache');
            const parsedData = JSON.parse(cachedData);
            return res.status(200).json({
                isCached: true,
                cachedUsers: parsedData
            });
        }

        // Data not found in cache, fetch from PostgreSQL
        const query = {
            text: 'SELECT * FROM users ORDER BY id ASC',
            values: []
        };

        pool.query(query, (error, results) => {
            if (error) {
                throw error;
            }
            const responseData = { totalUser: results.rows.length, users: results.rows };

            // Cache the data
            redisClient.set('users', JSON.stringify(responseData));

            res.status(200).json({
                isCached: false,
                fetchedUsers: responseData
            });
        });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

/** get all users api */
export const getUserById = (req: Request, res: Response): void => {
    try{
         const id: number = parseInt(req.params.id)
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows);
    })
    }
   catch (error) {
    res.status(500).json({ error: (error as Error).message })
   }
}

/**Create new user */
export const createUser = (req: Request, res: Response): void => {
    const { name, email } = req.body;
    pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
        [name, email], (error, results) => {
            if (error) {
                throw error
            }
            res.
            status(200)
            .send(
                {message: `User added with ID: ${results.rows[0].id}`, 
                results: results.rows[0]
            })
        }
    )
}

// /**update user */
export const updateUser = (req: Request, res: Response) => {

    const id = parseInt(req.params.id);
    const { name, email } = req.body;

    const query: Query = {
        text: 'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
        values: [name, email, id]
    };
    pool.query(query, (error, results) => {
        if (error) {
            throw error;
        }
          // Check if any rows were updated
          if (results.rowCount === 0) {
            res.status(404).send({ message: 'User not found' });
            return;
        }
        //if a user is found return the updated user
        res.status(200).send({
            message: `User modified with ID: ${id}`,
            updatedUser: results.rows[0]
        })
    })
}

//DELETE A USER
export const deleteUser = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const query: Query = {
        text: ('DELETE FROM users WHERE id = $1'),
        values: [id]
    }
    pool.query(query, (error, result) => {
        if(error){
            throw error;
        }
        //check if any user was deleted
        if(result.rowCount === 0 ){
            res.status(404).send({ message: 'User not found' });
            return;
        }
        res.status(200).send({ message: `User deleted with ID: ${id}`, results: result.rows[0] });
    })
}
