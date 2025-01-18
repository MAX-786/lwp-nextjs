
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../../db/lib/dbConnect';
import Todo from '../../../../db/models/Todo';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        const todos = await Todo.find({});
        res.status(200).json(todos);
      } catch (error) {
        res.status(500).json({ error: error, message: 'Internal server error' });
      }
      break;
    case 'POST':
      try {
        const { text } = req.body;
        const newTodo = new Todo({
          text,
          completed: false,
        });
        await newTodo.save();
        res.status(201).json(newTodo);
      } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}