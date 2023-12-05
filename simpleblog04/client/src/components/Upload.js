import React, { useState } from 'react'
import { UploadButtonDiv, UploadDiv, UploadTitle, UploadForm } from '../style/UploadCSS.js'
import axios from 'axios';

const Upload = () => {
    const [title, setTitle] = useState("");
    const [contents, setContents] = useState("");

    const onsubmit = () => {
        if (title === "" || contents === "") {
            return alert("제목과 내용을 채워주세요!");
        }

        let body = {
            title: title,
            content: contents
        }

        axios.post("/api/post/submit", body)
            .then((response) => {
                if (response.data.success) {
                    alert("글 작성이 완료되었습니다")
                } else {
                    alert("글 작성이 실패하였습니다.")
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <UploadDiv>
            <UploadTitle>Upload</UploadTitle>
            <UploadForm>
                <label htmlFor='title'>제목</label>
                <input
                    type='text'
                    id='title'
                    value={title}
                    onChange={(event) => {
                        setTitle(event.currentTarget.value);
                    }}
                /><br />

                <label htmlFor='contents'>내용</label>
                <textarea
                    type='text'
                    id='contents'
                    value={contents}
                    onChange={(event) => {
                        setContents(event.currentTarget.value);
                    }}
                /><br />
                <UploadButtonDiv>
                    <button
                        onClick={(e) => {
                            onsubmit(e);
                        }}
                    >제출</button>
                </UploadButtonDiv>
            </UploadForm>
        </UploadDiv>
    )
}

export default Upload