import {
  useAnecdotes,
  useAnecdoteActions,
  useNotificationActions,
} from "../store";

const AnecdoteList = () => {
  const anecdotes = useAnecdotes().toSorted((a, b) => b.votes - a.votes);
  const { vote, remove } = useAnecdoteActions();
  const { notification } = useNotificationActions();

  const handleVote = (anecdote) => {
    vote(anecdote.id);
    notification(`You voted '${anecdote.content}'`);
  };

  const removeAnecdotes = () => {
    const confirm = window.confirm(
      "Are you sure you want to delete the anecdotes with 0 votes?",
    );

    if (confirm) {
      remove();
      notification("You have successfully removed all anecdotes with 0 votes.");
    }
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

      <div>
        Remove bad anecdotes
        <button
          style={{ marginTop: "20px", marginLeft: "5px" }}
          onClick={removeAnecdotes}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default AnecdoteList;
