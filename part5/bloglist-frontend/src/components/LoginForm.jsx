import PropTypes from "prop-types";

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
            data-testid="username"
            name="Username"
            value={username}
            onChange={({ target }) => handleUsername(target.value)}
          />
        </div>
        <div>
          Password{" "}
          <input
            type="password"
            data-testid="password"
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

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  handleUsername: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  handlePassword: PropTypes.func.isRequired,
};

export default LoginForm;
