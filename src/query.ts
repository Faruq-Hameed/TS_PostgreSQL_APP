import express, { Application, Request, Response, NextFunction } from 'express';
import pool from './utils/pool';
import {Query} from './utils/types'
import redis from 'redis'
/** get all users api */
export const getUsers = (req: Request, res: Response) => {
    const query: Query = {
        text: 'SELECT * FROM users ORDER BY id ASC',
        values: []
    }
    pool.query(query, (error, results): void => {
        if (error) {
            throw error;
        }
        res.status(200).json({totalUser:results.rows.length, users:results.rows});
    })
}

/** get all users api */
export const getUserById = (req: Request, res: Response): void => {
    const id: number = parseInt(req.params.id)
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows);
    })
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