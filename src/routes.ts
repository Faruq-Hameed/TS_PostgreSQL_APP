import express, { Router } from 'express'
import {getUsers} from './query'

export const app : Router = Router()

app.get('/', getUsers)