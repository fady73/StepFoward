import { NextApiRequest, NextApiResponse } from 'next';

import User from '../../models/user';
import dbConnect from '../../lib/mongodb';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../../lib/sendEmail';

// JWT Secret Key
const JWT_SECRET = process.env.JWT_SECRET || 'mySuperSecretKey123';

const generateResetToken = (id: string) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: '1h' }); // 1 hour expiration
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const { email } = req.body as { email: string };

  if (!email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const token = generateResetToken(user._id.toString());

  // Prepare the email content
  const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;
  const emailText = `You requested a password reset. Please click the following link to reset your password: ${resetUrl}\n\nIf you did not request this, please ignore this email.`;

  try {
    await sendEmail(user.email, 'Password Reset Request', emailText);
    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send email' });
  }
}
