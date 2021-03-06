// Router object is used for defining related routes
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({});
    response.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.get("/:id", async (request, response) => {
    const blog = await Blog.findById(request.params.id);
    if (blog) {
        response.json(blog.toJSON());
    } else {
        response.status(404).end();
    }
});

blogsRouter.post("/", async (request, response) => {
    const body = request.body;

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    });

    const savedBlog = await blog.save();
    response.json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
});

module.exports = blogsRouter;
