"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import styles from "./page.module.css";

interface Todo {
  _id: string;
  text: string;
  completed: boolean;
}

const TodosPage: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      fetchTodos();
    }
  }, [user, router]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("/api/todos");
      setTodos(response.data);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  };

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/todos", { text: newTodo });
      setTodos([...todos, response.data]);
      setNewTodo("");
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  };

  const handleToggleComplete = async (id: string) => {
    try {
      const response = await axios.patch(`/api/todos/${id}`);
      setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
    } catch (error) {
      console.error("Failed to toggle todo:", error);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await axios.delete(`/api/todos/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Your Todo List</h1>
      <form onSubmit={handleAddTodo} className={styles.form}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className={styles.input}
          placeholder="Add a new todo..."
          required
        />
        <button type="submit" className={styles.addButton}>
          Add Todo
        </button>
      </form>
      <ul className={styles.todoList}>
        {todos.map((todo) => (
          <li key={todo._id} className={styles.todoItem}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleComplete(todo._id)}
              className={styles.checkbox}
            />
            <Link href={`/todos/${todo._id}`} className={todo.completed ? styles.todoTextCompleted : styles.todoText}>
              {todo.text}
            </Link>
            <button
              onClick={() => handleDeleteTodo(todo._id)}
              className={styles.deleteButton}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodosPage;