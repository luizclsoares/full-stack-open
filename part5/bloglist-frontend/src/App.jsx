import { useState, useEffect } from "react";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const userJSON = window.localStorage.getItem("loggedBlogAppUser");

    if (userJSON) {
      const user = JSON.parse(userJSON);

      setUser(user.token);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log("error");
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
  };

  const addBlog = async (e) => {
    e.preventDefault();

    try {
      const newUser = await blogService.create({ title, author, url });

      setBlogs(blogs.concat(newUser));
      setTitle("");
      setAuthor("");
      setUrl("");
    } catch (exception) {
      console.log("error");
    }
  };

  return (
    <div>
      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          handleUsername={setUsername}
          password={password}
          handlePassword={setPassword}
        />
      ) : (
        <div>
          <h2>Blogs</h2>
          <p>
            {user.name} logged in{" "}
            <button type="submit" onClick={handleLogout}>
              Logout
            </button>
          </p>

          <BlogForm
            addBlog={addBlog}
            title={title}
            handleTitle={setTitle}
            author={author}
            handleAuthor={setAuthor}
            url={url}
            handleUrl={setUrl}
          />

          <BlogList
            blogs={blogs}
            name={user.name}
            handleLogout={handleLogout}
          />
        </div>
      )}
    </div>
  );
};

export default App;
