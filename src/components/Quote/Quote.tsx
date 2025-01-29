import { fetchQuote } from "@/utils/fetchQuote";
import React from "react";

const Quote: React.FC<object> = async () => {
  const quote = await fetchQuote();
  return (
    <div>
      <p>Get inspired with a new quote every day!</p>
      {quote ? (
        <blockquote>
          <p>&quot;{quote.quote}&quot;</p>
          <footer>- {quote.author}</footer>
        </blockquote>
      ) : (
        <div>
          <p>Loading quote...</p>
        </div>
      )}
    </div>
  );
};

export default Quote;
