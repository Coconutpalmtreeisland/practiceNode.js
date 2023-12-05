const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    postNum: Number,
    image: String,
}, { collection: "post" });

const Post = mongoose.model("Post", postSchema);


module.exports = { Post };