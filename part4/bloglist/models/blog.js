const mongoose = require("mongoose"); // ODM

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: 5,
    require: true,
  },
  author: {
    type: String,
    minLength: 2,
    require: true,
  },
  url: {
    type: String,
    minLength: 5,
    require: true,
  },
  likes: {
    type: Number,
    require: true,
  },
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Blog", blogSchema);
