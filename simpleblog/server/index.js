// mongodb+srv://ppiyoxia1215:@ppiyoxia@cluster0.ejlg0vf.mongodb.net/?retryWrites=true&w=majority
const express = require("express");
const path = require("path");
const app = express();
const port = 5000;

app.use(express.static(path.join(__dirname, "../client/build")))

app.listen(port, () => {
    console.log("running -->" + port);
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
})