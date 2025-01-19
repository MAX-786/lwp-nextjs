import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../../db/lib/dbConnect';
import Todo from '../../../../db/models/Todo';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const { id } = req.query;

  switch (req.method) {
    case 'PATCH':
      try {
        const todo = await Todo.findById(id);
        if (!todo) {
          return res.status(404).json({ message: 'Todo not found' });
        }
        todo.completed = !todo.completed;
        await todo.save();
        res.status(200).json(todo);
      } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error });
      }
      break;
    case 'DELETE':
      try {
        const todo = await Todo.findByIdAndDelete(id);
        if (!todo) {
          return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(200).json({ message: 'Todo deleted' });
      } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error });
      }
      break;

    case 'GET':
      try {
        const todo = await Todo.findById(id);
        if (!todo) {
          return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(200).json(todo);
      } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error });
      }
      break;
    default:
      res.setHeader('Allow', ['PATCH', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}