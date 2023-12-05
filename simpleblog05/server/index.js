const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
const port = 5050;

app.use(express.static(path.join(__dirname, "../client/build")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { Post } = require("./Model/Post.js");

app.listen(port, () => {
    mongoose
        .connect(
            'mongodb+srv://ppiyoxia1215:ppiyoxia1215@cluster0.ejlg0vf.mongodb.net/reactBlog?retryWrites=true&w=majority')
        .then(() => {
            console.log("lestening -->" + port);
            console.log("mongoose connecting...");
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get("/", (req, res) => {
    res.send("hello world");
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname), "../client/build/index.html");
})

// 서버가 db에 데이터를 전송
app.post("/api/post/submit", (req, res) => {
    // 성공하면 body에 들어있음
    let temp = req.body;
    console.log(temp);

    const BlogPost = new Post(temp);    // mysql의 insert와 같음, temp 받음
    BlogPost.save()
        .then(() => {    // DB에 temp 저장
            res.status(200).json({ success: true });
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ success: false });
        })
});

app.post("/api/post/list", (req, res) => {
    // 스키마 데이터 모두 가져오기 doc는 파일 이름 설정한 것 doc 파일을 postList에 넣음
    Post.find().exec()
        .then((doc) => {
            res.status(200).json({ success: true, postList: doc })
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ success: false });
        })
})