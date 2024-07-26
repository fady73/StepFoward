// lib/auth.ts

import { NextApiRequest, NextApiResponse } from 'next';

import { JwtPayload } from 'types/jwt';
import jwt from 'jsonwebtoken';

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, "mySuperSecretKey123")as JwtPayload;
  } catch (error) {
    return null;
  }
};


export const authenticate = async (req: NextApiRequest, res?: NextApiResponse) => {
  // Get token from the Authorization header
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : authHeader;

  if (!token) {
    if (res) {
      res.status(401).json({ error: 'Not authenticated' });
    }
    return false;
  }

  try {
    console.log(verifyToken(token))
    const decoded = verifyToken(token);
    if (!decoded || !decoded.isAdmin) {
      if (res) {
        res.status(403).json({ error: 'Not authorized' ,decoded});
      }
      return false;
    }

    return true;
  } catch (error) {
    if (res) {
      res.status(401).json({ error: 'Invalid token' });
    }
    return false;
  }
};
