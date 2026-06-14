import { useState } from "react";
import PropTypes from "prop-types";
import { TextField, Button } from "@mui/material";
import { useLogin, useLoginActions, useNotificationActions } from "../store";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useLoginActions();
  const { notification, type } = useNotificationActions();

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(username, password);
      navigate("/");
      setUsername("");
      setPassword("");
    } catch (exception) {
      notification("Wrong username or password");
      type("error");
    }
  };

  return (
    <>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <TextField
            label="Username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            fullWidth
          />
        </div>
        <div>
          <TextField
            type="password"
            label="Password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
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

// LoginForm.propTypes = {
//   handleLogin: PropTypes.func.isRequired,
//   username: PropTypes.string.isRequired,
//   handleUsername: PropTypes.func.isRequired,
//   password: PropTypes.string.isRequired,
//   handlePassword: PropTypes.func.isRequired,
// };

export default LoginForm;
