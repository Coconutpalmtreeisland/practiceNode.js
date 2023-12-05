import React, { useEffect, useState } from 'react'
import axios from "axios";

const List = () => {
    const [text, setText] = useState("");

    let body = {
        text: "다시 보낼께~"
    }

    useEffect(() => {
        // POST 요청 전송
        axios.post('/api/test', body)
            .then((response) => {
                alert("요청 성공");
                console.log(response);
                setText(response.data.text);
            })
            .catch((error) => {
                alert("요청 실패");
                console.log(error);
            })
    })
    return (
        <div>List
            <p>서버에서 받은 데이터 : {text}</p>
        </div>
    )
}

export default List