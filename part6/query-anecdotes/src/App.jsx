import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { getAll, createAnecdote, updateAnecdote } from "./requests";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "CREATED":
      return `anecdote '${action.payload}' created`;
    case "VOTED":
      return `anecdote '${action.payload}' voted`;
    default:
      return null;
  }
};

const App = () => {
  const [message, messageDispatch] = useReducer(notificationReducer, null);
  const queryClient = useQueryClient();

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries("anecdotes");
    },
  });

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    messageDispatch({ type: "VOTED", payload: anecdote.content });
    setTimeout(() => {
      messageDispatch({ type: null });
    }, 5000);
  };

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote));
      messageDispatch({ type: "CREATED", payload: newAnecdote.content });
      setTimeout(() => {
        messageDispatch({ type: null });
      }, 5000);
    },
  });

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAll,
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (result.isLoading || result.isError || result.isPending) {
    return <div>anecdote service not available due to problems in server</div>;
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification message={message} />

      <AnecdoteForm anecdoteMutation={newAnecdoteMutation} />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
