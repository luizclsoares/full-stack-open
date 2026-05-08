import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useAnecdotes } from "./hooks/useAnecdotes";
import useNotify from "./hooks/useNotify";

const App = () => {
  const { anecdotes, isPending, isError, updateAnecdote } = useAnecdotes();
  const { setNotification } = useNotify();

  const handleVote = (anecdote) => {
    updateAnecdote(anecdote);
    setNotification(`Anecdote '${anecdote.content}' voted`);

    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  if (isPending) {
    return <div>Loading data...</div>;
  } else if (isError) {
    return <div>Anecdote service not available due to problems in server</div>;
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

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
