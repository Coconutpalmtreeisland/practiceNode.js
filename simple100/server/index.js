const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const multer = require("multer");

const app = express();
const port = 5050;

// build 파일 참조
app.use(express.static(path.join(__dirname, "../client/build")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// 이미지 파일 참조
app.use("/image", express.static("./image"));

// 스키마 만들기
const { Post } = require("./Model/Post.js");
const { Counter } = require("./Model/Counter.js");


app.listen(port, () => {
    mongoose
        .connect(
            'mongodb+srv://ppiyoxia1215:ppiyoxia1215@cluster0.ejlg0vf.mongodb.net/reactBlog?retryWrites=true&w=majority'
        )
        .then(() => {
            console.log("listening -->" + port);
            console.log("mongoose --> connecting");
        })
        .catch((err) => {
            console.log(err);
        })
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// 글 쓰기
app.post("/api/post/write", (req, res) => {
    let temp = req.body;

    Counter.findOne({ name: "counter" })
        .exec()
        .then((counter) => {
            temp.postNum = counter.postNum;

            const BlogWrite = new Post(temp);
            BlogWrite
                .save()
                .then(() => {
                    Counter
                        .updateOne({ name: "counter" }, { $inc: { postNum: 1 } })
                        .then(() => {
                            res.status(200).json({ success: true })
                        })
                })
        })
        .catch((err) => {
            // console.log(err);
            res.status(400).json({ success: false });
        })

});

// 글 목록
app.post("/api/post/list", (req, res) => {
    Post.find()
        .exec()
        .then((result) => {
            res.status(200).json({ success: true, postList: result })
        })
        .catch((err) => {
            res.status(400).json({ success: false })
        })
});

// 글 상세페이지
app.post("/api/post/detail", (req, res) => {
    Post.findOne({ postNum: req.body.postNum })
        .exec()
        .then((result) => {
            res.status(200).json({ success: true, post: result });
        })
        .catch((err) => {
            res.status(400).json({ success: false });
        })
});

// 글 수정하기
app.post("/api/post/modify", (req, res) => {
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
});

// 글 삭제하기
app.post("/api/post/delete", (req, res) => {
    Post.deleteOne({ postNum: Number(req.body.postNum) })
        .exec()
        .then(() => {
            res.status(200).json({ success: true })
        })
        .catch((err) => {
            res.status(400).json({ success: false })
        })
})

// 이미지 업로드
// 이미지 파일에 저장
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'image/')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({ storage: storage }).single("file");

app.post("/api/post/image/upload", (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.status(400).json({ success: false });
        } else {
            res.status(200).json({ success: true, filePath: res.req.file.path })
        }
    })
})