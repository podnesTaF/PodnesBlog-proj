import express from 'express'
import multer from 'multer'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import {loginValidation, postCreateValidation, registerValidation} from './validations.js'
import { validationResult } from 'express-validator'
import {UserController, PostController} from './controllers/index.js'
import checkAuth from './utils/checkAuth.js'
import handleValErrors from './utils/handleValErrors.js'

mongoose.connect('mongodb+srv://podnes:podnes1972@cluster0.ftmulps.mongodb.net/blog?retryWrites=true&w=majority').then(() => {
    console.log('DB ok')
}).catch((err) => {
    console.log('db ERR', err)
})

const app = express()

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({storage})

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'))

app.post('/auth/login', loginValidation, handleValErrors, UserController.login)

app.post('/auth/register', registerValidation, handleValErrors, UserController.register)

app.get('/auth/me', checkAuth, UserController.getMe)

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    })
})

app.get('/tags', PostController.getLastTags)
app.get('/posts', PostController.getAll)
app.get('/posts/tags', PostController.getLastTags)
app.get('/posts/:id', PostController.getOne)
app.post('/posts', checkAuth, postCreateValidation, handleValErrors, PostController.create)
app.delete('/posts/:id', checkAuth, PostController.remove)
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValErrors, PostController.update)

app.listen(4444, (err) => {
    if(err) {
        return console.log(err)
    }else {
        console.log('server Ok')
    }

})