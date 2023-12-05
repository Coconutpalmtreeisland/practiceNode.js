import React, { useEffect, useState } from 'react'
import axios from 'axios';

const List = () => {
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        axios
            .post('/api/post/list')
            .then((response) => {
                if (response.data.success) {
                    setPostList([...response.data.postList]);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    return (
        <div>
            <h3>글 목록</h3>
            {postList.map((post, key) => (
                <div>
                    <h3>제목: {post.title}</h3>
                    <p>내용: {post.content}</p>
                </div>
            ))}
        </div>
    )
}

export default List