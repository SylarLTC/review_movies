import { Request, Response } from "express";
const User = require('../models/userModel')

// login user
const loginUser = async (req: Request, res: Response) => {
    res.json({mssg: 'login user'})
}

// signup user
const signupUser = async (req: Request, res: Response) => {
    res.json({mssg: 'signup user'})
}

module.exports = { loginUser, signupUser }