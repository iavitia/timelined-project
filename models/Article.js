const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  timeline: [
    {
      description: {
        type: String,
        required: true
      },
      source: {
        type: String,
        required: true
      }
    }
  ],
  tagList: [
    {
      type: String
    }
  ]
});

module.exports = User = mongoose.model("article", ArticleSchema);
