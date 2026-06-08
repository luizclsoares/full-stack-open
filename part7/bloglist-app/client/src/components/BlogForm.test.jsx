import { render, screen } from "@testing-library/react";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

test("the form calls the event handler it received as props with the right details when a new blog is created.", async () => {
  const createBlog = vi.fn();
  const user = userEvent.setup();

  render(<BlogForm createBlog={createBlog} />);

  const title = document.querySelector("#title");
  const author = document.querySelector("#author");
  const url = document.querySelector("#url");
  const saveButton = screen.getByText("Create");

  await user.type(title, "Random title");
  await user.type(author, "Random author");
  await user.type(url, "www.random-url.com");

  await user.click(saveButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("Random title");
  expect(createBlog.mock.calls[0][0].author).toBe("Random author");
  expect(createBlog.mock.calls[0][0].url).toBe("www.random-url.com");
});
