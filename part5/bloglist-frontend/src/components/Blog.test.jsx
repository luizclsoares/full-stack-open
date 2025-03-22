import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

test("the blog's URL and number of likes are shown when the button controlling the shown details has been clicked", async () => {
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

  const secondaryInfo = document.querySelector("#secondary-info");

  const user = userEvent.setup();
  const button = screen.getByText("view");

  expect(secondaryInfo).toHaveStyle("display: none");

  await user.click(button);

  expect(secondaryInfo).toHaveStyle("display: block");
});
