import { useAnecdotes } from "../hooks/useAnecdotes";
import useNotify from "../hooks/useNotify";

const AnecdoteForm = () => {
  const { addAnecdote } = useAnecdotes();
  const { setNotification } = useNotify();

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.reset();
    addAnecdote(content);

    setNotification(`Anecdote '${content}' was created`);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
