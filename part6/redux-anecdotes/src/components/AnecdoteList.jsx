import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { changeNotification } from "../reducers/notificationReducer";

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

  dispatch(changeNotification("testing message"));

  const vote = (id) => {
    dispatch(voteAnecdote(id));
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
