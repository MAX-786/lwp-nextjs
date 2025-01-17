"use client";
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';

const TodosPage: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return <p>Redirecting to login...</p>;
  }

  return (
    <div>
      <h1>Your Todo List</h1>
      <p>Manage your tasks here.</p>
    </div>
  );
};

export default TodosPage;