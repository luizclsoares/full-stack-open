import { useState, useEffect } from "react";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Blog from "./components/Blog";
import Users from "./components/Users";
import User from "./components/User";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { Link, Routes, Route, useMatch } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import {
  useBlogList,
  useBlogListActions,
  useLoginActions,
  useLogin,
} from "./store";
import {
  Container,
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
} from "@mui/material";

const App = () => {
  const navigate = useNavigate();

  const { initialize, add } = useBlogListActions();
  const { initialize: loginInitialize, logout } = useLoginActions();

  useEffect(() => {
    initialize();
  }, [initialize]);

  const user = useLogin();

  useEffect(() => {
    loginInitialize();
  }, [loginInitialize]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const style = { "&:hover": { bgcolor: "rgba(255,255,255,0.3)" } };

  return (
    <Container>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Blog App
            </Typography>

            <Button color="inherit" component={Link} to="/" sx={style}>
              Blogs
            </Button>

            <Button color="inherit" component={Link} to="/users" sx={style}>
              Users
            </Button>

            {!user ? (
              <Button color="inherit" component={Link} to="/login" sx={style}>
                Login
              </Button>
            ) : (
              <>
                <Button
                  color="inherit"
                  component={Link}
                  to="/create"
                  sx={style}
                >
                  New Blog
                </Button>

                <Button
                  variant="contained"
                  color="error"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>
      </Box>

      <Notification />

      <Routes>
        <Route
          path="/"
          element={
            <ErrorBoundary>
              <BlogList />
            </ErrorBoundary>
          }
        />

        <Route path="/login" element={<LoginForm />} />

        <Route path="/blogs/:id" element={<Blog />} />

        <Route path="/create" element={<BlogForm />} />

        <Route path="/users" element={<Users />} />

        <Route path="/users/:id" element={<User />} />

        <Route path="*" element={<h1>404 - Page not found</h1>} />
      </Routes>
    </Container>
  );
};

export default App;
