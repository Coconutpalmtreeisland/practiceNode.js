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
    // 보안?   
    npm install http-proxy-middleware
    // ?   
    npm install react-bootstrap bootstrap
    // ? css를 jacascript 파일로 생성
    npm install @emotion/css
    npm install @emotion/react
    npm install @emotion/styled

- 클라이언트 파일에서 build 생성  
`cd ./client`  
`npm run build`

- server 플러그인 설치 
    > cd ..   
    cd server   
    npm init -y;  
    // nodeJS를 사용한 REST 서버를 편리하게 구현하는 프레임워크 설치   
    npm install express --save;   
    // 수정할 때마다 자동으로 인식해서 서버 열기   
    npm install nodemon --save;   
    // 서버랑 클라이언트 연결
    npm install path --save;
    //몽고스 설치   
    npm install mongoose --save;

    - package.json 이거 왜 해?
    ```javascript
    "scripts": {
        "start": "nodemon index.js"
    }
    ```

## 제작과정
### 1. server의 index.js 서버 셋팅하기
- 기본 예시
```javascript
const express = require("express");
const app = express();
const port = 5050;

app.listen(port, () => {
    console.log("running --->" + port);
})

app.get("/", (req, res) => {
    res.send("Hello World") // JSON 응답
})
```
## mongoose
Database Access - readWriteAnyDatabase로 설정
Network Access - 0.0.0.0/0로 설정
Database Deployments -> connect drivers -> Add your connection string into your application code 복사 .connect() 안에 삽입

```javascript
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
const port = 5050;

app.use(express.static(path.join(__dirname, "../client/build")));   // 기본 값 주소 설정

// 서버와 mongoDB 연동
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
// 배포할 때 사용?
// 클라이언트 주소 build 연동
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// 서버 주소 build 연동
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});
```

### 2. components 파일 생성

- APP.js 다른 js 파일을 연동
```javascript
import React from 'react'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Upload from './components/Upload'
import List from './components/List'

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/upload' element={<Upload />}></Route>
        <Route path='/list' element={<List />}></Route>
      </Routes>
    </div>
  )
}

export default App
```

## Bootstrap
- Heading.js
```javascript
// https://react-bootstrap.netlify.app/docs/components/navbar/
// https://react-bootstrap.netlify.app/docs/getting-started/introduction - public index.html에 css 연동
import React from 'react'
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap"

const Heading = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Heading
```
- public의 index.html
```javascript
// https://react-bootstrap.netlify.app/docs/getting-started/introduction
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
    integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous" />  {/* css 연동 */}
</head>

<body>
    <div id="root"></div>
</body>

</html>
```
- client의 index.js BrowserRouter 설정 
<!-- BrowserRouter가 무엇인지 적기 -->
```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

```

### 3. 
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

- server의 index.js 서버 요청 받았음 및 list에게 데이터 전송
```javascript
app.post("/api/test", (req, res) => {
    console.log(req);
    res.status(200).json({ success: true, text: "안녕하세요!" });   // 서버에서 클라이언트에게 데이터 전송
})
```

- list.js 서버가 보낸 데이터 클라이언트 (list)가 받음
```javascript
import React, { useEffect, useState } from 'react'
import axios from 'axios';

const List = () => {
    const [text, setText] = useState("");

    useEffect(() => {
        axios
            .post("/api/test")
            .then((response) => {
                alert("요청 성공");
                // 서버에서 보낸 데이터 출력
                setText(response.data.text);
                console.log(response)
            })
            .catch((err) => {
                alert("요청 실패");
                console.log(err)
            })
    }, [])
    return (
        <div>List
            <p>서버에서 받은 데이터 : {text}</p>
        </div>
    )
}

export default List
```

- list.js 클라이언트가 서버에 데이터 보내기
```javascript
import React, { useEffect, useState } from 'react'
import axios from 'axios';

const List = () => {
    const [text, setText] = useState("");


    useEffect(() => {
        // 서버에 데이터 전송
        let body = {
            text: "안녕하세요~"
        }

        axios
            .post("/api/test", body)
            .then((response) => {
                alert("요청 성공");
                // 서버에 있는 데이터 출력
                setText(response.data.text);
                console.log(response)
            })
            .catch((err) => {
                alert("요청 실패");
                console.log(err)
            })
    }, [])
    return (
        <div>List
            <p>서버에서 받은 데이터 : {text}</p>
        </div>
    )
}

export default List
```

- 서버가 클라이언트가 보낸 데이터 받기
```javascript
// body-parser 설정해야 undefind가 아닌 클라이언트가 보낸 데이터를 받을 수 있음 하지만 업데이트 된 후 express에 포함되어 있음
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/test", (req, res) => {
    console.log(req.body)
    res.status(200).json({ success: true, text: "서버에서 클라이언트에게 보내는 데이터" }); // 서버에서 클라이언트에게 데이터 전송
});
```

## 스키마 생성
- server Model 폴더 생성 Post.js 파일 생성
```javascript
const mongoose = require("mongoose");

// 스키마 생성 = sql 테이블 생성
const postSchema = new mongoose.Schema({
    title: String,
    content: String,
}, {collection: "post"});   // 이름 설정

const Post = mongoose.model("Post", postSchema);


module.exports = { Post };
```

- server index.js 서버와 스키마 연동 후 MongoDB에 임의로 데이터 전송
```javascript
const { Post } = require("./Model/Post.js");

// mongoDB에 전송
app.post("/api/test", (req, res) => {
    const BlogPost = new Post({ title: "안녕하세요", content: "내용입니다."})
    BlogPost.save().then(() => {
        res.status(200).json({ success: true });
    })
})
```

## Emotion
- style 폴더 UploadCSS.js 생성

```javascript
import styled from "@emotion/styled";

const UploadDiv = styled.div`
    width: 100%;
`

const UploadTitle = styled.h3`
    text-align: center;
`

const UploadForm = styled.form`
    width: 500px;
    margin: 0 auto;

    label {
        display: block;
    }
    input {
        width: 100%;
        padding: 10px;
    }
    textarea {
        width: 100%;
        height: 300px;
        resize: none;
        padding: 10px;
    }
`

const UploadButton = styled.div`
    button {
        border: 1px solid #000;
        background: #ccc;
        width: 100%;
        padding: 10px;
    }
`

export { UploadDiv, UploadTitle, UploadForm, UploadButton };
```

- Upload.js 버튼 컴포넌트화

```javascript
import React, { useState } from 'react'
import { UploadDiv, UploadTitle, UploadForm, UploadButton } from "../style/UploadCSS.js"

const Upload = () => {
    // 
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        alert("dd")
    }

    return (
        <UploadDiv>
            <UploadTitle>
                글을 작성해 주세요!!
            </UploadTitle>
            <UploadForm>
                <label htmlFor='title'>제목</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.currentTarget.value);
                    }}
                ></input>

                <label htmlFor='content'>내용</label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => {
                        setContent(e.currentTarget.value);
                    }}
                ></textarea>

                <UploadButton>
                    <button
                        onClick={(e) => {
                            onSubmit(e);
                        }}
                    >저장하기</button>
                </UploadButton>
            </UploadForm>
        </UploadDiv>
    )
}

export default Upload
```


### 4. 클라이언트 - 서버 - 데이터베이스 연동 데이터 주고 받기
- client Upload.js 데이터를 서버에 전송
```javascript
if (title === "" || content === "") {
            return alert("내용을 작성해주세요!");
        }

        // 값이 있으면 보냄
        let body = {
            title: title,
            content: content
        }

        axios
            .post("/api/post/submit", body)
            .then((response) => {
                if (response.data.success) {
                    // 데이터가 잘 전송됨
                    alert("글 작성이 완료되었습니다.");
                } else {
                    alert("글 작성이 실패하였습니다");
                }
            })
```

- server index.js 클라이언트에게 받은 데이터 MongoDB에 전송
```javascript
// mongoDB에 전송
app.post("/api/post/submit", (req, res) => {
    // 성공하면 body에 들어있음
    let temp = req.body;
    console.log(temp)

    const BlogPost = new Post(temp);    // mysql의 insert와 같음, temp 받음
    BlogPost.save()
        .then(() => {   // DB에 temp 저장
            res.status(200).json({ success: true });
        })
        .catch((err) => {
            res.status(400).json({ success: false });
        })
})
```

- list.js DB에 있는 데이터 불러오기
```javascript
import React, { useEffect, useState } from 'react'
import axios from 'axios';

const List = () => {
    // 서버가 DB에서 데이터 받아와서 클라이언트가 받아서 화면에 출력
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        axios
            .post("/api/post/list")
            .then((response) => {
                if (response.data.success) {
                    setPostList([...response.data.postList]);   // ?
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <div>
            <h3>글 목록</h3>
            {postList.map((post, key) => (
                <div key={key}>
                    <h4>제목: {post.title}</h4>
                    <p>내용: {post.content}</p>
                </div>
            ))}
        </div>
    )
}

export default List
```

- client index.js  DB에서 데이터 받기
```javascript
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
```

## Counter 스키마 생성
```
const mongoose = require("mongoose");

const countSchema = new mongoose.Schema(
    {
        name: String,
        postNum: Number,
    },
    { collection: "counter" });

const Counter = mongoose.model("Counter", countSchema);

module.exports = { Counter };
```

- Post.js 추가
```
    postNum: Number,

```
- server index.js Counter 연동
```
const { Counter } = require("./Model/Counter.js");
```
- 임의로 몽고DB의 conter에 데이터 저장

name: "counter" String
postNum: "1" Int32


- upload.js
```
import { useNavigate } from 'react-router-dom';

// 글 작성 후 페이지 이동될 경로 설정
    let navigate = useNavigate();

axios
    .post("/api/post/submit", body)
    .then((response) => {
        if (response.data.success) {
            // 데이터가 잘 전송됨
            alert("글 작성이 완료되었습니다.");
            navigate("/list");
        } else {
            alert("글 작성이 실패하였습니다");
        }
    })
```

## Taliwindcss



## 클라이언트 - 서버 - 데이터베이스 연동 데이터 주고 받기
- client Upload.js 데이터 서버에 전송
```javascript
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { UploadDiv, UploadTitle, UploadForm, UploadButton } from "../style/UploadCSS.js";
import axios from 'axios';

const Upload = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    let navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();

        if (title === "" || content === "") {
            return alert("제목 또는 내용을 적어주세요!");
        }

        // 값이 있으면 보냄
        let body = {
            title: title,
            content: content
        }

        axios
            .post("/api/post/submit", body)
            .then((response) => {
                if (response.data.success) {
                    alert("글 작성이 완료되었습니다.")
                    navigate("/list");
                } else {
                    alert("글 작성이 실패했습니다.")
                }
            })
    }

    return (
        <UploadDiv>
            <UploadTitle>
                글을 작성해 주세요!
            </UploadTitle>
            <UploadForm>
                <lavel htmlFor='title'>제목</lavel>
                <input
                    type='text'
                    id='title'
                    value={title}
                    onChange={(e) => {
                        setTitle(e.currentTarget.value)
                    }}
                >
                </input>

                <lavel htmlFor='content'>내용</lavel>
                <textarea
                    id='content'
                    value={content}
                    onChange={(e) => {
                        setContent(e.currentTarget.value)
                    }}
                >
                </textarea>
                <UploadButton>
                    <button
                        onClick={(e) => {
                            onSubmit(e);
                        }}
                    >저장하기</button>
                </UploadButton>
            </UploadForm>
        </UploadDiv>
    )
}

export default Upload
```


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