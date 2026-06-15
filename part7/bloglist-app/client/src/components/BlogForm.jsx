import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useBlogListActions, useNotificationActions } from "../store";
import { useNavigate } from "react-router-dom";
import useField from "../hooks/useField";

const BlogForm = () => {
  const title = useField("text");
  const author = useField("text");
  const url = useField("text");

  const { add } = useBlogListActions();
  const { notification, type } = useNotificationActions();

  const navigate = useNavigate();

  const addBlog = async (e) => {
    e.preventDefault();

    try {
      await add({ title: title.value, author: author.value, url: url.value });

      navigate("/");
      notification(`A new blog ${title.value} by ${author.value} added.`);
      type("success");
    } catch (exception) {
      console.log("error");
    }
  };

  return (
    <>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <div>
          <TextField
            {...title}
            label="Title"
            fullWidth
            style={{ marginBottom: "15px" }}
          />
        </div>
        <div>
          <TextField
            {...author}
            label="Author"
            fullWidth
            style={{ marginBottom: "15px" }}
          />
        </div>
        <div>
          <TextField
            {...url}
            label="Url"
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
