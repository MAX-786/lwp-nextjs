"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

interface Todo {
  _id: string;
  text: string;
  completed: boolean;
}

const TodoDetailsPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const [todo, setTodo] = useState<Todo | null>(null);

  const id = params?.id; 

  useEffect(() => {
    if (id) {
      fetchTodoDetails(id as string);
    }
  }, [id]);

  const fetchTodoDetails = async (todoId: string) => {
    try {
      const response = await axios.get(`/api/todos/${todoId}`);
      setTodo(response.data);
    } catch (error) {
      console.error("Failed to fetch todo details:", error);
      router.push("/todos"); 
    }
  };

  if (!todo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Todo Details</h1>
      <p>
        <strong>Text:</strong> {todo.text}
      </p>
      <p>
        <strong>Completed:</strong> {todo.completed ? "Yes" : "No"}
      </p>
      <button onClick={() => router.push("/todos")}>Back to Todo List</button>
    </div>
  );
};

export default TodoDetailsPage;
