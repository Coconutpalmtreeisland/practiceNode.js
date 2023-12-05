import React, { useState } from 'react'

const Upload = (props) => {
    const [content, setContent] = useState('');

    const onsubmit = () => {
        let tempArr = [...props.contentList];
        tempArr.push(content);
        props.setContentList([...tempArr]);
        setContent("");
    }
    return (
        <div>
            <div>
                <input
                    type='text'
                    value={content}
                    onChange={(e) => {
                        setContent(e.currentTarget.value)
                    }}
                />
                <br />
                <button onClick={() => {
                    onsubmit()
                }}>입력</button>
            </div>
        </div>
    )
}
export default Upload
