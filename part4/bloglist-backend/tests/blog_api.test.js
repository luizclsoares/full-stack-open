const { test, beforeEach, after } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const Blog = require("../models/blog");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of helper.initialBlogs) {
    await new Blog(blog).save();
  }
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("blog list application returns the correct amount of blog posts", async () => {
  const response = await api.get("/api/blogs");

  assert.strictEqual(response.body.length, helper.initialBlogs.length);
});

test("unique identifier property of the blog posts is named id", async () => {
  const response = await api.get("/api/blogs");

  const keys = Object.keys(response.body[0]);

  assert(keys.includes("id"));
  assert(!keys.includes("_id"));
});

test("HTTP POST request to the /api/blogs URL successfully creates a new blog post", async () => {
  const blog = {
    title: "Random title",
    author: "Random author",
    url: "http://www.randomurl.com",
    likes: 100,
  };

  await api.post("/api/blogs").send(blog).expect(201);

  const response = await api.get("/api/blogs");
  const titles = response.body.map((r) => r.title);

  assert.strictEqual(response.body.length, helper.initialBlogs.length + 1);
  assert(titles.includes(blog.title));
});

test("if the likes property is missing from the request, it will default to the value 0", async () => {
  const blog = {
    title: "Random title",
    author: "Random author",
    url: "http://www.randomurl.com",
  };

  await api.post("/api/blogs").send(blog).expect(201);

  const response = await api.get("/api/blogs");
  assert.strictEqual(response.body.length, helper.initialBlogs.length + 1);

  const lastBlog = response.body[response.body.length - 1];
  assert.strictEqual(lastBlog.likes, 0);
});

test("if the title is missing, the backend responds to the request with the status code 400", async () => {
  const blog = {
    author: "Random author",
    url: "http://www.randomurl.com",
    likes: 100,
  };

  await api.post("/api/blogs").send(blog).expect(400);
});

test("if the url is missing, the backend responds to the request with the status code 400", async () => {
  const blog = {
    title: "Random title",
    author: "Random author",
    likes: 100,
  };

  await api.post("/api/blogs").send(blog).expect(400);
});

after(async () => {
  await mongoose.connection.close();
});
