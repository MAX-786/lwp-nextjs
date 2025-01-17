import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../db/lib/dbConnect';
import User from '../../../db/models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    res.status(200).json({ email: user.email });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error });
  }
}