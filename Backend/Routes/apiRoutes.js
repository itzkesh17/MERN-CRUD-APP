import express from 'express'
import { createUser, readAllUsers, readUser, updateUser, deleteUser } from '../CRUD/apiController.js'

const route = express.Router()

route.post("/create", createUser)

route.get("/read", readAllUsers)

route.get("/read/:id", readUser)

route.patch("/update/:id", updateUser)

route.delete("/delete/:id", deleteUser)

export default route;