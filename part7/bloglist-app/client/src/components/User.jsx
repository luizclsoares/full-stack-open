import { useMatch } from "react-router-dom";
import { useUsers } from "../store";

const User = () => {
  const users = useUsers();

  const match = useMatch("/users/:id");
  const user = match ? users.find((user) => user.id === match.params.id) : null;

  return (
    <div>
      <h2>{user.name}</h2>

      <h4>Added blogs</h4>

      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
