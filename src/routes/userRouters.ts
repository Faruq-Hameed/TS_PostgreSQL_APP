import express, { Router } from 'express'
import { getUsers, getUserById,createUser,updateUser,deleteUser } from '../query'

export const router: Router = Router()
//routes
router.post('/', createUser)
router.get('/', getUsers)
router.get('/:id', getUserById)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)