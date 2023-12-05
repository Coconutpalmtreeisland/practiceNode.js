import React, { useEffect, useState } from 'react';
import axios from 'axios';

const List = (props) => {
    const [Text, setText] = useState("");

    useEffect(() => {
        let body = {
            text: "hello"
        };

        axios
            .post("/api/test", body)
            .then((response) => {
                // alert("요청 성공");
                // console.log(response);
                setText(response.data.text);
            })
            .catch((err) => {
                // alert("요청 실패");
                console.log(err)
            })
    }, []);
    return (
        <div>
            <div>
                제목 : {Text}
                <br />
            </div>
            {props.contentList.map((content, key) => (
                <div key={key}>
                    내용 : {content}
                </div>
            ))}
        </div>
    )
}

export default List