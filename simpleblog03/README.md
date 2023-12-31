## 초기 설정
- 폴더 생성   
    > mkdir client      
    mkdir server

- README 파일 생성
    > echo "" > README.md   

- client 플러그인 설치   
    > cd client   
    npx create-react-app .   
    npm install react-router-dom  
    // ?   
    npm install axios
    // ?   
    npm install http-proxy-middleware
    // ?   
    npm install react-bootstrap bootstrap

- server 플러그인 설치 
    > cd ..   
    cd server   
    npm init -y;  
    // ?   
    npm install express --save;   
    // 수정할 때마다 자동으로 인식해서 서버 열어줌   
    npm install nodemon --save;   
    // 서버랑 클라이언트 연결해줌
    npm install path --save;
    //몽고스 설치   
    npm install mongoose --save;

## 제작과정
<details>
<summary>데이터 추가 방법</summary>

```javascript
import React, { useState } from 'react'

const App = () => {
const [temp, setTemp] = useState([1, 2, 3]);

return (
    <div>
    <h1>React</h1>
    {temp}
    <br />
    <button
        onClick={() => {
            let arr = [];
            arr = [...temp];
            arr.push(4);
            setTemp([...arr]);
        }}
    >
        버튼</button>
    </div>
)
}

export default App
```

</details>

<details>

<summary>데이터 추가 방법</summary>

```javascript
import React, { useState } from 'react'

const App = () => {
const [content, setContent] = useState("");
const [contentList, setContentList] = useState([]);

const onSubmit = () => {
    let tempArr = [...contentList];
    tempArr.push(content)
    setContentList([...tempArr]);
}

return (
    <div>
    <h1>React</h1>
    <div>
        {contentList.map((content, key) => (
        <div key={key}>{content}</div>
        ))}
    </div>
    <input
        type='text'
        value={content}
        onChange={(e) => {
        // console.log(e.currentTarget.value)
        setContent(e.currentTarget.value)
        }}
    />
    <br />
    <button
        onClick={() => {
        onSubmit();
        }}
    >입력</button>
    </div>
)
}

export default App
```
</details>

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
```javascript
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
```javascript
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

- index.js 파일과 같은 위치에 setupProxy.js 생성

```javascript
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        "/api",
        createProxyMiddleware({
            target: "http://localhost:5050",
            changeOrigin: true,
        })
    );
};
```