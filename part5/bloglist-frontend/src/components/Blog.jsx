import { useState } from "react";

const Blog = ({ blog, handleLikes, handleRemove }) => {
  const [infoVisibility, setInfoVisibility] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const visibility = { display: infoVisibility ? "" : "none" };

  const updateBlog = () => {
    const copyBlog = { ...blog };
    copyBlog.likes += 1;

    handleLikes(copyBlog);
  };

  const removeBlog = () => {
    handleRemove(blog);
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setInfoVisibility(!infoVisibility)}>
          {infoVisibility ? "hide" : "view"}
        </button>
      </div>

      <div style={visibility}>
        <div>{blog.url}</div>
        <div>
          Likes {blog.likes} <button onClick={updateBlog}>Like</button>
        </div>
        <div>{blog.author}</div>
        <button onClick={removeBlog}>Remove</button>
      </div>
    </div>
  );
};
export default Blog;
