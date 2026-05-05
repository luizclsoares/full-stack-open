const url = "http://localhost:3001/anecdotes";

export const getAnecdotes = async () => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch notes");
  }

  return await response.json();
};
