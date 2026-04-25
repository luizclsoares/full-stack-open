import {
  useAnecdotes,
  useAnecdoteActions,
  useNotificationActions,
} from "../store";

const AnecdoteList = () => {
  const anecdotes = useAnecdotes().toSorted((a, b) => b.votes - a.votes);
  const { vote } = useAnecdoteActions();
  const { notification } = useNotificationActions();

  const handleVote = (anecdote) => {
    vote(anecdote.id);
    notification(`You voted '${anecdote.content}'`);
  };

  return (
    <div>
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

export default AnecdoteList;
