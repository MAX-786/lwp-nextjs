"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import styles from "./page.module.css";

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
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Todo Details</h1>
      
      <div className={styles.card}>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Task</span>
          <p className={styles.detailValue}>{todo.text}</p>
        </div>

        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Status</span>
          <span className={`${styles.status} ${todo.completed ? styles.statusCompleted : ''}`}>
            {todo.completed ? "Completed" : "Pending"}
          </span>
        </div>
      </div>

      <button 
        className={styles.backButton}
        onClick={() => router.push("/todos")}
      >
        Back to Todo List
      </button>
    </div>
  );
};

export default TodoDetailsPage;