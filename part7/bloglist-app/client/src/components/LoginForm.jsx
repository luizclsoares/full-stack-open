import { useState } from "react";
import PropTypes from "prop-types";
import { TextField, Button } from "@mui/material";
import { useLogin, useLoginActions, useNotificationActions } from "../store";
import { useNavigate } from "react-router-dom";
import useField from "../hooks/useField";

const LoginForm = () => {
  const username = useField("text");
  const password = useField("password");

  const { login } = useLoginActions();
  const { notification, type } = useNotificationActions();

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(username.value, password.value);
      navigate("/");
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
          <TextField {...username} label="Username" fullWidth />
        </div>
        <div>
          <TextField
            {...password}
            label="Password"
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

export default LoginForm;
