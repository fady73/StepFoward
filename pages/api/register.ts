import type { NextApiRequest, NextApiResponse } from 'next';

import User from '../../models/user';
import bcrypt from 'bcrypt';
import dbConnect from '../../lib/mongodb';
import fs from 'fs';
import multer from 'multer';

// Set up multer for file uploads
const upload = multer({ dest: '/tmp' });

// Helper function to handle file uploads
const handleFileUploads = (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
  upload.fields([
    { name: 'photoIdFront', maxCount: 1 },
    { name: 'photoIdBack', maxCount: 1 }
  ])(req, res, next);
};

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }

  // Handle file uploads
  await new Promise<void>((resolve, reject) => {
    // @ts-ignore
    handleFileUploads(req, res, (err: any) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });

  await dbConnect();

  
  const { email, password, confirmPassword } = req.body as { email: string; password: string; confirmPassword: string };
      // @ts-ignore
  const files = req?.files as any;

  if (!email || !password || !confirmPassword || !files.photoIdFront || !files.photoIdBack) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  try {
    const photoIdFrontPath = files.photoIdFront[0].path;
    const photoIdBackPath = files.photoIdBack[0].path;
    const photoIdFrontData = fs.readFileSync(photoIdFrontPath);
    const photoIdBackData = fs.readFileSync(photoIdBackPath);

    // Delete temporary files
    fs.unlinkSync(photoIdFrontPath);
    fs.unlinkSync(photoIdBackPath);

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      email,
      password: hashedPassword,
      photoIdFront: {
        data: photoIdFrontData,
        contentType: files.photoIdFront[0].mimetype,
      },
      photoIdBack: {
        data: photoIdBackData,
        contentType: files.photoIdBack[0].mimetype,
      },
      status: 'waiting',
      isAdmin: false
    });

    await user.save();

    res.status(201).json({ message: 'تم التسجيل بنجاح انتظر للمراجعه خلال ساعات' });
  } catch (error) {
    res.status(500).json({ error: "فى مشكله حصلت كلمنا على الصفحه او تليفون 01224999086" });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
