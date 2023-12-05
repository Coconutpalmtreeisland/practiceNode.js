import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const List = () => {
    // 서버가 DB에서 데이터 받아와서 클라이언트가 받아서 화면에 출력
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        axios
            .post("/api/post/list")
            .then((response) => {
                if (response.data.success) {
                    setPostList([...response.data.postList]);
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
                    <Link to={`/post/${post.postNum}`}>내용 보기</Link>
                </div>
            ))}
        </div>
    )
}

export default List