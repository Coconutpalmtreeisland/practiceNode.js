import React from 'react'
import { Form } from 'react-bootstrap'
import axios from 'axios'

const ImageUpload = (props) => {

    const FileUpload = (e) => {
        // console.log(e.target.files);
        let formData = new FormData();
        formData.append("file", (e.target.files[0]))

        // 배열로 불러오기
        // for (const keyValue of formData) {
        //     console.log(keyValue);
        // }

        axios
            .post("/api/post/image/upload", formData)
            .then((response) => {
                props.setImage(response.data.filePath)
            })
    }
    return (
        <div>
            <Form.Control
                type='file'
                accept='image/*'
                onChange={(e) => FileUpload(e)}
            />
        </div>
    )
}

export default ImageUpload