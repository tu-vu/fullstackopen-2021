const mongoose = require("mongoose");
const supertest = require("supertest"); // Easy way to test http requests
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app); // Wrap app into a superagent object which can make http requests

const Blog = require("../models/blog");

// Initialize database before every test
beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

test("Blog are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 100000);

test("All blogs are returned", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("A specific blog is within the returned blogs", async () => {
  const response = await api.get("/api/blogs");

  const titles = response.body.map((r) => r.title);

  expect(titles).toContain("Browser can execute only JavaScript");
});

test("A valid blog can be added", async () => {
  const newBlog = {
    title: "async/await simplifies making async calls",
    author: "Anonymouse",
    url: "https://www.google.com/",
    likes: 50,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const titles = blogsAtEnd.map((r) => r.title);
  expect(titles).toContain("async/await simplifies making async calls");
});

test("Blog without title is not added", async () => {
  const newBlog = {
    author: "Anonymouse",
    url: "https://www.google.com/",
    likes: 50,
  };

  await api.post("/api/blogs").send(newBlog).expect(400);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
});

test("A specific blog can be viewed", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToView = blogsAtStart[0];

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const processedBlogToView = JSON.parse(JSON.stringify(blogToView));

  expect(resultBlog.body).toEqual(processedBlogToView);
});

test("A blog can be deleted", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToDelete = blogsAtStart[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

  const titles = blogsAtEnd.map((blog) => blog.title);
  expect(titles).not.toContain(blogToDelete.title);
});

// Close connection to database after all tests are copmleted
afterAll(() => {
  mongoose.connection.close();
});
