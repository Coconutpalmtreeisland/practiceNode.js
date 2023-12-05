import React, { useState } from 'react'
import { UploadDiv, UploadTitle, UploadForm, UploadButton } from "../style/UploadCSS.js"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Upload = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    // 글 작성 후 페이지 이동될 경로 설정
    let navigate = useNavigate();


    const onSubmit = (e) => {
        e.preventDefault();

        if (title === "" || content === "") {
            return alert("내용을 작성해주세요!");
        }
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
                    navigate("/list");
                } else {
                    alert("글 작성이 실패하였습니다");
                }
            })
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