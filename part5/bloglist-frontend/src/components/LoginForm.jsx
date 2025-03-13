const LoginForm = ({
  handleLogin,
  username,
  handleUsername,
  password,
  handlePassword,
}) => {
  return (
    <>
      <form onSubmit={handleLogin}>
        <div>
          Username{" "}
          <input
            type="username"
            name="Username"
            value={username}
            onChange={({ target }) => handleUsername(target.value)}
          />
        </div>
        <div>
          Password{" "}
          <input
            type="password"
            name="Password"
            value={password}
            onChange={({ target }) => handlePassword(target.value)}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default LoginForm;
