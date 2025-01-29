const Find = ({ filter, handleChange }) => {
  return (
    <>
      find countries <input value={filter} onChange={handleChange} />
    </>
  );
};

export default Find;
