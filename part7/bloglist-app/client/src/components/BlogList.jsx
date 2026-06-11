import Blog from "./Blog";
import { Link } from "react-router-dom";
import { useBlogList } from "../store";

const BlogList = ({ updateBlog, deleteBlog }) => {
  const blogs = useBlogList();

  return (
    <div>
      <h2>Blogs</h2>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} {blog.author}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
