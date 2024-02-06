import express, { Application, Request, Response, NextFunction } from 'express';
import pool from './utils/pool';

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


