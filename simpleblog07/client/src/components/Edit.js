import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Edit = () => {
    let params = useParams();
    let navigate = useNavigate();

    const [postInfo, setPostInfo] = useState({});
    const [title, setTitle] = useState("");
    const [contents, setContents] = useState("");

    useEffect(() => {
        let body = {
            postNum: params.postNum
        }

        axios.post("/api/post/detail", body)
            .then((response) => {
                if (response.data.success) {
                    setPostInfo(response.data.post);
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }, [params.postNum])

    useEffect(() => {
        setTitle(postInfo.title);
        setContents(postInfo.content);
    }, [postInfo])

    const onsubmit = (e) => {
        e.preventDefault();

        if (title === "" || contents === "") {
            return alert("모든 항목을 채워주세요!");
        }

        let body = {
            title: title,
            content: contents,
            postNum: params.postNum
        }

        axios
            .post("/api/post/edit", body)
            .then((response) => {
                if (response.data.success) {
                    alert("글 수정이 완료되었습니다.")
                    navigate(`/post/${params.postNum}`);
                } else {
                    alert("글 수정이 실패하였습니다.")
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div style={{ padding: "20px" }}>
            <form>
                <label htmlFor='title'>제목</label>
                <input
                    id='title'
                    type='text'
                    value={title || ""}
                    onChange={(event) => {
                        setTitle(event.currentTarget.value);
                    }}
                /><br />
                <label htmlFor='contents'>내용</label>
                <textarea
                    id='contents'
                    value={contents || ""}
                    onChange={(event) => {
                        setContents(event.currentTarget.value);
                    }}
                ></textarea>

                <div>
                    <button onClick={(e) => {
                        e.preventDefault();
                        navigate(-1);
                    }}>취소</button>
                    <button onClick={(e) => {
                        onsubmit(e);
                    }}>제출</button>
                </div>
            </form>
        </div>
    )
}

export default Edit