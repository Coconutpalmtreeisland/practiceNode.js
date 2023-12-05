const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
const port = 5050;

app.use(express.static(path.join(__dirname, "../client/build")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { Post } = require("./Model/Post.js");
const { Counter } = require("./Model/Counter.js");

app.listen(port, () => {
    mongoose
        .connect(
            'mongodb+srv://ppiyoxia1215:ppiyoxia1215@cluster0.ejlg0vf.mongodb.net/blog?retryWrites=true&w=majority' // 이름 설정(db id): blog
        )
        .then(() => {
            console.log("listening -->" + port);
            console.log("mongoose --> connecting");
        })
        .catch((err) => {
            console.log(err);
        })
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

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

app.post("/api/post/list", (req, res) => {
    Post.find().exec()
        .then((doc) => {
            res.status(200).json({ success: true, postList: doc })
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ success: false });
        })
})

app.post("/api/post/detail", (req, res) => {
    Post.findOne({ postNum: req.body.postNum })
        .exec()
        .then((doc) => {
            console.log(doc);
            res.status(200).json({ success: true, post: doc })
        })
        .catch((err) => {
            res.status(400).json({ success: false })
        })
})

app.post("/api/post/edit", (req, res) => {
    let temp = {
        title: req.body.title,
        content: req.body.content
    }
    Post.updateOne({ postNum: Number(req.body.postNum) }, { $set: temp })
        .exec()
        .then(() => {
            res.status(200).json({ success: true })
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ success: false })
        })
})

app.post("/api/post/delete", (req, res) => {
    Post.deleteOne({ postNum: Number(req.body.postNum) })
        .exec()
        .then(() => {
            res.status(200).json({ success: true })
        })
        .catch((err) => {
            console.log(err)
            res.status(400).json({ success: false })
        })
})