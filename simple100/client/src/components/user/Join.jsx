import React, { useState } from 'react'
// firebase 연동
import firebase from '../../firebase.js'
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

const Join = () => {
    const [youName, setYouName] = useState("");
    const [youEmail, setYouEmail] = useState("");
    const [youPass, setYouPass] = useState("");
    const [youPassC, setYouPassC] = useState("");

    // let navigate = useNavigate();

    const JoinFunc = async (e) => {
        e.preventDefault();

        if (!(youName && youEmail && youPass && youPassC)) {
            return alert("모든 항목을 채워야 회원가입이 가능합니다.");
        }
        if (youPass !== youPassC) {
            return alert("비밀번호를 다르게 입력했습니다.");
        }

        // 개인정보 --> firebase // 기다리고 나서 처리하도록 async await 사용
        let createUser = await firebase.auth().createUserWithEmailAndPassword(youEmail, youPass);

        await createUser.user.updateProfile({
            displayName: youName,
        });

        // console.log(createUser.user)

        // 개인정보 --> mongoDB
        //let body = {
        //    email: createUser.user.multiFactor.user.email,
        //    displayName: createUser.user.multiFactor.user.displayName,
        //    uid: createUser.user.multiFactor.user.uid,
        //}
        //
        //axios.post("/api/user/join", body)
        //    .then((response) => {
        //        if (response.data.success) {
        //            // 회원가입 성공
        //            navigate("/login");
        //        } else {
        //            return alert("회원가입이 실패했습니다.");
        //        }
        //    })
    }

    return (
        <div className='login__wrap'>
            <div className="login__header">
                <h3>Join</h3>
                <p>cllo 회원가입 해주세요</p>
            </div>
            <form className='login__form'>
                <fieldset>
                    <legend className="blind">회원가입 영역</legend>
                    <div>
                        <label htmlFor="youName" className="required blind">이름</label>
                        <input
                            type="text"
                            id="youName"
                            name="youName"
                            placeholder="이름"
                            className="input__style"
                            autoComplete='off'
                            required
                            value={youName}
                            onChange={(e) => setYouName(e.currentTarget.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="youEmail" className="required blind">이메일</label>
                        <input
                            type="email"
                            id="youEmail"
                            name="youEmail"
                            placeholder="이메일"
                            className="input__style"
                            autoComplete='off'
                            required
                            value={youEmail}
                            onChange={(e) => setYouEmail(e.currentTarget.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="youPass" className="required blind">비밀번호</label>
                        <input
                            type="text"
                            id="youPass"
                            name="youPass"
                            placeholder="비밀번호"
                            className="input__style"
                            autoComplete="off"
                            required
                            value={youPass}
                            onChange={(e) => setYouPass(e.currentTarget.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="youPassC" className="required blind">비밀번호 확인</label>
                        <input
                            type="text"
                            id="youPassC"
                            name="youPassC"
                            placeholder="다시 한번 비밀번호를 적어주세요!"
                            className="input__style"
                            required
                            value={youPassC}
                            onChange={(e) => setYouPassC(e.currentTarget.value)}
                        />
                    </div>
                    <button type="submit" className="btn__style2 mt30" onClick={(e) => JoinFunc(e)}>회원가입</button>
                </fieldset>
            </form>
        </div>
    )
}

export default Join