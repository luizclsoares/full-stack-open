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
import { useBlogList } from "../store";

const Blog = ({ handleLikes, handleRemove }) => {
  const blogs = useBlogList();

  const match = useMatch("/blogs/:id");
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null;

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
