import { Request, Response } from "express";
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id: string) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login user
const loginUser = async (req: Request, res: Response) => {
  res.json({ mssg: "login user" });
};

// signup user
const signupUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);

    // create a token
    const token = createToken(user._id)

    res.status(200).json({ email, token });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { loginUser, signupUser };
