const express = require("express");
const path = require("path");
const moogoose = require("mongoose");
const { error } = require("console");

const app = express();
const port = 5050;

app.use(express.static(path.join(__dirname, "../client/build")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { Post } = require("./Model/Post");

app.listen(port, () => {
    moogoose.connect(
        "mongodb+srv://ppiyoxia1215:ppiyoxia1215@cluster0.ejlg0vf.mongodb.net/?retryWrites=true&w=majority"
    ).then(() => {
        console.log("listening --> " + port);
        console.log("connecting MongoDB...");
    }).catch((error) => {
        console.log(error)
    })
})

app.get("/", (req, res) => {
    res.send("hello")
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.post("/api/test", (req, res) => {
    const CommunityPost = new Post({ title: "test", content: "테스트 내용입니다." })
    CommunityPost.save().then(() => {
        res.status(200).json({ success: true })

    })
    // console.log(req.body);
})