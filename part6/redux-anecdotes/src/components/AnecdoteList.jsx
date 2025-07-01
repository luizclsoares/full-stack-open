import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import {
  createNotification,
  removeNotification,
} from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (!filter) {
      return anecdotes;
    } else {
      return anecdotes.filter((anecdote) => anecdote.content.includes(filter));
    }
  });

  const dispatch = useDispatch();

  [...anecdotes].sort((a, b) => b.votes - a.votes);

  const vote = (id) => {
    const anecdote = anecdotes.find((anecdote) => anecdote.id === id);

    dispatch(voteAnecdote(anecdote));
    dispatch(createNotification(`you voted '${anecdote.content}'`));

    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
