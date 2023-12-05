import styled from "@emotion/styled"

const UploadDiv = styled.div`
    width: 100%;
`

const UploadTitle = styled.h3`
    text-align: center;
`

const UploadForm = styled.form`
    width: 500px;
    margin: 0 auto;

    label {
        display: block;
    }
    input {
        width: 100%;
        padding: 10px;
    }
    textarea {
        width: 100%;
        height: 300px;
        resize: none;
        padding: 10px;
    }
`

const UploadButton = styled.div`
    button {
        border: 1px solid #000;
        background: #cccc;
        width: 100%;
        padding: 10px;
    }
`

export { UploadDiv, UploadTitle, UploadForm, UploadButton };