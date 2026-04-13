import { useState } from "react";
import { useParams } from "react-router-dom";

const Blog = ({ blog, handleLikes, handleRemove }) => {
  const updateBlog = () => {
    const copyBlog = { ...blog };
    copyBlog.likes += 1;

    handleLikes(copyBlog);
  };

  const removeBlog = () => {
    handleRemove(blog);
  };

  if (!blog) {
    return null;
  }

  return (
    <div>
      <div id="secondary-info">
        <h2>
          {blog.author}:{blog.title}
        </h2>
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          Likes {blog.likes} <button onClick={updateBlog}>Like</button>
        </div>
        <div>Added by {blog.user.name}</div>
        <button onClick={removeBlog}>Remove</button>
      </div>
    </div>
  );
};
export default Blog;
