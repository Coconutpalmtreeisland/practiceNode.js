import styled from "@emotion/styled"

const UploadWrap = styled.div`
    padding: 5%;
    text-align: center;
`
const UploadTitle = styled.h2`
    font-size: 20px;
`
const UploadForm = styled.form`
    label {
        display: block;
        margin-bottom: 10px;
    }
    input {
        width: 100%;
        margin-bottom: 50px
    }
    textarea {
        width: 100%;
        height: 300px;
        margin-bottom: 50px
        padding: 10px;
    }
`
const Button = styled.div`
    background-color: #000;
    color: #fff;
    padding: 10px;
`

export { UploadWrap, UploadTitle, UploadForm, Button }