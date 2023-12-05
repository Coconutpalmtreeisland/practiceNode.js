import React, { useState } from 'react'

const Upload = (props) => {
    const [content, setContent] = useState("");

    const onSubmit = () => {
        let tempArr = [...props.contentList];
        tempArr.push(content)
        props.setContentList([...tempArr]);
        setContent("");
    }

    return (
        <div>
            <input
                type='text'
                value={content}
                onChange={(e) => {
                    // console.log(e.currentTarget.value)
                    setContent(e.currentTarget.value)
                }}
            />
            <br />
            <button
                onClick={() => {
                    onSubmit();
                }}
            >입력</button>
        </div>
    )
}

export default Upload