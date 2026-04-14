import PropTypes from "prop-types";
import { TextField, Button } from "@mui/material";

const LoginForm = ({
  handleLogin,
  username,
  handleUsername,
  password,
  handlePassword,
}) => {
  return (
    <>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <TextField
            label="Username"
            value={username}
            onChange={({ target }) => handleUsername(target.value)}
            fullWidth
          />
        </div>
        <div>
          <TextField
            type="password"
            label="Password"
            value={password}
            onChange={({ target }) => handlePassword(target.value)}
            fullWidth
            style={{ marginTop: "15px" }}
          />
        </div>

        <Button
          type="submit"
          variant="contained"
          style={{ marginTop: "15px" }}
          fullWidth
          size="large"
        >
          Login
        </Button>
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
