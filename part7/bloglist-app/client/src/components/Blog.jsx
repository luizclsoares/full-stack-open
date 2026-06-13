import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { useMatch } from "react-router-dom";
import { useBlogList, useBlogListActions } from "../store";
import { useNavigate } from "react-router-dom";

const Blog = () => {
  const blogs = useBlogList();
  const { update, remove } = useBlogListActions();

  const match = useMatch("/blogs/:id");
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null;

  const navigate = useNavigate();

  const updateBlog = async () => {
    const copyBlog = { ...blog };
    copyBlog.likes += 1;

    await update(copyBlog);
  };

  const removeBlog = async () => {
    const confirm = window.confirm(
      `Remove blog ${blog.title} by ${blog.author} ?`,
    );

    if (confirm) {
      try {
        await remove(blog.id);
        navigate("/");
      } catch (exception) {
        console.log("error");
      }
    }
  };

  if (!blog) {
    return null;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <h2>{blog.title}</h2>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <p>by {blog.author}</p>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <a href={blog.url}>{blog.url}</a>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <div>Added by {blog.user.name}</div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <div>
                <span style={{ marginRight: "8px" }}>Likes {blog.likes}</span>
                <Button
                  variant="outlined"
                  onClick={updateBlog}
                  style={{ marginRight: "8px" }}
                >
                  Like
                </Button>
                <Button variant="outlined" onClick={removeBlog} color="error">
                  Remove
                </Button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default Blog;
