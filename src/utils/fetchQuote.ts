export const fetchQuote = async () => {
    const response = await fetch('https://dummyjson.com/quotes/random').catch(err => { throw new Error(err) });
    const data = await response.json();
    return data;
  };