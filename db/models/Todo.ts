import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITodo extends Document {
  text: string;
  completed: boolean;
}

const TodoSchema: Schema<ITodo> = new Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, required: true, default: false },
});

const Todo: Model<ITodo> = mongoose.models.Todo || mongoose.model<ITodo>('Todo', TodoSchema);

export default Todo;