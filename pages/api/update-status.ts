// pages/api/update-status.ts

import type { NextApiRequest, NextApiResponse } from 'next';

import User from '../../models/user';
import dbConnect from '../../lib/mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'PATCH') {
    return res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }

  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    await dbConnect();

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.status = 'active';
    await user.save();

    res.status(200).json({ message: 'User status updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default handler;
