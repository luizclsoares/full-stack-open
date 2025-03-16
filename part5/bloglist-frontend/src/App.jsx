import { useState, useEffect, useRef } from "react";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [className, setClasseName] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(blogs.sort((a, b) => b.likes - a.likes));
    });
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
      setMessage("Wrong username or password");
      setClasseName("error");

      setTimeout(() => {
        setMessage("");
        setClasseName("");
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
  };

  const addBlog = async (blog) => {
    blogFormRef.current.toggleVisibility();

    try {
      const newBlog = await blogService.create(blog);

      setBlogs(blogs.concat(newBlog));

      setMessage(`A new blog ${newBlog.title} by ${newBlog.author} added.`);
      setClasseName("success");

      setTimeout(() => {
        setMessage("");
        setClasseName("");
      }, 5000);
    } catch (exception) {
      console.log("error");
    }
  };

  const updateBlog = async (blog) => {
    try {
      const updatedBlog = await blogService.update(blog);

      setBlogs(blogs.map((b) => (b.id !== blog.id ? b : updatedBlog)));
    } catch (err) {
      console.log(err.message);
    }
  };

  const blogFormRef = useRef();

  return (
    <div>
      {user === null ? <h2>Log in to application</h2> : <h2>Blogs</h2>}

      <Notification message={message} className={className} />

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
          <p>
            {user.name} logged in
            <button type="submit" onClick={handleLogout}>
              Logout
            </button>
          </p>

          <Togglable buttonLabel="New note" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>

          <BlogList blogs={blogs} updateBlog={updateBlog} />
        </div>
      )}
    </div>
  );
};

export default App;
