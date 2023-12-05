import styled from '@emotion/styled'

const UploadDiv = styled.div`
    width: 100%;
    text-align: center;
`

const UploadButtonDiv = styled.div`
    button {
        padding: 10px 32px;
        background-color: hotpink;
        font-size: 24px;
        border-radius: 4px;
        color: black;
        font-weight: bold;
        border: 0;
        &:hover {
          color: white;
        }
    }
`

const UploadTitle = styled.h3`
  margin-top: 100px;
  padding-bottom: 20px;
`

const UploadForm = styled.form`
  label {
    text-align: center
  }
  input {
    width: 300px;
    padding: 10px 20px;
    border: 1px solid hotpink;
    border-radius: 5px;
    margin-bottom: 20px;
  }
  textarea {
    width: 300px;
    height: 300px
    border: 1px solid hotpink;
    resize: none;
    margin-top: 20px;
    padding: 20px;
  }
`

export { UploadButtonDiv, UploadDiv, UploadTitle, UploadForm };