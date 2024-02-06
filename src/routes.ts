import express, { Router } from 'express'
import {getUsers} from './query'

export const router : Router = Router()

router.get('/', getUsers)