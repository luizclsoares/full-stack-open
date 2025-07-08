import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { getAll, createAnecdote } from "./requests";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

const App = () => {
  const queryClient = useQueryClient();

  const handleVote = (anecdote) => {
    console.log("vote");
  };

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote));
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

      <Notification />
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
