const Total = ({ parts }) => {
  const exercises = parts.reduce((sum, part) => (sum += part.exercises), 0);

  return (
    <>
      <p>
        <strong>total of {exercises} exercises</strong>
      </p>
    </>
  );
};

export default Total;
