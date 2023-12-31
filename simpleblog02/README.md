## 폴더 생성
mkdir client
mkeir server

## client
npx create-react-app .
npm install react-bootstrap bootstrap

## server
npm init;
npm init -y; ??
npm install express --save;
// 수정할 때마다 자동으로 인식해서 서버 열어줌
npm install nodemon --save;
// 서버랑 클라이언트 연결해줌
npm install path --save;
//몽고스 설치
npm install mongoose --save;

## 파일 생성
echo "" > README.md

## 제작과정
```bash
const express = require("express");
const app = express();
const port = 5050;

app.listen(port, () => {
    console.log("running --->" + port);
})

app.get("/", (req, res) => {
    res.send("Hello World")
})
```

- 클라이언트 파일에서 build 생성
`cd ./client`
`npm run build`

- 서버와 클라이언트 연동
```bash
app.use(express.static(path.join(__dirname, "../client/build")));
app.listen(port, () => {
    console.log("running --->" + port);
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
})
```

## mongoose
Database Access - readWriteAnyDatabase로 설정
Network Access - 0.0.0.0/0로 설정
Database Deployments -> connect drivers -> Add your connection string into your application code 복사 .connect() 안에 삽입

- 몽고디비 연동
```bash
const mongoose = require("mongoose");

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
```

- express 설치 과정