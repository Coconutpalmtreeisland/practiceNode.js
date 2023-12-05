import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import { UploadWrap, UploadTitle, UploadForm, Button } from "../style/UploadCSS.js"
import ImageUpload from './ImageUpload.js';

const Upload = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");
    let navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();

        if (title === "" || content === "") {
            return alert("내용을 작성해주세요!");
        }

        // 값이 있으면 보냄
        let body = {
            title: title,
            content: content,
            image: image,
        }

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
    }

    return (
        <UploadWrap>
            <UploadTitle>글 작성</UploadTitle>
            <UploadForm>
                <label htmlFor='title'>제목</label>
                <input
                    type='text'
                    id='title'
                    value={title}
                    onChange={(e) => {
                        setTitle(e.currentTarget.value);
                    }}
                ></input><br />
                <ImageUpload setImage={setImage} />
                <label htmlFor='content'>내용</label>
                <textarea
                    id='content'
                    value={content}
                    onChange={(e) => {
                        setContent(e.currentTarget.value);
                    }}
                ></textarea>
                <Button
                    onClick={(e) => {
                        onSubmit(e);
                    }}
                >작성하기</Button>
            </UploadForm>
        </UploadWrap>

    )
}

export default Upload