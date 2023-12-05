const mongoose = require("mongoose");

// 스키마 생성 sql 테이블 생성과 같음
const postSchema = new mongoose.Schema({
    title: String,
    content: String,
}, { collection: "posts" });

const Post = mongoose.model("Post", postSchema);


module.exports = { Post };