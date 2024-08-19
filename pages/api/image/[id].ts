// pages/api/image/[id].ts

import type { NextApiRequest, NextApiResponse } from 'next';

import User from '../../../models/user';
import dbConnect from '../../../lib/mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect();
    
    const { id } = req.query;
    // @ts-ignore
    const user = await User.findById(id as string).select('photoIdFront photoIdBack');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const photoId = req.query.photoId as string;

    if (photoId === 'front') {
      if (user.photoIdFront) {
        res.setHeader('Content-Type', user.photoIdFront.contentType);
        res.send(user.photoIdFront.data);
      } else {
        res.status(404).json({ error: 'Photo ID Front not found' });
      }
    } else if (photoId === 'back') {
      if (user.photoIdBack) {
        res.setHeader('Content-Type', user.photoIdBack.contentType);
        res.send(user.photoIdBack.data);
      } else {
        res.status(404).json({ error: 'Photo ID Back not found' });
      }
    } else {
      res.status(400).json({ error: 'Invalid photoId query parameter' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default handler;
