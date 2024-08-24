// pages/api/waiting-list.ts
// @ts-nocheck

import type { NextApiRequest, NextApiResponse } from 'next';

import NextCors from 'nextjs-cors';
import User from '../../models/user';
import { authenticate } from '../../lib/auth';
import dbConnect from '../../lib/mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  if (req.method !== 'GET') {
    return res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }

  // Check for authentication and authorization
  const isAdmin = await authenticate(req, res);
  if (!isAdmin) return;

  await dbConnect();

  try {
    // @ts-ignore
    const users = await User.find({ $or: [{ isAdmin: null }, { isAdmin: false }] }).lean();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default handler;
