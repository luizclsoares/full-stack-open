const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (req, res, next) => {
  try {
    const blogs = await Blog.find({});

    res.json(blogs);
  } catch (err) {
    next(err);
  }
});

blogsRouter.get("/:id", async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (blog) {
      res.json(blog);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
});

blogsRouter.post("/", async (req, res, next) => {
  const blog = new Blog(req.body);

  try {
    const savedBlog = await blog.save();

    res.status(201).json(savedBlog);
  } catch (err) {
    next(err);
  }
});

blogsRouter.delete("/:id", async (req, res, next) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);

    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

blogsRouter.put("/:id", async (req, res, next) => {
  const body = req.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
      new: true,
      runValidators: true,
      context: "query",
    });

    res.json(updatedBlog);
  } catch (err) {
    next(err);
  }
});

module.exports = blogsRouter;
