import {body} from 'express-validator'


export const loginValidation = [
    body('email', 'Wrong email format').isEmail(),
    body('password', 'password must have at least 3 char').isLength({min: 5}),
]

export const registerValidation = [
    body('email', 'Wrong email format').isEmail(),
    body('password', 'password must have at least 3 char').isLength({min: 5}),
    body('fullName', 'Put your name').isLength({min: 3}),
    body('avatarUrl', 'Uncorrect link to avatar').optional().isURL()
]

export const postCreateValidation = [
    body('title', 'Write a title of article').isLength({min: 3}).isString(),
    body('text', 'Write a text of article').isLength({min: 10}).isString(),
    body('tags', 'Wrong tags format').optional().isArray(),
    body('avatarUrl', 'Uncorrect link to avatar').optional().isString()
]

