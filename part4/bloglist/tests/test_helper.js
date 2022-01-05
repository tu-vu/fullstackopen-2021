const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "HTML is easy",
    author: "Tu Vu",
    url: "https://www.google.com/",
    likes: 12,
  },
  {
    title: "Browser can execute only JavaScript",
    author: "Dan Abramov",
    url: "https://fullstackopen.com/en/about/",
    likes: 50,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({
    title: "asyn/await is cool",
    author: "Bebin",
    url: "https://www.google.com/",
    likes: 455,
  });

  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
};
