import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const Detail = () => {
    let params = useParams();
    let navigator = useNavigate();

    const [postInfo, setPostInfo] = useState({});

    useEffect(() => {
        let body = {
            postNum: params.postNum,
        }
        axios.post("/api/post/detail", body)
            .then((response) => {
                // console.log(response)
                setPostInfo(response.data.post)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [params.postNum])

    const DeleteHandler = () => {
        if (window.confirm("정말로 삭제하겠습니까?")) {
            let body = {
                postNum: params.postNum,
            }
            axios
                .post("/api/post/delete", body)
                .then((response) => {
                    if (response.data.success) {
                        alert("게시글이 삭제되었습니다.");
                        navigator("/list");
                    }
                })
                .catch((err) => {
                    console.log(err);
                    alert("게시글 삭제가 실패했습니다.")
                })
        }
    }

    return (
        <div style={{ padding: "20px" }}>
            <div>
                <h3>제목: {postInfo.title}</h3>
                <img src={`http://localhost:5050/${postInfo.image}`} alt="g" style={{ width: "100%" }} />
                <p>내용: {postInfo.content}</p>
            </div>
            <div>
                <Link to={`/edit/${postInfo.postNum}`}>
                    <button>수정</button>
                </Link>
                <button onClick={() => DeleteHandler()}>삭제</button>
            </div>
        </div>
    )
}

export default Detail