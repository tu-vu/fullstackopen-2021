const mongoose = require("mongoose"); // ODM

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: 5,
    required: true,
  },
  author: {
    type: String,
    minLength: 2,
    required: true,
  },
  url: {
    type: String,
    minLength: 5,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
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
