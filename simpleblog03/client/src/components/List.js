import React from 'react'

const List = (props) => {
    return (
        <div>
            {props.contentList.map((content, key) => (
                <div key={key}>
                    내용: {content}
                </div>
            ))}
        </div>
    )
}

export default List