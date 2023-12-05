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
        .connect('mongodb+srv://ppiyoxia1215:ppiyoxia1215@cluster0.ejlg0vf.mongodb.net/blog?retryWrites=true&w=majority')
        .then(() => {
            console.log("listening -->" + port);
            console.log("connect --> mongoDB");
        })
        .catch((err) => {
            console.log(err);
        })
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.post("/api/post/submit", (req, res) => {
    // 성공하면 body에 들어있음
    let temp = req.body;
    console.log(temp);

    const CommunityPost = new Post(temp)    // insert와 같음, temp 받음
    CommunityPost.save()
        .then(() => {       // temp 저장
            res.status(200).json({ success: true });
        })
        .catch((err) => {
            res.status(400).json({ success: false });
        })
});