const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
const port = 5050;

app.use(express.static(path.join(__dirname, "../client/build")));
// body-parser 설정해야 undefind가 아닌 클라이언트가 보낸 데이터를 받을 수 있음 하지만 업데이트 된 후 express에 포함되어 있음
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { Post } = require("./Model/Post.js");
const { Counter } = require("./Model/Counter.js");

app.listen(port, () => {
    mongoose
        .connect(
            'mongodb+srv://ppiyoxia1215:ppiyoxia1215@cluster0.ejlg0vf.mongodb.net/blog?retryWrites=true&w=majority'
        )
        .then(() => {
            console.log("listening -->" + port);
            console.log("mongoose --> connecting");
        })
        .catch((err) => {
            console.log(err);
        })
})

// 클라이언트 주소 연동
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
})

// 서버 주소 연동
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
})

// mongoDB에 전송
app.post("/api/post/submit", (req, res) => {
    let temp = req.body;
    // 넘버 추가 작업
    Counter.findOne({ name: "counter" })
        .exec()
        .then((counter) => {
            // counter 스키마 postNum 값 가져와서 temp에 저장
            temp.postNum = counter.postNum;

            const BlogPost = new Post(temp);
            BlogPost.save()
                .then(() => {
                    Counter.updateOne({ name: "counter" }, { $inc: { postNum: 1 } }).then(() => {
                        res.status(200).json({ success: true });
                    });
                })
        })
        .catch((err) => {
            console.log(err)
            res.status(400).json({ success: false });
        })
})

// DB에서 데이터 받기
app.post("/api/post/list", (req, res) => {
    Post.find().exec()
        .then((doc) => {
            res.status(200).json({ success: true, postList: doc })
        })
        .catch((err) => {
            console.log(err)
            res.status(400).json({ success: false })
        })
})