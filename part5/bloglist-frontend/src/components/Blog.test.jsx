import { render } from "@testing-library/react";
import Blog from "./Blog";

test("displaying a blog renders the blog's title and author, but does not render its URL or number of likes by default", () => {
  const blog = {
    title: "Random title",
    author: "Random author",
    url: "www.random-url.com",
  };

  const handleLikes = vi.fn();
  const handleRemove = vi.fn();

  render(
    <Blog blog={blog} handleLikes={handleLikes} handleRemove={handleRemove} />
  );

  const mainInfo = document.querySelector("#main-info");
  const secondaryInfo = document.querySelector("#secondary-info");

  expect(mainInfo).toHaveStyle("display: block");
  expect(secondaryInfo).toHaveStyle("display: none");
});
