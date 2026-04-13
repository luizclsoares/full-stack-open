import Blog from "./Blog";

const BlogList = ({ blogs, updateBlog, deleteBlog }) => {
  return (
    <div>
      <h2>Blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLikes={updateBlog}
          handleRemove={deleteBlog}
        />
      ))}
    </div>
  );
};

export default BlogList;
