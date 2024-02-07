import express, { Application, Request, Response, NextFunction } from 'express';
import pool from './utils/pool';
import { error } from 'console';
import {Query} from './utils/types'

/** get all users api */
export const getUsers = (req: Request, res: Response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results): void => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
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

// /**update user */ //Not yet tested
export const updateUser = (req: Request, res: Response) => {

    const id = parseInt(req.params.id);
    const { name, email } = req.body;

    const query: Query = {
        text: 'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
        values: [name, email, id]
    };
    pool.query(query, (error, results) => {
        if (error) {
            throw error;
        }
        res
            .status(200)
            .send(
                {
                    // message: `User modified with ID: ${results.rows[0].id}`,
                    message: `User modified with ID: ${id}`,
                    results
                })
    })
}

// export const updateUser = (req: Request, res: Response) => {
//     const id = parseInt(req.params.id)
//     const { name, email } = req.body
  
//     pool.query(
//       'UPDATE users SET name = $1, email = $2 WHERE id = $3',
//       [name, email, id],
//       (error, results) => {
//         if (error) {
//           throw error
//         }
//         res.status(200).send(`User modified with ID: ${id}`)
//       }
//     )
//   }