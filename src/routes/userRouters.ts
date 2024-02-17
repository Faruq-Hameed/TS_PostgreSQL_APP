import express, { Router } from 'express'
import { getUsers, getUserById,createUser,updateUser,deleteUser } from '../query'
import{ getCachedUsers} from '../cache'

export const router: Router = Router()
//routes
router.post('/', createUser)
router.get('/users', getCachedUsers)
router.get('/', getUsers)
router.get('/:id', getUserById)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)
