const BlogForm = ({
  addBlog,
  title,
  handleTitle,
  author,
  handleAuthor,
  url,
  handleUrl,
}) => {
  return (
    <>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type="text"
            value={title}
            onChange={(e) => handleTitle(e.target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            onChange={(e) => handleAuthor(e.target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            onChange={(e) => handleUrl(e.target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </>
  );
};

export default BlogForm;
