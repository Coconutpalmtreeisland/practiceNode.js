// mongodb+srv://ppiyoxia1215:ppiyoxia@cluster0.ejlg0vf.mongodb.net/?retryWrites=true&w=majority
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
const port = 5050;

app.use(express.static(path.join(__dirname, "../client/build")));
app.listen(port, () => {
    mongoose
        .connect(
            "mongodb+srv://ppiyoxia1215:ppiyoxia@cluster0.ejlg0vf.mongodb.net/?retryWrites=true&w=majority"
        )
        .then(() => {
            console.log("running --->" + port);
            console.log("connecting ---> mongDB......");
        }).catch((err) => {
            console.log(err)
        })
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
})

// app.get("/sub", (req, res) => {
//     res.send("Hello Sub")
// })
// http://localhost:5050/sub 접속