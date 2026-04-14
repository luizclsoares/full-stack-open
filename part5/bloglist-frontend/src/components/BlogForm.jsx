import { useState } from "react";
import { TextField, Button } from "@mui/material";

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
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            style={{ marginBottom: "15px" }}
          />
        </div>
        <div>
          <TextField
            label="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            fullWidth
            style={{ marginBottom: "15px" }}
          />
        </div>
        <div>
          <TextField
            label="Url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            fullWidth
            style={{ marginBottom: "15px" }}
          />
        </div>
        <Button type="submit" variant="contained" size="large" fullWidth>
          Create
        </Button>
      </form>
    </>
  );
};

export default BlogForm;
