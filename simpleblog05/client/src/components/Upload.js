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