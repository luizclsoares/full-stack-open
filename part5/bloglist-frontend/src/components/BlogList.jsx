import Blog from "./Blog";

const BlogList = ({ blogs, name, handleLogout }) => {
  return (
    <div>
      <h2>Blogs</h2>

      <p>
        {name} logged in{" "}
        <button type="submit" onClick={handleLogout}>
          Logout
        </button>
      </p>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
