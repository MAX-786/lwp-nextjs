import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../db/lib/dbConnect';
import User from '../../../db/models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ email, password });
    await user.save();

    res.status(201).json({ email: user.email });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error });
  }
}