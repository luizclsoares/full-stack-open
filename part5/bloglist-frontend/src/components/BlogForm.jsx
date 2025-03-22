import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = (e) => {
    e.preventDefault();

    createBlog({
      title,
      author,
      url,
    });

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="title"
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            id="author"
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            id="url"
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </>
  );
};

export default BlogForm;
