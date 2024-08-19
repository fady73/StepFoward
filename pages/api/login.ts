// pages/api/login.ts

import { NextApiRequest, NextApiResponse } from 'next';

import { JwtPayload } from 'types/jwt';
import User from '../../models/user';
import bcrypt from 'bcrypt';
import dbConnect from '../../lib/mongodb';
import jwt from 'jsonwebtoken';

// JWT Secret Key
const JWT_SECRET = process.env.JWT_SECRET || 'mySuperSecretKey123'; // Ensure this is securely managed

const generateToken = (user: JwtPayload) => {
  return jwt.sign(user, JWT_SECRET, { expiresIn: '1h' }); // Adjust expiration as needed
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const { email, password } = req.body as { email: string; password: string };

  if (!email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
 // @ts-ignore
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ error: 'المستخدم غير موجود' });
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    return res.status(401).json({ error: 'الباسورد او البريد الالكترونى غلط' });
  }

  if (user.status === 'waiting') {
    return res.status(403).json({ error: 'البريد الالكترونى فى مرحله المراجعه' });
  }

  // Generate JWT Token
  const token = generateToken({
    id: user._id.toString(),
    email: user.email,
    isAdmin: user.isAdmin || false 
  });

  res.status(200).json({ 
    message: 'Login successful', 
    token, 
    isAdmin: user.isAdmin || false 
  });}
