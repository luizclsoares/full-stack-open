import { useAnecdoteActions, useNotificationActions } from "../store";

const AnecdoteForm = () => {
  const { add } = useAnecdoteActions();
  const { notification } = useNotificationActions();

  const addAnecdote = async (e) => {
    e.preventDefault();

    const content = e.target.anecdote.value;

    await add(content);
    notification(`You create '${content}'`);

    e.target.reset();
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
