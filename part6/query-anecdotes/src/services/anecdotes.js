const url = "http://localhost:3001/anecdotes";

export const getAnecdotes = async () => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch notes");
  }

  return await response.json();
};

export const createAnecdote = async (anecdote) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(anecdote),
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error("Failed to create anecdote");
  }

  return await response.json();
};
