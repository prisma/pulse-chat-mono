import { Request, Response, NextFunction } from 'express'
import * as UserService from '../services/user.service'
import jwt from 'jsonwebtoken'

export async function signup(req: Request, res: Response, next: NextFunction) {
    const { email, name } = req.body
    const existing = await UserService.findUserByEmail(email)
    if ( existing ) {
        return res.status(401).json({
            message: 'User with that email address already exists.'
        })
    }
    
    const newUser = await UserService.createUser({
        email,
        name
    })

    return res.status(201).json({
        message: 'User created successfully.',
        user: newUser
    })
}

export async function signin(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body
    const user = await UserService.findUserByEmail(email)
    if ( !user ) {
        return res.status(401).json({
            accessToken: null,
            message: 'Invalid login.'
        })
    }

    const token = jwt.sign({
        id: user.id
    }, process.env.API_SECRET || '', {
        expiresIn: '1d'
    })

    return res.status(200).json({
        message: 'Login successful.',
        accessToken: token,
        user: { 
            id: user.id,
            name: user.name,
            email: user.email
        }
    })
}