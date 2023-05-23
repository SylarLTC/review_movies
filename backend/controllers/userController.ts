import { Request, Response } from "express";
const User = require('../models/userModel')

// login user
const loginUser = async (req: Request, res: Response) => {
    res.json({mssg: 'login user'})
}

// signup user
const signupUser = async (req: Request, res: Response) => {
    const {email, password} = req.body;

    try {
        const user = await User.signup(email, password)

        res.status(200).json({email, user})
    } catch (err: any) {
        res.status(400).json({ error: err.message})
    }
}

module.exports = { loginUser, signupUser }