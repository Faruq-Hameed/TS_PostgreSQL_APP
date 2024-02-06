import express, { Router } from 'express'
import { getUsers, getUserById,createUser } from '../query'

export const router: Router = Router()

router.get('/', getUsers)
router.get('/:id', getUserById)
router.post('/', createUser)