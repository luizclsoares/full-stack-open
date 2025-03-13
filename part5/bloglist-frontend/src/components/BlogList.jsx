import Blog from "./Blog";

const BlogList = ({ blogs, name }) => {
  return (
    <div>
      <h2>Blogs</h2>

      <p>{name} logged in</p>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
