import { useDispatch } from "react-redux";
import {
  createNotification,
  removeNotification,
} from "../reducers/notificationReducer";
import { createAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (e) => {
    e.preventDefault();

    const content = e.target.anecdote.value;
    e.target.anecdote.value = "";

    dispatch(createNotification(`You created '${content}'`));

    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);

    dispatch(createAnecdote(content));
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
