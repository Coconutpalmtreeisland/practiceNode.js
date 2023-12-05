const mongoose = require("mongoose");

// 스키마 생성 = sql 테이블 생성
const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    postNum: Number,
}, { collection: "posts" });   // 이름 설정

const Post = mongoose.model("Post", postSchema);


module.exports = { Post };