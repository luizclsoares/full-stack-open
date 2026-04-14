import { useState, useEffect } from "react";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { Link, Routes, Route, useMatch } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Blog from "./components/Blog";
import {
  Container,
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
} from "@mui/material";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  const navigate = useNavigate();

  const match = useMatch("/blogs/:id");
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null;

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(blogs.sort((a, b) => b.likes - a.likes));
    });
  }, []);

  useEffect(() => {
    const userJSON = window.localStorage.getItem("loggedBlogAppUser");

    if (userJSON) {
      const user = JSON.parse(userJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      navigate("/");
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setNotification({ text: "Wrong username or password", type: "error" });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
    navigate("/");
  };

  const addBlog = async (blog) => {
    try {
      const newBlog = await blogService.create(blog);
      newBlog.user = user;

      setBlogs(blogs.concat(newBlog));
      navigate("/");
      setNotification({
        text: `A new blog ${newBlog.title} by ${newBlog.author} added.`,
        type: "success",
      });

      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (exception) {
      console.log("error");
    }
  };

  const updateBlog = async (blog) => {
    try {
      const updatedBlog = await blogService.update(blog);
      updatedBlog.user = blog.user;

      setBlogs(blogs.map((b) => (b.id !== blog.id ? b : updatedBlog)));
    } catch (err) {
      console.log(err.message);
    }
  };

  const deleteBlog = async (blog) => {
    const confirm = window.confirm(
      `Remove blog ${blog.title} by ${blog.author} ?`,
    );

    if (confirm) {
      try {
        await blogService.remove(blog.id);
        navigate("/");
        setBlogs(blogs.filter((b) => b.id !== blog.id));
      } catch (err) {
        console.log(err.message);
      }
    }
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

      <Notification notification={notification} />

      <Routes>
        <Route
          path="/"
          element={
            <BlogList
              blogs={blogs}
              updateBlog={updateBlog}
              deleteBlog={deleteBlog}
            />
          }
        />

        <Route
          path="/login"
          element={
            <LoginForm
              handleLogin={handleLogin}
              username={username}
              handleUsername={setUsername}
              password={password}
              handlePassword={setPassword}
            />
          }
        />

        <Route
          path="/blogs/:id"
          element={
            <Blog
              blog={blog}
              handleLikes={updateBlog}
              handleRemove={deleteBlog}
            />
          }
        />

        <Route path="/create" element={<BlogForm createBlog={addBlog} />} />
      </Routes>
    </Container>
  );
};

export default App;
