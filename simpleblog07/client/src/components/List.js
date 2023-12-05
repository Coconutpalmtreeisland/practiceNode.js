import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

const List = () => {
    const [postList, setPostList] = useState([]);
    useEffect(() => {
        axios.post("/api/post/list")
            .then((response) => {
                console.log(response)
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
            {postList.map((post, key) => (
                <div key={key} className='post'>
                    <h3>제목: {post.title}</h3>
                    <p>내용: {post.content}</p>
                    <Link to={`/post/${post.postNum}`}>내용보기</Link>
                </div>
            ))}
        </div>
    )
}

export default List