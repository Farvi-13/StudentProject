import React, {useContext, useState} from 'react';
import cl from "./pagesStyles/Login.module.css"
import MyInput from "../component/UI/MyInput/MyInput";
import {useInput} from "./Registration";
import MyButton from "../component/UI/MyButton/MyButton";
import {AuthContext} from "../context/AuthContext";
import AuthService from "../API/AuthService";
import {useNavigate} from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();

    const email = useInput('', {minLength: 3, isEmpty: true, isEmail: true})
    const password = useInput('', {minLength: 3, isEmpty: true, maxLength: 21})
    const [badAuth, setBadAuth] = useState(false)

    const {setJwt, setIsAuth, setUserId} = useContext(AuthContext);

    const logUser = async (e) => {
        e.preventDefault()
        const login = {
            email: email.value,
            password: password.value
        }
        const response = await AuthService.login(login);
        if (response === 403){
            setBadAuth(true)
            email.onBadResp('')
            password.onBadResp('')
        }
        else {
            localStorage.setItem('auth', 'true');
            setIsAuth(true);
            localStorage.setItem('jwt', response.data.token);
            setJwt(response.data.token)
            localStorage.setItem('userId', response.data.id.toString())
            setUserId(response.data.id);
            navigate("/publications");
        }
    }

    return (
        <div className={cl.login}>
            <div className={cl.log__wrapper}>
                <div className={cl.context_log}>
                    <form className={cl.form_log}>
                        <div className={cl.section__log}>
                            {badAuth
                                && <div style={{color: "white"}}>Некоректні данні</div>
                            }
                        </div>
                        <div className={cl.section__log}>
                            {(email.isDirty && email.minLengthError) &&
                                <div style={{color: "white"}}>Довжина поля не може бути менше ніж 3!</div>}
                            {(email.isDirty && email.emailError) &&
                                <div style={{color: "white"}}>Неккоректна email адреса!</div>}
                            <MyInput onChange={email.onChange} onBlur={e => email.onBlur(e)} value={email.value} name="email" type="email" placeholder={"Email"}/>
                        </div>
                        <div className={cl.section__log}>
                            {(password.isDirty && password.minLengthError) &&
                                <div style={{color: "white"}}>Довжина поля не може бути менше ніж 3!</div>}
                            {(password.isDirty && password.maxLengthError) &&
                                <div style={{color: "white"}}>Неккоректна email адреса!</div>}
                            <MyInput onChange={password.onChange} onBlur={e => password.onBlur(e)} value={password.value} name="password" type="password" placeholder={"Password"}/>
                        </div>
                        <div className={cl.submit__login}>
                            <MyButton onClick={logUser} disabled={!email.inputValid || !password.inputValid}>Увійти</MyButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;