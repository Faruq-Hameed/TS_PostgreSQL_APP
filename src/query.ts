import express, { Application, Request, Response, NextFunction } from 'express';


const getUsers = (req: Request, res: Response) =>{
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results):void =>{
        if(error){
            throw error;
        }
        res.status(200).json(results.rows);
    })
}