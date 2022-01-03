const _ = require("lodash");

const totalLikes = (blogs) => {
  const likesReducer = (totalLikes, blog) => totalLikes + blog.likes;
  return blogs.reduce(likesReducer, 0);
};

const favoriteBlog = (blogs) => {
  const mostLikes = Math.max(...blogs.map((blog) => blog.likes));
  return blogs.find((blog) => blog.likes === mostLikes);
};

const mostBlogs = (blogs) => {
  const topAuthor = _(blogs)
    .countBy((blog) => blog.author)
    .entries()
    .maxBy(_.last);
  return { author: topAuthor[0], blogs: topAuthor[1] };
};

const mostLikes = (blogs) => {
  const topAuthor = _.chain(blogs)
    .groupBy("author")
    .map((group, author) => {
      return {
        author: author,
        likes: group.reduce((acc, next) => {
          return (acc += next.likes);
        }, 0),
      };
    })
    .maxBy((object) => object.likes)
    .value();

  return topAuthor;
};

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
