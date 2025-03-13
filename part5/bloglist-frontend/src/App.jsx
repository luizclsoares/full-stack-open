import { useState, useEffect } from "react";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const userJSON = window.localStorage.getItem("loggedBlogAppUser");

    if (userJSON) {
      setUser(JSON.parse(userJSON));
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
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
        <BlogList blogs={blogs} name={user.name} handleLogout={handleLogout} />
      )}
    </div>
  );
};

export default App;
