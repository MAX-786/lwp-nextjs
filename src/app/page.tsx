// app/page.tsx
"use client";
import React, { useEffect, useState } from 'react';
import { fetchQuote } from '../utils/fetchQuote';

const HomePage: React.FC = () => {
  const [quote, setQuote] = useState<{ id: number; quote: string; author: string } | null>(null);

  useEffect(() => {
    const getQuote = async () => {
      const data = await fetchQuote();
      setQuote(data);
    };

    getQuote();
  }, []);

  return (
    <div>
      <h1>Welcome to the Todo List App</h1>
      <p>Get inspired with a new quote every day!</p>
      {quote && (
        <blockquote>
          <p>&quot;{quote.quote}&quot;</p>
          <footer>- {quote.author}</footer>
        </blockquote>
      )}
    </div>
  );
};

export default HomePage;