import React, {useContext, useEffect, useState} from 'react';
import cl from "./pagesStyles/Registration.module.css"
import MyInput from "../component/UI/MyInput/MyInput";
import MyButton from "../component/UI/MyButton/MyButton";
import {Link, useNavigate} from "react-router-dom";
import AuthService from "../API/AuthService";
import {AuthContext} from "../context/AuthContext";

const useValidation = (value, validations) => {
    const [isEmpty, setEmpty] = useState(false);
    const [minLengthError, setMinLengthError] = useState(false)
    const [maxLengthError, setMaxLengthError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [phoneError, setPhoneError] = useState(false)
    const [inputValid, setInputValid] = useState(false)
    const [passwordCheckError, setPasswordCheckError] = useState(false)

    useEffect(() => {

        for (const validation in validations) {
            switch (validation) {
                case "minLength":
                    value.length < validations[validation] ? setMinLengthError(true) : setMinLengthError(false)
                    break
                case "isEmpty":
                    value ? setEmpty(false) : setEmpty(true)
                    break
                case "maxLength":
                    value.length > validations[validation]
                        ? setMaxLengthError(true)
                        : setMaxLengthError(false)
                    break
                case "isEmail":
                    String(value)
                        .toLowerCase()
                        .match(
                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
                        ? setEmailError(false)
                        : setEmailError(true)
                    break
                case "isPhone":
                    String(value)
                        .toLowerCase()
                        .match(
                            /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)
                        ? setPhoneError(false)
                        : setPhoneError(true)
                    break
                case "passwordCheck":
                    String(value).match(validations[validation])
                        ? setPasswordCheckError(false)
                        : setPasswordCheckError(true)
            }
        }

    }, [value])

    useEffect(() => {
        if (isEmpty || minLengthError || maxLengthError || emailError || phoneError || passwordCheckError) {
            setInputValid(false)
        } else {
            setInputValid(true)
        }

    }, [isEmpty, minLengthError, maxLengthError, emailError, phoneError, passwordCheckError])

    return {
        isEmpty, minLengthError, maxLengthError, emailError, phoneError, passwordCheckError, inputValid
    }
}

export const useInput = (initialValue, validations) => {
    const [value, setValue] = useState(initialValue)
    const [isDirty, setDirty] = useState(false)
    const valid = useValidation(value, validations)
    const onChange = (e) => {
        setValue(e.target.value)
    }

    const onBadResp = (value) => {
        setValue(value);
    }

    const onBlur = (e) => {
        setDirty(true);
    }

    return {
        value, onChange, onBlur, onBadResp, ...valid, isDirty
    }
}



const Registration = () => {

    const navigate = useNavigate()

    const email = useInput('', {minLength: 3, isEmpty: true, isEmail: true})
    const password = useInput('', {minLength: 3, isEmpty: true, maxLength: 21})
    const phone = useInput('', {isPhone: true})
    const passwordCheck = useInput('', {isEmpty: true, passwordCheck: password.value})
    const firstname = useInput('', {minLength: 3, isEmpty: true, maxLength: 21})
    const lastname = useInput('', {minLength: 3, isEmpty: true, maxLength: 21})

    const {setJwt, setIsAuth} = useContext(AuthContext);


    const regUser = async (e) => {
        e.preventDefault()
        const user = {
            firstname: firstname.value,
            lastname: lastname.value,
            email: email.value,
            password: password.value,
            phone: phone.value
        }
        const response = await AuthService.reg(user);
        console.log(response.data.token);
        localStorage.setItem('auth', 'true');
        setIsAuth(true);
        localStorage.setItem('jwt', response.data.token);
        setJwt(response.data.token)
        navigate("/publications");
    }

    return (
        <div className={cl.registration}>
            <div className={cl.reg__wrapper}>
                <div className={cl.context}>
                    <form className={cl.form}>
                        <div className={cl.section}>
                            {(email.isDirty && email.minLengthError) &&
                                <div style={{color: "white"}}>Довжина поля не може бути менше ніж 3!</div>}
                            {(email.isDirty && email.emailError) &&
                                <div style={{color: "white"}}>Неккоректна email адреса!</div>}
                            <MyInput onChange={email.onChange} onBlur={e => email.onBlur(e)} value={email.value}
                                     name="email" placeholder="Email" type="email"/>
                        </div>
                        <div className={cl.section}>
                            {(firstname.isDirty && firstname.minLengthError) &&
                                <div style={{color: "white"}}>Довжина поля не може бути менше ніж 3!</div>}
                            {(firstname.isDirty && firstname.maxLengthError) &&
                                <div style={{color: "white"}}>Довжина поля не може бути більше ніж 21!</div>}
                            <MyInput onChange={e => firstname.onChange(e)} onBlur={e => firstname.onBlur(e)}
                                     value={firstname.value} name="firstname" placeholder="Ім'я" type="text"/>
                        </div>
                        <div className={cl.section}>
                            {(lastname.isDirty && lastname.minLengthError) &&
                                <div style={{color: "white"}}>Довжина поля не може бути менше ніж 3!</div>}
                            {(lastname.isDirty && lastname.maxLengthError) &&
                                <div style={{color: "white"}}>Довжина поля не може бути більше ніж 21!</div>}
                            <MyInput onChange={e => lastname.onChange(e)} onBlur={e => lastname.onBlur(e)}
                                     value={lastname.value} name="lastname" placeholder="Прізвище" type="text"/>
                        </div>
                        <div className={cl.section}>
                            {(password.isDirty && password.minLengthError) &&
                                <div style={{color: "white"}}>Довжина поля не може бути менше ніж 3!</div>}
                            {(password.isDirty && password.maxLengthError) &&
                                <div style={{color: "white"}}>Довжина поля не може бути більше ніж 21!</div>}
                            <MyInput onChange={e => password.onChange(e)} onBlur={e => password.onBlur(e)}
                                     value={password.value} name="password" placeholder="Пароль" type="password"/>
                        </div>
                        <div className={cl.section}>
                            {(passwordCheck.isDirty && passwordCheck.passwordCheckError) &&
                                <div style={{color: "white"}}>Паролі не однакові!</div>}
                            {(passwordCheck.isDirty && passwordCheck.isEmpty) &&
                                <div style={{color: "white"}}>Поле не може бути пустим!</div>}
                            <MyInput onChange={passwordCheck.onChange} onBlur={e => passwordCheck.onBlur(e)}
                                     value={passwordCheck.value} placeholder="Підтвердження паролю" type="password"/>
                        </div>
                        <div className={cl.section}>
                            {(phone.isDirty && phone.phoneError) &&
                                <div style={{color: "white"}}>Некоректний номер телефону!</div>}
                            <MyInput onChange={phone.onChange} onBlur={e => phone.onBlur(e)} value={phone.value}
                                     name="phone" placeholder="Номер телефону" type="text"/>
                        </div>
                        <div className={cl.submit}>
                            <MyButton onClick={regUser}
                                      disabled={!email.inputValid || !password.inputValid || !phone.inputValid || !passwordCheck.inputValid || !firstname.inputValid || !lastname.inputValid}>Підтвердити</MyButton>
                        </div>
                    </form>
                    <div>
                        <Link className={cl.login} to={"login"}>Вже маєте акаунт? Увійти в нього можливо тут!</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;